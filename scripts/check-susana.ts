import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=['"]?(.*?)['"]?$/);
  if (m) process.env[m[1]] = m[2];
}

import { getUser, getRole } from '../src/lib/db';

async function main() {
  const susana = await getUser('susana');
  if (!susana) {
    console.log('❌ Susana NO existe en KV');
    return;
  }
  console.log('✅ Susana existe:');
  console.log(`   userId: ${susana.id}`);
  console.log(`   name: ${susana.name}`);
  console.log(`   roleId: ${susana.roleId}`);
  console.log(`   lang: ${susana.lang}`);
  console.log(`   isActive: ${susana.isActive}`);
  console.log(`   mustChangeCode: ${susana.mustChangeCode ?? false}`);
  console.log(`   loginCode (hashed): ${susana.loginCode?.substring(0, 20)}...`);

  const role = await getRole(susana.roleId);
  if (!role) {
    console.log(`\n❌ Rol "${susana.roleId}" NO existe`);
    return;
  }
  console.log(`\n✅ Rol "${susana.roleId}":`);
  console.log(`   name: ${role.name}`);
  console.log(`   isAdmin: ${role.isAdmin}`);
  console.log(`   sections accesibles: ${role.sections.join(', ')}`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
