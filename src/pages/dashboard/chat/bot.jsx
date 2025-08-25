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
  
  const handleChange = (userTyping) => {
    setIsUserTyping(userTyping);
  };

  // Scroll to bottom when new messages arrive or keyboard appears
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, loading, isUserTyping]);

  // Handle mobile keyboard appearing
  React.useEffect(() => {
    const handleResize = () => {
      // Small delay to ensure the keyboard is fully shown
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    
    // Also listen for viewport changes on mobile
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
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
          paddingBottom: 1,
          // Ensure proper scrolling on mobile
          WebkitOverflowScrolling: 'touch'
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
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </Stack>
      <Box
        sx={{
          flexShrink: 0,
          // Ensure the input stays at the bottom
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
          // Add safe area for mobile devices
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
      >
        <MessageAdd onSend={handleAddMessage} user={user} onChange={handleChange} />
      </Box>
    </Box>
  );
}
