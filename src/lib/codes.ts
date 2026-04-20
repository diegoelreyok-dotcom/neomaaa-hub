import { randomInt } from 'crypto';

/**
 * Generate a crypto-secure login code.
 * Ambiguous chars (0/O, 1/l/I) kept out for readability.
 * Shared by user creation and admin regenerate-code flows.
 */
export function generateCode(length = 6): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(randomInt(0, chars.length));
  }
  return code;
}
