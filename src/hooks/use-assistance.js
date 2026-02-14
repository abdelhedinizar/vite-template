import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket } from '../stores/slices/BasketSlice';
import axios from 'axios';

export function useFetchMessages(enabled = true) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetchedMessages = useRef(false);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const fetchMessages = async (mess) => {
    try {
      setLoading(true);
      // Use axios to make a POST request
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/assistances`, {
        messages: mess,
      });
      // Check if the response is successful
      if (response.status === 200) {
        const replyObj = response.data.data.choices[0].message.content;
        const message = {
          id: 'MSG-001',
          threadId: 'TRD-004',
          type: 'text',
          content: replyObj.reply,
          author: { id: 'USR-003', name: 'TasteBuddy', avatar: '/assets/waiter.png' },
          role: 'assistant',
          createdAt: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, message]);
        // If intent is place_order, add items to Redux basket
        if (replyObj.intent === 'place_order' && Array.isArray(replyObj.data?.items)) {
          // dispatch(clear());
          replyObj.data.items.forEach((item) => {
            const fullDish = categories
              .flatMap(category => category.dishes)
              .find(dish => dish.name === item.name);

            if (fullDish) {
              // Format the item to match the expected basket structure
              const basketItem = {
                dish: fullDish, // Use the complete dish object from Redux
                price: item.price || fullDish.price || 0,
                size: null,
                quantity: item.quantity || 1,
                addedAccompaniments: item.addedAccompaniments || [],
              };
              dispatch(addToBasket(basketItem));
            }
          });
        }
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
    if (!enabled || hasFetchedMessages.current) {
      return;
    }
    if (!hasFetchedMessages.current) {
      fetchMessages([
        {
          role: 'user',
          content: 'Hello',
        },
      ]);
      hasFetchedMessages.current = true;
    }
  }, [enabled]);

  return { messages, loading, error, handleAddMessage };
}
