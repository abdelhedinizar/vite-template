import * as React from 'react';
import Box from '@mui/material/Box';
import './TypingIndicator.css'; // We'll create this CSS file next
import { Stack } from '@mui/system';
import { Avatar } from '@mui/material';

export function TypingIndicator({ author, position}) {
  return (
    <Box sx={{ alignItems: position === 'right' ? 'flex-end' : 'flex-start', flex: '0 0 auto', display: 'flex' }}>
      <Stack
        direction={position === 'right' ? 'row-reverse' : 'row'}
        spacing={2}
        sx={{
          alignItems: 'flex-start',
          maxWidth: '500px',
          ml: position === 'right' ? 'auto' : 0,
          mr: position === 'left' ? 'auto' : 0,
        }}
      >
        <Avatar src={author.avatar} sx={{ '--Avatar-size': '32px' }} />
    
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 2 }}>
      <div className="typing-indicator">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </Box>
    </Stack>
    </Box>
  );
}