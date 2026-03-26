import CryptoJS from 'crypto-js';

/**
 * Encrypts text using a user-provided key
 */
export const encryptData = (text: string, key: string): string => {
  if (!key) return ""; 
  return CryptoJS.AES.encrypt(text, key).toString();
};

/**
 * Decrypts ciphertext using a user-provided key
 */
export const decryptData = (ciphertext: string, key: string): string => {
  if (!key || !ciphertext) return "";
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};
