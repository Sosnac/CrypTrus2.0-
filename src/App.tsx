import React, { useState } from 'react';
import { encryptWithTimer, decryptWithTimer } from './utils/cryptoUtils';

function App() {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [key, setKey] = useState('');
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(0); // 0 means no timer
  const [result, setResult] = useState<any>(null);

  const handleProcess = () => {
    if (mode === 'encrypt') {
      const encrypted = encryptWithTimer(input, key, timer > 0 ? timer : null);
      setResult({ type: 'cipher', data: encrypted });
    } else {
      const decrypted = decryptWithTimer(input, key);
      setResult({ type: 'plain', ...decrypted });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-mono">
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">CryPTrus 2.0 Web</h1>

        {/* MODE BUTTONS */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => { setMode('encrypt'); setResult(null); }}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'encrypt' ? 'bg-cyan-600 shadow-cyan-900/50 shadow-lg' : 'bg-slate-800 text-slate-500'}`}
          >
            ENCRYPT
          </button>
          <button 
            onClick={() => { setMode('decrypt'); setResult(null); }}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'decrypt' ? 'bg-red-600 shadow-red-900/50 shadow-lg' : 'bg-slate-800 text-slate-500'}`}
          >
            DECRYPT
          </button>
        </div>

        {/* INPUTS */}
        <div className="space-y-4">
          <input 
            type="password" placeholder="Master Key"
            className="w-full bg-black border border-slate-700 p-4 rounded-xl"
            value={key} onChange={(e) => setKey(e.target.value)}
          />
          
          <textarea 
            placeholder={mode === 'encrypt' ? "Secret message..." : "Paste ciphertext..."}
            className="w-full h-32 bg-black border border-slate-700 p-4 rounded-xl"
            value={input} onChange={(e) => setInput(e.target.value)}
          />

          {mode === 'encrypt' && (
            <div className="p-4 bg-slate-800 rounded-xl">
              <label className="text-xs text-slate-400 block mb-2">AUTO-DESTRUCT: {timer === 0 ? 'OFF' : `${timer}s`}</label>
              <input type="range" min="0" max="300" step="30" value={timer} onChange={(e) => setTimer(Number(e.target.value))} className="w-full cursor-pointer" />
            </div>
          )}

          <button onClick={handleProcess} className="w-full bg-white text-black py-4 rounded-xl font-black hover:bg-cyan-400 transition-colors">
            {mode === 'encrypt' ? 'GENERATE VAULT STRING' : 'UNLOCK VAULT'}
          </button>
        </div>

        {/* RESULT BOX */}
        {result && (
          <div className="mt-8 p-6 bg-black rounded-2xl border border-dashed border-slate-700 animate-pulse">
            {result.expired ? (
              <p className="text-red-500 font-bold text-center">💀 MESSAGE SELF-DESTRUCTED</p>
            ) : (
              <>
                <p className="text-xs text-slate-500 mb-2 uppercase">{result.type === 'cipher' ? 'Ciphertext' : 'Original Message'}</p>
                <p className="break-all text-cyan-300 font-bold">{result.message || result.data}</p>
                {result.remaining && <p className="text-[10px] text-orange-400 mt-2">Expires in {result.remaining}s</p>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
