import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${buf.toString('hex')}`;
}

export const comparePasswords = async (storedPassword: string, suppliedPassword: string): Promise<boolean> => {
  const [salt, hashedPassword] = storedPassword.split(':');
  if (!salt || !hashedPassword) {
    throw new Error('Invalid stored password format');
  }

  const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
  return hashedPassword === buf.toString('hex');
}