import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function App() {
  // --- STATE MANAGEMENT ---
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [key, setKey] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const [result, setResult] = useState<any>(null);

  // --- CORE LOGIC ---
  const handleProcess = () => {
    if (!key || !input) {
      alert("Please enter both a Master Key and a message!");
      return;
    }

    if (mode === 'encrypt') {
      // ENCRYPTION
      let payload = input;
      if (timer > 0) {
        const expiry = Math.floor(Date.now() / 1000) + timer;
        payload = `EXP:${expiry}|${input}`;
      }
      const encrypted = CryptoJS.AES.encrypt(payload, key).toString();
      setResult({ type: 'cipher', data: encrypted });
    } else {
      // DECRYPTION
      try {
        const bytes = CryptoJS.AES.decrypt(input, key);
        const decoded = bytes.toString(CryptoJS.enc.Utf8);

        if (!decoded) throw new Error("Invalid Key");

        // Check for Timer Metadata
        if (decoded.startsWith("EXP:")) {
          const parts = decoded.split('|');
          const expiry = parseInt(parts[0].replace("EXP:", ""));
          const actualMsg = parts.slice(1).join('|'); // Safely get message back
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
          // No timer metadata found, just show the message
          setResult({ type: 'plain', message: decoded });
        }
      } catch (error) {
        alert("Decryption Failed: Incorrect Master Key or invalid Ciphertext.");
        setResult(null);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied! 📋");
  };

  // --- USER INTERFACE ---
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 font-mono">
      <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl mt-10">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-6 text-center">
          CryPTrus 2.0
        </h1>

        {/* MODE TOGGLE BUTTONS */}
        <div className="flex bg-black p-1 rounded-2xl mb-6 border border-slate-800">
          <button 
            onClick={() => { setMode('encrypt'); setResult(null); setInput(''); }}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'encrypt' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-500'}`}
          >
            ENCRYPT
          </button>
          <button 
            onClick={() => { setMode('decrypt'); setResult(null); setInput(''); }}
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
            className="w-full bg-black border border-slate-700 p-4 rounded-xl focus:border-cyan-400 outline-none transition-colors"
            value={key} 
            onChange={(e) => setKey(e.target.value)}
          />
          
          {/* Dynamic Textarea */}
          <textarea 
            placeholder={mode === 'encrypt' ? "Type your secret message..." : "Paste your U2FsdGVk... cipher here"}
            className="w-full h-32 bg-black border border-slate-700 p-4 rounded-xl focus:border-cyan-400 outline-none transition-colors resize-none"
            value={input} 
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Timer Slider (Encrypt mode only) */}
          {mode === 'encrypt' && (
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
              <label className="text-xs text-slate-400 block mb-2 font-bold">
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
            className={`w-full py-4 rounded-xl font-black transition-all ${mode === 'encrypt' ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-red-600 text-white hover:bg-red-500'}`}
          >
            {mode === 'encrypt' ? '🔒 GENERATE VAULT STRING' : '🔓 UNLOCK VAULT'}
          </button>
        </div>

        {/* Result Display Area */}
        {result && (
          <div className="mt-6 p-4 bg-black rounded-xl border border-slate-700 relative">
            {result.expired ? (
              <p className="text-red-500 font-bold text-center animate-pulse">💀 MESSAGE SELF-DESTRUCTED</p>
            ) : (
              <div>
                <p className="text-xs text-slate-500 mb-2 font-bold uppercase">
                  {result.type === 'cipher' ? 'Encrypted Cipher:' : 'Decrypted Message:'}
                </p>
                <p className={`break-all font-bold ${result.type === 'cipher' ? 'text-cyan-300' : 'text-green-400'}`}>
                  {result.type === 'cipher' ? result.data : result.message}
                </p>
                
                {result.remaining && (
                  <p className="text-[10px] text-orange-400 mt-3 italic">
                    ⏳ Expires in {result.remaining} seconds...
                  </p>
                )}

                {/* Copy Button (Only for ciphers) */}
                {result.type === 'cipher' && (
                  <button 
                    onClick={() => copyToClipboard(result.data)}
                    className="absolute top-2 right-2 bg-slate-800 hover:bg-cyan-600 text-[10px] px-2 py-1 rounded transition-colors text-white"
                  >
                    COPY
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
