'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { Robot as RobotIcon } from '@phosphor-icons/react/dist/ssr/Robot';

import { AssistanceDrawer } from './assistance-drawer';

export function AssistanceButton() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <React.Fragment>
      <Tooltip title="AI Assistant">
        <Box
          component="button"
          onClick={() => {
            setOpenDrawer(true);
          }}
          sx={{
            animation: 'pulse 2s ease-in-out infinite',
            background: 'var(--mui-palette-primary-main)',
            border: 'none',
            borderRadius: '50%',
            bottom: 0,
            color: 'var(--mui-palette-primary-contrastText)',
            cursor: 'pointer',
            display: 'inline-flex',
            height: '40px',
            m: 4,
            p: '10px',
            position: 'fixed',
            right: 0,
            width: '40px',
            zIndex: 'var(--mui-zIndex-modal)',
            '&:hover': { 
              bgcolor: 'var(--mui-palette-primary-dark)',
              transform: 'scale(1.1)',
              transition: 'all 0.2s ease-in-out'
            },
            '@keyframes pulse': { 
              '0%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.7)' },
              '70%': { boxShadow: '0 0 0 10px rgba(25, 118, 210, 0)' },
              '100%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)' }
            },
          }}
        >
          <RobotIcon fontSize="var(--icon-fontSize-md)" />
        </Box>
      </Tooltip>
      <AssistanceDrawer
        onClose={() => {
          setOpenDrawer(false);
        }}
        open={openDrawer}
      />
    </React.Fragment>
  );
}
