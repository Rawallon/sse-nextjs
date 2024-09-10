'use client';

import { useState } from 'react';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [response, setResponse] = useState(null);

  const sendUserId = async () => {
    const res = await fetch('/api/sse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <div style={{display: 'grid', gap: '16px', maxWidth: "50vh"}}>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Digite o ID do usuário"
        style={{borderRadius: '8px', color: 'black'}}
      />
      <button style={{background:"white", borderRadius: '16px', color:"black"}}  onClick={sendUserId}>Fazer req.</button>
      </div>

      {response && (
        <div>
          <h2>API Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
