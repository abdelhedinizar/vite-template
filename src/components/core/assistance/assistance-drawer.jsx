'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { useFetchMessages } from '@/hooks/use-assistance';
import { useUser } from '@/hooks/use-user';
import { MessageAdd } from '@/components/dashboard/chat/message-add';
import { MessageBox } from '@/components/dashboard/chat/message-box';
import { TypingIndicator } from '@/components/dashboard/chat/TypingIndicator';

export function AssistanceDrawer({ onClose, open }) {
  const { messages, loading, error, handleAddMessage } = useFetchMessages();
  const { user } = useUser();
  const [isUserTyping, setIsUserTyping] = React.useState(false);
  
  const handleChange = (userTyping) => {
    setIsUserTyping(userTyping);
  };

  return (
    <Drawer
      ModalProps={{ BackdropProps: { invisible: true }, sx: { zIndex: 1400 } }}
      PaperProps={{ 
        elevation: 24, 
        sx: { 
          display: 'flex', 
          flexDirection: 'column', 
          maxWidth: '100%', 
          width: '440px',
          height: '100vh'
        } 
      }}
      anchor="right"
      disableScrollLock
      onClose={onClose}
      open={open}
    >
      <Stack 
        direction="row" 
        spacing={3} 
        sx={{ 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          px: 3, 
          pt: 2,
          borderBottom: '1px solid var(--mui-palette-divider)',
          pb: 2
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Box
            component="img"
            src="/assets/waiter.png"
            sx={{ 
              width: '40px', 
              height: '40px',
              borderRadius: '50%'
            }}
          />
          <div>
            <Typography variant="h6">TasteBuddy</Typography>
            <Typography variant="caption" color="text.secondary">
              AI Restaurant Assistant
            </Typography>
          </div>
        </Stack>
        <IconButton onClick={onClose}>
          <XIcon />
        </IconButton>
      </Stack>
      
      <Box sx={{ 
        flex: '1 1 auto', 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: 0 
      }}>
        <Stack 
          spacing={2} 
          sx={{ 
            flex: '1 1 auto', 
            overflowY: 'auto', 
            p: 3,
            minHeight: 0
          }}
        >
          {messages.length === 0 && !loading && (
            <Box sx={{ 
              textAlign: 'center', 
              py: 4,
              color: 'text.secondary'
            }}>
              <Typography variant="body2">
                👋 Hello! I'm TasteBuddy, your AI restaurant assistant.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Ask me about our menu, recommendations, or anything else!
              </Typography>
            </Box>
          )}
          
          {messages.map((message) => (
            <MessageBox key={message.id} message={message} user={user} />
          ))}
          
          {loading && (
            <TypingIndicator
              author={{ id: 'USR-003', name: 'TasteBuddy', avatar: '/assets/waiter.png' }}
              position="left"
            />
          )}
          
          {isUserTyping && (
            <TypingIndicator 
              author={{ id: user._id, name: user.name, avatar: user.photo }} 
              position="right" 
            />
          )}
        </Stack>
        
        <Box sx={{ 
          borderTop: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)'
        }}>
          <MessageAdd 
            onSend={handleAddMessage} 
            user={user} 
            onChange={handleChange}
            disabled={loading}
          />
        </Box>
      </Box>
    </Drawer>
  );
}
