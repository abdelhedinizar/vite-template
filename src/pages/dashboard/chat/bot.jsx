import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useFetchMessages } from '@/hooks/use-assistance';
import { useUser } from '@/hooks/use-user';
import { MessageAdd } from '@/components/dashboard/chat/message-add';
import { MessageBox } from '@/components/dashboard/chat/message-box';
import { ThreadToolbar } from '@/components/dashboard/chat/thread-toolbar';
import { TypingIndicator } from '@/components/dashboard/chat/TypingIndicator';

export function Page() {
  const { messages, loading, error, handleAddMessage } = useFetchMessages();
  const { user } = useUser();
  const [isUserTyping, setIsUserTyping] = React.useState(false);
  const messagesEndRef = React.useRef(null);
  const inputContainerRef = React.useRef(null);
  const [inputHeight, setInputHeight] = React.useState(0);
  const [keyboardOffset, setKeyboardOffset] = React.useState(0);

  const handleChange = (userTyping) => {
    setIsUserTyping(userTyping);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, loading, isUserTyping]);

  React.useEffect(() => {
    const updateKeyboardOffset = () => {
      const vv = window.visualViewport;
      if (vv) {
        const offset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
        setKeyboardOffset(offset);
      }
      setTimeout(scrollToBottom, 50);
    };

    window.addEventListener('resize', updateKeyboardOffset);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateKeyboardOffset);
      window.visualViewport.addEventListener('scroll', updateKeyboardOffset);
    }

    return () => {
      window.removeEventListener('resize', updateKeyboardOffset);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateKeyboardOffset);
        window.visualViewport.removeEventListener('scroll', updateKeyboardOffset);
      }
    };
  }, []);

  React.useLayoutEffect(() => {
    if (!inputContainerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect?.height ?? 0;
      setInputHeight(h);
    });
    ro.observe(inputContainerRef.current);
    return () => ro.disconnect();
  }, []);

  const thread = {
    id: 'TRD-004',
    type: 'direct',
    participants: [
      { id: user._id, name: user.firstname, avatar: user.avatar },
      { id: 'USR-003', name: 'TasteBuddy', avatar: '/assets/waiter.png' },
    ],
    unreadCount: 0,
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flex: '1 1 auto', 
        flexDirection: 'column', 
        minHeight: 0,
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      <ThreadToolbar thread={thread} />
      <Stack 
        spacing={2} 
        sx={{ 
          flex: '1 1 auto', 
          overflowY: 'auto', 
          p: 3,
          pb: `${inputHeight + 12}px`,
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorY: 'contain'
        }}
      >
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} user={user} />
        ))}
        {loading ? (
          <TypingIndicator
            author={{ id: 'USR-003', name: 'TasteBuddy', avatar: '/assets/waiter.png' }}
            position="left"
          />
        ) : null}
        {isUserTyping ? (
          <TypingIndicator author={{ id: user._id, name: user.name, avatar: user.avatar }} position="right" />
        ) : null}
        <div ref={messagesEndRef} />
      </Stack>
      <Box
        ref={inputContainerRef}
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          transform: keyboardOffset > 0 ? `translateY(-${keyboardOffset}px)` : 'none',
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          zIndex: 1200
        }}
      >
        <MessageAdd onSend={handleAddMessage} user={user} onChange={handleChange} />
      </Box>
    </Box>
  );
}
