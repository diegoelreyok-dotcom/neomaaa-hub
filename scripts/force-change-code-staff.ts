import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=['"]?(.*?)['"]?$/);
  if (m) process.env[m[1]] = m[2];
}

import { getUser, updateUser } from '../src/lib/db';

// Staff users seeded with default code '000000' that must rotate on next login.
// Admins (diego, yulia, stanislav) are NOT in this list — their codes are already
// rotated (diego=443396) or personal.
const STAFF_USERS = [
  'pepe',
  'susana',
  'edward',
  'franco',
  'luis',
  'rocio',
  'marilyn',
  'alexa',
  'alexb',
  'gleb',
  'dimitri',
];

async function main() {
  console.log(`Forcing mustChangeCode=true on ${STAFF_USERS.length} staff users...`);
  let updated = 0;
  let skipped = 0;
  let notFound = 0;

  for (const userId of STAFF_USERS) {
    const user = await getUser(userId);
    if (!user) {
      console.log(`  ❌ ${userId}: not found in KV`);
      notFound += 1;
      continue;
    }
    if (user.mustChangeCode === true) {
      console.log(`  ✓ ${userId}: already flagged, skipping`);
      skipped += 1;
      continue;
    }
    const result = await updateUser(userId, { mustChangeCode: true });
    if (result) {
      console.log(`  ✅ ${userId}: flag set — will be forced to /change-code on next login`);
      updated += 1;
    } else {
      console.log(`  ⚠️  ${userId}: update returned null`);
    }
  }

  console.log('\nDone.');
  console.log(`  Updated: ${updated}`);
  console.log(`  Already flagged: ${skipped}`);
  console.log(`  Not found: ${notFound}`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
