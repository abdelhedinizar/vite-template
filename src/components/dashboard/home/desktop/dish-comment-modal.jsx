import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

// Simple empty modal placeholder similar style intent to OrderModal
export function DishCommentModal({ open, dish, onClose }) {
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={onClose}
      sx={{
       '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '100%', width: '100%' },
      }}
    >
      <DialogTitle sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">{dish?.name || 'Dish'}</Typography>
          <IconButton onClick={onClose} size="small">
            <XIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          (Empty modal content placeholder)
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
