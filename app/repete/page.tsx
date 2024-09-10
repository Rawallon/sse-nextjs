"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<
    { message: string; timestamp: Date }[]
  >([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/sse");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Mensagens</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.message} as {new Date(msg.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
