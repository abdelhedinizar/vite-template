import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetchMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Optional: Handle errors

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Use axios to make a POST request
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/assistances`, {
          messages: [],
        });

        // Check if the response is successful
        if (response.status === 200) {
          const message = {
            id: 'MSG-001',
            threadId: 'TRD-004',
            type: 'text',
            content: response.data.data.choices[0].message.content,
            author: { id: 'USR-003', name: 'TasteBuddy', avatar: '/assets/waiter.png' },
            createdAt: new Date(),
          };
          setMessages([message]); // Assuming the response contains the messages
        } else {
          throw new Error('Failed to fetch messages');
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return { messages, loading, error };
}
