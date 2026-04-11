import { User, Role, ReadProgress } from './types';
import { hashSync, compareSync } from 'bcryptjs';

// In-memory store for development (when Vercel KV is not available)
const memStore: Record<string, string> = {};

/**
 * Get a value from KV store. Vercel KV auto-parses JSON, so the returned
 * value is already a JS object — do NOT call JSON.parse() on the result.
 */
async function kvGet<T = unknown>(key: string): Promise<T | null> {
  try {
    const { kv } = await import('@vercel/kv');
    const val = await kv.get<T>(key);
    return val ?? null;
  } catch {
    const raw = memStore[key];
    if (!raw) return null;
    try { return JSON.parse(raw) as T; } catch { return raw as T; }
  }
}

async function kvSet(key: string, value: unknown): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    await kv.set(key, value);
  } catch {
    memStore[key] = JSON.stringify(value);
  }
}

async function kvDel(key: string): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv');
    await kv.del(key);
  } catch {
    delete memStore[key];
  }
}

async function kvKeys(pattern: string): Promise<string[]> {
  try {
    const { kv } = await import('@vercel/kv');
    return await kv.keys(pattern);
  } catch {
    const prefix = pattern.replace('*', '');
    return Object.keys(memStore).filter((k) => k.startsWith(prefix));
  }
}

// ---- USERS ----
export async function getUser(id: string): Promise<User | null> {
  if (!id || typeof id !== 'string') return null;
  const data = await kvGet<User>(`user:${id}`);
  return data ?? null;
}

export async function getAllUsers(): Promise<User[]> {
  const keys = await kvKeys('user:*');
  const users: User[] = [];
  for (const key of keys) {
    const data = await kvGet<User>(key);
    if (data) users.push(data);
  }
  return users;
}

export async function createUser(
  user: Omit<User, 'loginCode' | 'createdAt'>,
  plainCode: string
): Promise<{ user: User; code: string }> {
  // Validate inputs
  if (!user.id || typeof user.id !== 'string' || user.id.length > 50) {
    throw new Error('Invalid user id');
  }
  if (!user.name || typeof user.name !== 'string' || user.name.length > 100) {
    throw new Error('Invalid user name');
  }
  if (!plainCode || plainCode.length < 6) {
    throw new Error('Code must be at least 6 characters');
  }
  // Sanitize the id (alphanumeric + hyphens only)
  const sanitizedId = user.id.toLowerCase().replace(/[^a-z0-9-]/g, '');

  // Check for duplicate user
  const existingUser = await getUser(sanitizedId);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedCode = hashSync(plainCode, 10);
  const newUser: User = {
    ...user,
    id: sanitizedId,
    loginCode: hashedCode,
    createdAt: new Date().toISOString(),
  };
  await kvSet(`user:${sanitizedId}`, newUser);
  return { user: newUser, code: plainCode };
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const existing = await getUser(id);
  if (!existing) return null;
  // Prevent changing the user id via updates
  const safeUpdates = { ...updates };
  delete safeUpdates.id;
  const updated = { ...existing, ...safeUpdates };
  await kvSet(`user:${id}`, updated);
  return updated;
}

export async function deleteUser(id: string): Promise<void> {
  if (!id || typeof id !== 'string') return;
  await kvDel(`user:${id}`);
}

export async function validateLogin(userId: string, plainCode: string): Promise<User | null> {
  if (!userId || !plainCode) return null;
  const user = await getUser(userId);
  if (!user || !user.isActive) return null;
  if (!user.loginCode || !compareSync(plainCode, user.loginCode)) return null;
  await updateUser(userId, { lastLogin: new Date().toISOString() });
  return user;
}

export async function regenerateCode(userId: string, newPlainCode: string): Promise<string | null> {
  if (!newPlainCode || newPlainCode.length < 6) return null;
  const user = await getUser(userId);
  if (!user) return null;
  const hashed = hashSync(newPlainCode, 10);
  await updateUser(userId, { loginCode: hashed });
  return newPlainCode;
}

// ---- ROLES ----
export async function getRole(id: string): Promise<Role | null> {
  if (!id || typeof id !== 'string') return null;
  const data = await kvGet<Role>(`role:${id}`);
  return data ?? null;
}

export async function getAllRoles(): Promise<Role[]> {
  const keys = await kvKeys('role:*');
  const roles: Role[] = [];
  for (const key of keys) {
    const data = await kvGet<Role>(key);
    if (data) roles.push(data);
  }
  return roles;
}

export async function createRole(role: Role): Promise<Role> {
  if (!role.id || typeof role.id !== 'string' || role.id.length > 50) {
    throw new Error('Invalid role id');
  }
  if (!role.name || typeof role.name !== 'string') {
    throw new Error('Invalid role name');
  }
  // Validate sections array contains only valid strings
  if (!Array.isArray(role.sections)) {
    throw new Error('sections must be an array');
  }
  await kvSet(`role:${role.id}`, role);
  return role;
}

export async function updateRole(id: string, updates: Partial<Role>): Promise<Role | null> {
  const existing = await getRole(id);
  if (!existing) return null;
  // Prevent changing role id via updates
  const safeUpdates = { ...updates };
  delete safeUpdates.id;
  const updated = { ...existing, ...safeUpdates };
  await kvSet(`role:${id}`, updated);
  return updated;
}

export async function deleteRole(id: string): Promise<void> {
  if (!id || typeof id !== 'string') return;
  // Prevent deleting the admin role
  if (id === 'admin') {
    throw new Error('Cannot delete the admin role');
  }
  await kvDel(`role:${id}`);
}

// ---- PROGRESS ----
export async function recordAccess(userId: string, documentPath: string): Promise<void> {
  // Validate inputs to prevent KV key injection
  const safeUserId = userId.replace(/[^a-zA-Z0-9_-]/g, '');
  const safeDocPath = documentPath.replace(/[^a-zA-Z0-9_\-./]/g, '');
  const key = `progress:${safeUserId}:${safeDocPath}`;
  const existing = await kvGet(key);
  const now = new Date().toISOString();
  if (existing) {
    // kvGet already returns a parsed object (Vercel KV auto-parses JSON)
    const data = existing as ReadProgress;
    data.lastAccessed = now;
    data.accessCount += 1;
    await kvSet(key, data);
  } else {
    const newProgress: ReadProgress = {
      userId: safeUserId,
      documentPath: safeDocPath,
      firstAccessed: now,
      lastAccessed: now,
      accessCount: 1,
      completed: false,
    };
    await kvSet(key, newProgress);
  }
}

export async function getUserProgress(userId: string): Promise<ReadProgress[]> {
  if (!userId || typeof userId !== 'string') return [];
  const safeUserId = userId.replace(/[^a-zA-Z0-9_-]/g, '');
  const keys = await kvKeys(`progress:${safeUserId}:*`);
  const progress: ReadProgress[] = [];
  for (const key of keys) {
    const data = await kvGet<ReadProgress>(key);
    if (data) progress.push(data);
  }
  return progress;
}

export async function getAllProgress(): Promise<ReadProgress[]> {
  const keys = await kvKeys('progress:*');
  const progress: ReadProgress[] = [];
  for (const key of keys) {
    const data = await kvGet<ReadProgress>(key);
    if (data) progress.push(data);
  }
  return progress;
}

// ---- SEED DEFAULT DATA ----
export async function seedDefaultData(): Promise<void> {
  // --- Seed roles (idempotent: skip each role that already exists) ---
  const defaultRoles: Role[] = [
    {
      id: 'admin',
      name: 'Administrador',
      nameRu: 'Администратор',
      sections: [
        'launch',
        'sales',
        'compliance',
        'support',
        'operations',
        'marketing',
        'hiring',
        'partners',
        'encyclopedia',
      ],
      isAdmin: true,
    },
    {
      id: 'principal',
      name: 'Principal',
      nameRu: 'Принципал',
      sections: [
        'launch',
        'sales',
        'compliance',
        'support',
        'operations',
        'marketing',
        'hiring',
        'partners',
        'encyclopedia',
      ],
      isAdmin: false,
    },
    {
      id: 'sales',
      name: 'Ventas',
      nameRu: 'Продажи',
      sections: ['sales', 'encyclopedia', 'support'],
      isAdmin: false,
    },
    {
      id: 'compliance',
      name: 'Compliance',
      nameRu: 'Комплаенс',
      sections: ['compliance', 'encyclopedia', 'support'],
      isAdmin: false,
    },
    {
      id: 'support-role',
      name: 'Soporte',
      nameRu: 'Поддержка',
      sections: ['support', 'operations', 'encyclopedia'],
      isAdmin: false,
    },
    {
      id: 'dealing',
      name: 'Dealing',
      nameRu: 'Дилинг',
      sections: ['compliance', 'operations', 'encyclopedia'],
      isAdmin: false,
    },
    {
      id: 'marketing-role',
      name: 'Marketing',
      nameRu: 'Маркетинг',
      sections: ['marketing', 'encyclopedia'],
      isAdmin: false,
    },
    {
      id: 'dev',
      name: 'Desarrollo',
      nameRu: 'Разработка',
      sections: [
        'launch',
        'sales',
        'compliance',
        'support',
        'operations',
        'marketing',
        'hiring',
        'partners',
        'encyclopedia',
      ],
      isAdmin: false,
    },
  ];

  for (const role of defaultRoles) {
    const existingRole = await getRole(role.id);
    if (!existingRole) {
      await createRole(role);
    }
  }

  // --- Seed users (idempotent: skip each user that already exists) ---

  // Admin users get a random seed code (must be changed immediately)
  const adminSeedCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Default code for non-admin team members (should be changed via admin panel)
  const teamDefaultCode = '000000';

  const defaultUsers: Array<{
    id: string;
    name: string;
    roleId: string;
    lang: 'es' | 'ru';
    code: string;
  }> = [
    // Admins
    { id: 'diego', name: 'Diego', roleId: 'admin', lang: 'es', code: adminSeedCode },
    { id: 'yulia', name: 'Yulia', roleId: 'admin', lang: 'ru', code: adminSeedCode },
    { id: 'stanislav', name: 'Stanislav', roleId: 'admin', lang: 'ru', code: adminSeedCode },
    // Dealing
    { id: 'pepe', name: 'Pepe', roleId: 'dealing', lang: 'es', code: teamDefaultCode },
    // Compliance
    { id: 'susana', name: 'Susana', roleId: 'compliance', lang: 'es', code: teamDefaultCode },
    // Sales
    { id: 'edward', name: 'Edward', roleId: 'sales', lang: 'es', code: teamDefaultCode },
    { id: 'franco', name: 'Franco', roleId: 'sales', lang: 'es', code: teamDefaultCode },
    { id: 'luis', name: 'Luis', roleId: 'sales', lang: 'es', code: teamDefaultCode },
    { id: 'rocio', name: 'Rocio', roleId: 'sales', lang: 'es', code: teamDefaultCode },
    { id: 'marilyn', name: 'Marilyn', roleId: 'sales', lang: 'es', code: teamDefaultCode },
    // Dev
    { id: 'alexa', name: 'Alex A', roleId: 'dev', lang: 'es', code: teamDefaultCode },
    { id: 'alexb', name: 'Alex B', roleId: 'dev', lang: 'es', code: teamDefaultCode },
    { id: 'gleb', name: 'Gleb', roleId: 'dev', lang: 'ru', code: teamDefaultCode },
    { id: 'dimitri', name: 'Dimitri', roleId: 'dev', lang: 'ru', code: teamDefaultCode },
  ];

  for (const u of defaultUsers) {
    const existing = await getUser(u.id);
    if (existing) continue;
    try {
      await createUser(
        { id: u.id, name: u.name, roleId: u.roleId, lang: u.lang, isActive: true },
        u.code
      );
    } catch {
      // Ignore duplicate errors during seed
    }
  }
}
