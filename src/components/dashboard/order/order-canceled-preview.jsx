import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X'; // Changed icon

export function OrderCanceledPreview({ order, reset }) {
  const totalQuantity = order.dishes.reduce((total, dish) => total + dish.quantity, 0);

  return (
    <Stack spacing={2}>
      <Avatar
        sx={{
          '--Icon-fontSize': 'var(--icon-fontSize-lg)',
          bgcolor: 'var(--mui-palette-error-main)', // Changed color
          color: 'var(--mui-palette-error-contrastText)', // Changed color
        }}
      >
        <XIcon fontSize="var(--Icon-fontSize)" />
      </Avatar>
      <div>
        <Typography variant="h6">Order Canceled!</Typography> {/* Changed title */}
        <Typography color="text.secondary" variant="body2">
          Here's a summary of your canceled order {/* Changed subtitle */}
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
              Canceled 5 minutes ago {/* Changed status text */}
            </Typography>
            <Button size="small" onClick={reset}>
              Reset Order
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
