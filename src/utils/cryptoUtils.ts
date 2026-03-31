import CryptoJS from 'crypto-js';

// This should be a complex string stored in an environment variable (.env)
const SECRET_KEY = "my-super-secret-key";

/**
 * Encrypts a string of text using AES-256
 * @param text The plain text to encrypt
 * @returns The encrypted string (Ciphertext)
 */
export const encryptData = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

/**
 * Decrypts an AES-256 encrypted string
 * @param ciphertext The encrypted string
 * @returns The original plain text
 */
export const decryptData = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
