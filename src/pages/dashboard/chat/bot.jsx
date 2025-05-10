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
  const handleChange = (userTyping) => {
    setIsUserTyping(userTyping);
  };

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
    <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0 }}>
      <ThreadToolbar thread={thread} />
      <Stack spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto', p: 3 }}>
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
      </Stack>
      <MessageAdd onSend={handleAddMessage} user={user} onChange={handleChange} />
    </Box>
  );
}
