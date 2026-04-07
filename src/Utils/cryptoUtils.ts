import CryptoJS from 'crypto-js';

// This is the 30-line "Pro" logic named to work with my App.tsx
export const encryptData = (text: string, key: string, seconds: number | null = null): string => {
    let payload = text;
    if (seconds) {
        const expiry = Math.floor(Date.now() / 1000) + seconds;
        payload = `EXP:${expiry}|${text}`;
    }
    return CryptoJS.AES.encrypt(payload, key).toString();
};

export const decryptData = (ciphertext: string, key: string): { message: string; expired: boolean; remaining?: number } => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, key);
        const decoded = bytes.toString(CryptoJS.enc.Utf8);

        if (decoded.startsWith("EXP:")) {
            const [meta, msg] = decoded.split('|');
            const expiry = parseInt(meta.replace("EXP:", ""));
            const now = Math.floor(Date.now() / 1000);

            if (now > expiry) return { message: "", expired: true };
            return { message: msg, expired: false, remaining: expiry - now };
        }

        return { message: decoded, expired: false };
    } catch {
        return { message: "Error: Invalid Key or Cipher", expired: false };
    }
};