import React, { useState, useEffect } from 'react';
import { encryptData, decryptData } from './utils/cryptoUtils';

function App() {
  // This tells the app: "Use the .env key if it exists, otherwise use this backup."
const [userKey, setUserKey] = useState<string>(
  process.env.REACT_APP_MASTER_KEY || 'default-key-123'
);
;
  const [encryptedText, setEncryptedText] = useState<string>('');
  const [cipherToDecrypt, setCipherToDecrypt] = useState<string>('');
  const [decryptedResult, setDecryptedResult] = useState<string>('');

  // Update encryption whenever text OR key changes
  useEffect(() => {
    setEncryptedText(inputText ? encryptData(inputText, userKey) : '');
  }, [inputText, userKey]);

  // Update decryption whenever cipher OR key changes
  useEffect(() => {
    try {
      const result = decryptData(cipherToDecrypt, userKey);
      setDecryptedResult(result || (cipherToDecrypt ? "⚠️ Invalid Key or Cipher" : ""));
    } catch {
      setDecryptedResult("❌ Error decrypting");
    }
  }, [cipherToDecrypt, userKey]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied! 📋");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
            CryPTrus 2.0
          </h1>
          <p className="text-slate-400">Military-grade AES-256 Encryption Dashboard</p>
        </header>

        {/* Global Key Setting */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl mb-8">
          <label className="block text-cyan-400 text-sm font-bold mb-2">MASTER SECURITY KEY</label>
          <input 
            type="password"
            value={userKey}
            onChange={(e) => setUserKey(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:border-cyan-500 outline-none transition-all"
            placeholder="Enter your secret passphrase..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* ENCRYPTION PANEL */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-green-400">●</span> Encrypt Message
            </h2>
            <textarea 
              className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-3 mb-4 resize-none"
              placeholder="Plaintext message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 min-h-[100px] relative group">
              <p className="text-xs text-slate-500 mb-2 font-bold uppercase">Encrypted Output</p>
              <p className="break-all text-sm text-cyan-200">{encryptedText || "Awaiting input..."}</p>
              {encryptedText && (
                <button 
                  onClick={() => copyToClipboard(encryptedText)}
                  className="absolute top-2 right-2 bg-slate-800 hover:bg-cyan-600 text-[10px] px-2 py-1 rounded transition-colors"
                >
                  COPY
                </button>
              )}
            </div>
          </div>

          {/* DECRYPTION PANEL */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-red-400">●</span> Decrypt Message
            </h2>
            <textarea 
              className="w-full h-32 bg-slate-950 border border-slate-700 rounded-lg p-3 mb-4 resize-none"
              placeholder="Paste Ciphertext..."
              value={cipherToDecrypt}
              onChange={(e) => setCipherToDecrypt(e.target.value)}
            />
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 min-h-[100px]">
              <p className="text-xs text-slate-500 mb-2 font-bold uppercase">Decrypted Output</p>
              <p className="text-sm text-green-400">{decryptedResult || "Awaiting valid cipher..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
