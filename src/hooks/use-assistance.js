import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export function useFetchMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetchedMessages = useRef(false);

  const fetchMessages = async (mess) => {
    try {
      setLoading(true);
      // Use axios to make a POST request
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/assistances`, {
        messages: mess,
      });
      // Check if the response is successful
      if (response.status === 200) {
        const message = {
          id: 'MSG-001',
          threadId: 'TRD-004',
          type: 'text',
          content: response.data.data.choices[0].message.content.reply,
          author: { id: 'USR-003', name: 'TasteBuddy', avatar: '/assets/waiter.png' },
          role: 'assistant',
          createdAt: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, message]);
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMessage = async (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    const msg = JSON.parse(JSON.stringify(messages));
    msg.push(message);
    const messagesBody = msg.map((m) => {
      return {
        role: m.role || 'user',
        content: m.content,
      };
    });
    await fetchMessages(messagesBody);
  };

  useEffect(() => {
    if (!hasFetchedMessages.current) {
      fetchMessages([]);
      hasFetchedMessages.current = true;
    }
  }, []);

  return { messages, loading, error, handleAddMessage };
}
