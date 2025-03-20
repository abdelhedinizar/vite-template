import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';

export function OrderPreview({ order }) {
  const totalQuantity = order.dishes.reduce((total, dish) => total + dish.quantity, 0);

  return (
    <Stack spacing={2}>
      <Avatar
        sx={{
          '--Icon-fontSize': 'var(--icon-fontSize-lg)',
          bgcolor: 'var(--mui-palette-success-main)',
          color: 'var(--mui-palette-success-contrastText)',
        }}
      >
        <CheckIcon fontSize="var(--Icon-fontSize)" />
      </Avatar>
      <div>
        <Typography variant="h6">Order Completed!</Typography>
        <Typography color="text.secondary" variant="body2">
          Here's a summary of your completed order
        </Typography>
      </div>
      <Card variant="outlined">
        <Stack
          direction="row"
          sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', px: 2, py: 1.5 }}
        >
          <div>
            <Typography variant="subtitle1">ORD-{order?.sequenceNumber}</Typography>
            <Typography color="text.secondary" variant="caption">
              Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order?.totalPrice)}{' '}
              • {totalQuantity} items
            </Typography>
          </div>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography color="text.secondary" variant="caption">
              Completed 5 minutes ago
            </Typography>
            <Button size="small">View Details</Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
