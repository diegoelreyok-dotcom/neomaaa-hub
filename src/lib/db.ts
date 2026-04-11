import { User, Role, ReadProgress } from './types';
import { hashSync, compareSync } from 'bcryptjs';

// In-memory store for development (when Vercel KV is not available)
const memStore: Record<string, string> = {};

async function kvGet(key: string): Promise<any | null> {
  try {
    const { kv } = await import('@vercel/kv');
    const val = await kv.get(key);
    return val ?? null;
  } catch {
    const raw = memStore[key];
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return raw; }
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
  const data = await kvGet(`user:${id}`);
  return data ? data as any : null;
}

export async function getAllUsers(): Promise<User[]> {
  const keys = await kvKeys('user:*');
  const users: User[] = [];
  for (const key of keys) {
    const data = await kvGet(key);
    if (data) users.push(data as any);
  }
  return users;
}

export async function createUser(
  user: Omit<User, 'loginCode' | 'createdAt'>,
  plainCode: string
): Promise<{ user: User; code: string }> {
  const hashedCode = hashSync(plainCode, 10);
  const newUser: User = {
    ...user,
    loginCode: hashedCode,
    createdAt: new Date().toISOString(),
  };
  await kvSet(`user:${user.id}`, newUser);
  return { user: newUser, code: plainCode };
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const existing = await getUser(id);
  if (!existing) return null;
  const updated = { ...existing, ...updates };
  await kvSet(`user:${id}`, updated);
  return updated;
}

export async function deleteUser(id: string): Promise<void> {
  await kvDel(`user:${id}`);
}

export async function validateLogin(userId: string, plainCode: string): Promise<User | null> {
  const user = await getUser(userId);
  if (!user || !user.isActive) return null;
  if (!compareSync(plainCode, user.loginCode)) return null;
  await updateUser(userId, { lastLogin: new Date().toISOString() });
  return user;
}

export async function regenerateCode(userId: string, newPlainCode: string): Promise<string | null> {
  const user = await getUser(userId);
  if (!user) return null;
  const hashed = hashSync(newPlainCode, 10);
  await updateUser(userId, { loginCode: hashed });
  return newPlainCode;
}

// ---- ROLES ----
export async function getRole(id: string): Promise<Role | null> {
  const data = await kvGet(`role:${id}`);
  return data ? data as any : null;
}

export async function getAllRoles(): Promise<Role[]> {
  const keys = await kvKeys('role:*');
  const roles: Role[] = [];
  for (const key of keys) {
    const data = await kvGet(key);
    if (data) roles.push(data as any);
  }
  return roles;
}

export async function createRole(role: Role): Promise<Role> {
  await kvSet(`role:${role.id}`, role);
  return role;
}

export async function updateRole(id: string, updates: Partial<Role>): Promise<Role | null> {
  const existing = await getRole(id);
  if (!existing) return null;
  const updated = { ...existing, ...updates };
  await kvSet(`role:${id}`, updated);
  return updated;
}

export async function deleteRole(id: string): Promise<void> {
  await kvDel(`role:${id}`);
}

// ---- PROGRESS ----
export async function recordAccess(userId: string, documentPath: string): Promise<void> {
  const key = `progress:${userId}:${documentPath}`;
  const existing = await kvGet(key);
  const now = new Date().toISOString();
  if (existing) {
    const data: ReadProgress = JSON.parse(existing as string);
    data.lastAccessed = now;
    data.accessCount += 1;
    await kvSet(key, data);
  } else {
    const newProgress: ReadProgress = {
      userId,
      documentPath,
      firstAccessed: now,
      lastAccessed: now,
      accessCount: 1,
      completed: false,
    };
    await kvSet(key, newProgress);
  }
}

export async function getUserProgress(userId: string): Promise<ReadProgress[]> {
  const keys = await kvKeys(`progress:${userId}:*`);
  const progress: ReadProgress[] = [];
  for (const key of keys) {
    const data = await kvGet(key);
    if (data) progress.push(data as any);
  }
  return progress;
}

export async function getAllProgress(): Promise<ReadProgress[]> {
  const keys = await kvKeys('progress:*');
  const progress: ReadProgress[] = [];
  for (const key of keys) {
    const data = await kvGet(key);
    if (data) progress.push(data as any);
  }
  return progress;
}

// ---- SEED DEFAULT DATA ----
export async function seedDefaultData(): Promise<void> {
  // Check if already seeded
  const existingAdmin = await getRole('admin');
  if (existingAdmin) return;

  // Create default roles
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
    await createRole(role);
  }

  // Create default admin users (Principals)
  // Default code: 123456 (should be changed immediately)
  await createUser(
    { id: 'diego', name: 'Diego', roleId: 'admin', lang: 'es', isActive: true },
    '123456'
  );
  await createUser(
    { id: 'yulia', name: 'Yulia', roleId: 'admin', lang: 'ru', isActive: true },
    '123456'
  );
  await createUser(
    { id: 'stanislav', name: 'Stanislav', roleId: 'admin', lang: 'ru', isActive: true },
    '123456'
  );
}
