import React, { useState, useEffect } from 'react';
import { encryptData, decryptData } from './utils/cryptoUtils';

function App() {
  const handleProcess = () => {
  if (!key || !input) {
    alert("Please enter both a key and a message/cipher!");
    return;
  }

  if (mode === 'encrypt') {
    // 1. Add timer metadata if selected
    let payload = input;
    if (timer > 0) {
      const expiry = Math.floor(Date.now() / 1000) + timer;
      payload = `EXP:${expiry}|${input}`;
    }
    // 2. Encrypt the whole payload
    const encrypted = CryptoJS.AES.encrypt(payload, key).toString();
    setResult({ type: 'cipher', data: encrypted });
  } else {
    // 1. Decrypt the raw string
    try {
      const bytes = CryptoJS.AES.decrypt(input, key);
      const decoded = bytes.toString(CryptoJS.enc.Utf8);

      if (!decoded) throw new Error("Invalid Key");

      // 2. Check for Timer Metadata
      if (decoded.startsWith("EXP:")) {
        const parts = decoded.split('|');
        const expiry = parseInt(parts[0].replace("EXP:", ""));
        const actualMsg = parts[1];
        const now = Math.floor(Date.now() / 1000);

        if (now > expiry) {
          setResult({ expired: true });
        } else {
          setResult({ 
            type: 'plain', 
            message: actualMsg, 
            remaining: expiry - now 
          });
        }
      } else {
        // No timer, just show message
        setResult({ type: 'plain', message: decoded });
      }
    } catch (error) {
      alert("Decryption Failed: Likely an incorrect Master Key.");
      setResult(null);
    }
  }
};
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
return (
  <div className="min-h-screen bg-slate-950 text-white p-4 font-mono">
    <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6 text-center">CryPTrus 2.0 Vault</h1>

      {/* 🟢 NEW: MODE TOGGLE BUTTONS */}
      <div className="flex bg-black p-1 rounded-2xl mb-6 border border-slate-800">
        <button 
          onClick={() => { setMode('encrypt'); setResult(null); }}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'encrypt' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500'}`}
        >
          ENCRYPT
        </button>
        <button 
          onClick={() => { setMode('decrypt'); setResult(null); }}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'decrypt' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500'}`}
        >
          DECRYPT
        </button>
      </div>

      <div className="space-y-4">
        {/* Master Key Input */}
        <input 
          type="password" 
          placeholder="Master Key (Secret Password)"
          className="w-full bg-black border border-slate-700 p-4 rounded-xl focus:border-cyan-400 outline-none"
          value={key} 
          onChange={(e) => setKey(e.target.value)}
        />
        
        {/* Dynamic Textarea based on Mode */}
        <textarea 
          placeholder={mode === 'encrypt' ? "Type your secret message..." : "Paste your U2FsdGVk... cipher here"}
          className="w-full h-32 bg-black border border-slate-700 p-4 rounded-xl focus:border-cyan-400 outline-none"
          value={input} 
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Timer Slider (Only shows in Encrypt mode) */}
        {mode === 'encrypt' && (
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <label className="text-xs text-slate-400 block mb-2">
              AUTO-DESTRUCT: {timer === 0 ? 'DISABLED' : `${timer} SECONDS`}
            </label>
            <input 
              type="range" min="0" max="300" step="30" 
              value={timer} 
              onChange={(e) => setTimer(Number(e.target.value))} 
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400" 
            />
          </div>
        )}

        {/* Action Button */}
        <button 
          onClick={handleProcess} 
          className={`w-full py-4 rounded-xl font-black transition-all ${mode === 'encrypt' ? 'bg-white text-black hover:bg-cyan-400' : 'bg-red-500 text-white hover:bg-red-400'}`}
        >
          {mode === 'encrypt' ? '🔒 GENERATE VAULT STRING' : '🔓 UNLOCK VAULT'}
        </button>
      </div>

      {/* Result Display Area */}
      {result && (
        <div className="mt-6 p-4 bg-black rounded-xl border border-dashed border-slate-700">
          {result.expired ? (
            <p className="text-red-500 font-bold text-center animate-pulse">💀 MESSAGE SELF-DESTRUCTED</p>
          ) : (
            <div>
              <p className="text-[10px] text-slate-500 mb-1 uppercase">Result:</p>
              <p className="break-all text-cyan-300 font-bold selection:bg-cyan-900">
                {result.type === 'cipher' ? result.data : result.message}
              </p>
              {result.remaining && (
                <p className="text-[10px] text-orange-400 mt-2 italic">
                  Expires in {result.remaining}s...
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

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
            placeholder="Supreme-key369"
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
