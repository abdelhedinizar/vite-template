'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { HourglassMedium as HourglassMediumIcon } from '@phosphor-icons/react/dist/ssr';
import { BowlSteam as BowlSteamIcon } from '@phosphor-icons/react/dist/ssr/BowlSteam';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { ChefHat as ChefHatIcon } from '@phosphor-icons/react/dist/ssr/ChefHat';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import { Path as PathIcon } from '@phosphor-icons/react/dist/ssr/Path';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

import { useOrdersSelection } from './orders-selection-context';

const columns = [
  {
    formatter: (row) => (
      <IconButton component={RouterLink} to={paths.dashboard.orders.details(row.id)} type="error">
        <PathIcon />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    maxWidth: '40px',
    width: '40px',
    align: 'center',
  },
  {
    formatter: (row) => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        {(() => {
          let dishImage = row.dishes[0]?.dish?.image;
          if (dishImage && dishImage.startsWith('../')) {
            dishImage = dishImage.replace('..', '');
          }
          return row.dishes[0]?.dish?.image ? (
            <Box
              sx={{
                alignItems: 'center',
                bgcolor: 'var(--mui-palette-background-level2)',
                backgroundImage: `url(${dishImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: 1,
                display: 'flex',
                height: '80px',
                justifyContent: 'center',
                overflow: 'hidden',
                width: '80px',
              }}
            />
          ) : (
            <Box
              sx={{
                alignItems: 'center',
                bgcolor: 'var(--mui-palette-background-level2)',
                borderRadius: 1,
                display: 'flex',
                height: '80px',
                justifyContent: 'center',
                width: '80px',
              }}
            >
              <ImageIcon fontSize="var(--icon-fontSize-lg)" />
            </Box>
          );
        })()}
        <Box
          sx={{
            bgcolor: 'var(--mui-palette-background-level1)',
            borderRadius: 1.5,
            flex: '0 0 auto',
            p: '4px 8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="caption">{dayjs(row?.createdAt).format('MMM').toUpperCase()}</Typography>
          <Typography variant="h6">{dayjs(row?.createdAt).format('D')}</Typography>
        </Box>
        <div>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.orders.preview('1')}
            sx={{ cursor: 'pointer' }}
            variant="subtitle2"
          >
            <Typography color="text.secondary" variant="body2">
              {row?.user?.name}{' '}
            </Typography>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(row?.totalPrice)}
          </Link>
          {row?.dishes?.map((dish) => (
            <Typography color="text.secondary" variant="body2" key={dish.id}>
              {dish.quantity} {dish?.dish?.name} •{' '}
              <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(dish?.price)}
              </Box>
            </Typography>
          ))}
        </div>
      </Stack>
    ),
    name: 'Order',
    width: '420px',
  },
  {
    formatter: (row) => {
      const mapping = {
        pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
        completed: {
          label: 'Completed',
          icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
        },
        cancelled: { label: 'Canceled', icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
        Dispatched: { label: 'Dispatched', icon: <BowlSteamIcon color="var(--mui-palette-info-main)" /> },
        inProgress: {
          label: 'InProgress',
          icon: <HourglassMediumIcon color="var(--mui-palette-info-main)" weight="fill" />,
        },
        Processing: {
          label: 'Processing',
          icon: <ChefHatIcon color="var(--mui-palette-info-main)" weight="fill" />,
        },
      };
      const { label, icon } = mapping[row.status] ?? { label: 'Unknown', icon: null };

      return <Chip icon={icon} label={label} size="small" variant="outlined" />;
    },
    name: 'Status',
    width: '100px',
  },
];

export function OrdersTable({ rows }) {
  const { selected, deselectAll, deselectOne, selectAll, selectOne } = useOrdersSelection();

  return (
    <React.Fragment>
      <DataTable columns={columns} rows={rows} />
      {!rows?.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No orders found
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
