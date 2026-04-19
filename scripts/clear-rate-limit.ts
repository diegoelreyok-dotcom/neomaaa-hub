import { readFileSync } from 'fs';
import { resolve } from 'path';
const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=['"]?(.*?)['"]?$/);
  if (m) process.env[m[1]] = m[2];
}
import { kv } from '@vercel/kv';
(async () => {
  const users = ['diego', 'susana', 'yulia', 'stanislav'];
  for (const u of users) {
    await kv.del(`ratelimit:login:${u}`);
    console.log(`cleared ratelimit:login:${u}`);
  }
})();
