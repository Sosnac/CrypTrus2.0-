import React, { useState } from 'react';
import { encryptData, decryptData } from './utils/cryptoUtils';

function App() {
  // States for Encryption
  const [inputText, setInputText] = useState<string>('');
  const [encryptedText, setEncryptedText] = useState<string>('');

  // States for Decryption
  const [cipherToDecrypt, setCipherToDecrypt] = useState<string>('');
  const [decryptedResult, setDecryptedResult] = useState<string>('');

  // 1. Real-time Encryption Logic
  const handleEncrypt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);
    setEncryptedText(value ? encryptData(value) : '');
  };

  // 2. Decryption Logic
  const handleDecrypt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCipherToDecrypt(value);
    try {
      const result = decryptData(value);
      setDecryptedResult(result || "Invalid Ciphertext");
    } catch (err) {
      setDecryptedResult("Error: Could not decrypt.");
    }
  };

  // 3. Copy to Clipboard Logic
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard! 📋");
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>
      <h1 align="center">CryPTrus 2.0 🛡️</h1>
      <hr />

      {/* ENCRYPTION SECTION */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Step 1: Encrypt</h2>
        <textarea 
          placeholder="Enter plain text here..."
          value={inputText}
          onChange={handleEncrypt}
          style={textareaStyle}
        />
        <div style={resultBoxStyle}>
          <strong>Ciphertext:</strong>
          <p style={{ wordBreak: 'break-all' }}>{encryptedText || "..."}</p>
          {encryptedText && (
            <button onClick={() => copyToClipboard(encryptedText)} style={buttonStyle}>
              Copy Ciphertext
            </button>
          )}
        </div>
      </section>

      {/* DECRYPTION SECTION */}
      <section>
        <h2>Step 2: Decrypt</h2>
        <textarea 
          placeholder="Paste encrypted text here..."
          value={cipherToDecrypt}
          onChange={handleDecrypt}
          style={textareaStyle}
        />
        <div style={{ ...resultBoxStyle, background: '#e7f3ff' }}>
          <strong>Original Message:</strong>
          <p>{decryptedResult || "..."}</p>
        </div>
      </section>
    </div>
  );
}

// Simple Inline Styles
const textareaStyle: React.CSSProperties = {
  width: '100%',
  height: '100px',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
  marginBottom: '10px'
};

const resultBoxStyle: React.CSSProperties = {
  padding: '15px',
  background: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '8px'
};

const buttonStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#007ACC',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px'
};

export default App;
