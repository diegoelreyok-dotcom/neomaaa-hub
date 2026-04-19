import { readFileSync } from 'fs';
import { resolve } from 'path';
const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=['"]?(.*?)['"]?$/);
  if (m) process.env[m[1]] = m[2];
}
import { validateLogin, getUser } from '../src/lib/db';
(async () => {
  const u = await getUser('diego');
  console.log('user exists:', !!u);
  console.log('isActive:', u?.isActive);
  console.log('roleId:', u?.roleId);
  console.log('has loginCode hash:', !!u?.loginCode);
  const v = await validateLogin('diego', '443396');
  console.log('validateLogin 443396 →', v ? 'SUCCESS' : 'FAIL');
})();
