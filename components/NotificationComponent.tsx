'use client'
import React, { useEffect, useState } from 'react';

const NotificationComponent = ({ userId }: { userId: string }) => {
  const [remarks, setRemarks] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`/api/notifications?user_id=${userId}`);
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data.remarks)) {
          setRemarks((prevRemarks) => [...prevRemarks, ...data.remarks]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [userId]);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {remarks.length > 0 ? (
        <ul className="space-y-2">
          {remarks.map((remark, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded">{remark}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No notifications.</p>
      )}
    </div>
  );
};

export default NotificationComponent;