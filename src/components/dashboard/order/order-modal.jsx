'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HourglassMedium as HourglassMediumIcon } from '@phosphor-icons/react/dist/ssr';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';
import { ChefHat as ChefHatIcon } from '@phosphor-icons/react/dist/ssr/ChefHat';
import { BowlSteam as BowlSteamIcon } from '@phosphor-icons/react/dist/ssr/BowlSteam';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { RouterLink } from '@/components/core/link';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';

import { LineItemsTable } from './line-items-table';

const mapping = {
  pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
  completed: {
    label: 'Completed',
    icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
  },
  cancelled: { label: 'Canceled', icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
  rejected: { label: 'Rejected', icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
  inProgress: {
    label: 'InProgress',
    icon: <HourglassMediumIcon color="var(--mui-palette-info-main)" weight="fill" />,
  },
  Processing: {
    label: 'Processing',
    icon: <ChefHatIcon color="var(--mui-palette-info-main)" weight="fill" />,
  },
  Dispatched: { label: 'Dispatched', icon: <BowlSteamIcon color="var(--mui-palette-info-main)" /> }
};

export function OrderModal({ open, order }) {
  const { label, icon } = mapping[order?.status] ?? { label: 'Unknown', icon: null };

  const navigate = useNavigate();

  // This component should load the order from the API based on the orderId prop.
  // For the sake of simplicity, we are just using a static order object.

  const handleClose = React.useCallback(() => {
    navigate(paths.dashboard.orders.list);
  }, [navigate]);

  return (
    <Dialog
      maxWidth="sm"
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '100%', width: '100%' },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between' }}>
          <Typography variant="h6">ORD-{order?.sequenceNumber}</Typography>
          <IconButton onClick={handleClose}>
            <XIcon />
          </IconButton>
        </Stack>
        <Stack spacing={3} sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">Details</Typography>
              <Button
                color="secondary"
                component={RouterLink}
                href={paths.dashboard.orders.details('1')}
                startIcon={<PencilSimpleIcon />}
              >
                Edit
              </Button>
            </Stack>
            <Card sx={{ borderRadius: 1 }} variant="outlined">
              <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '12px 24px' }}>
                {[
                  { key: 'Customer', value: <Link variant="subtitle2">{order?.user?.name}</Link> },
                  {
                    key: 'Address',
                    value: (
                      <Typography variant="subtitle2">
                        {order?.user?.address?.line1}
                        <br />
                        {order?.user?.address?.line2}
                        {order?.user?.address?.city}
                        <br />
                        {order?.user?.address?.state}, {order?.user?.address?.country}
                      </Typography>
                    ),
                  },
                  { key: 'Date', value: dayjs(order?.createdAt).format('MMMM D, YYYY hh:mm A') },
                  // Added Table info
                  {
                    key: 'Table',
                    value: (
                      <Typography variant="subtitle2">{order?.tableName || order?.table || '—'}</Typography>
                    ),
                  },
                  {
                    key: 'Status',
                    value: <Chip icon={icon} label={label} size="small" variant="outlined" />,
                  },
                  {
                    key: 'Payment method',
                    value: (
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          sx={{ bgcolor: 'var(--mui-palette-background-paper)', boxShadow: 'var(--mui-shadows-8)' }}
                        >
                          <Box
                            component="img"
                            src="/assets/payment-method-1.png"
                            sx={{ borderRadius: '50px', height: 'auto', width: '35px' }}
                          />
                        </Avatar>
                        <div>
                          <Typography variant="body2">Mastercard</Typography>
                          <Typography color="text.secondary" variant="body2">
                            **** {order?.cardLast4}
                          </Typography>
                        </div>
                      </Stack>
                    ),
                  },
                ].map((item) => (
                  <PropertyItem key={item.key} name={item.key} value={item.value} />
                ))}
              </PropertyList>
            </Card>
          </Stack>
          <Stack spacing={3}>
            <Typography variant="h6">items</Typography>
            <Card sx={{ borderRadius: 1 }} variant="outlined">
              <Box sx={{ overflowX: 'auto' }}>
                <LineItemsTable rows={order?.dishes} />
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3 }}>
                <Stack spacing={2} sx={{ width: '300px', maxWidth: '100%' }}>
                  <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Subtotal</Typography>
                    <Typography variant="body2">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order?.totalPrice)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2">Discount</Typography>
                    <Typography variant="body2">-</Typography>
                  </Stack>

                  <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1">Total</Typography>
                    <Typography variant="subtitle1">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(order?.totalPrice)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Card>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
