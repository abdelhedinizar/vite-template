'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { DataTable } from '@/components/core/data-table';

const columns = [
  {
    formatter: (row) => {
      let dishImage = row?.dish?.image;
      if (dishImage && dishImage.startsWith('../')) {
        dishImage = dishImage.replace('..', '');
      }
      return (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              backgroundImage: `url(${dishImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              bgcolor: 'var(--mui-palette-background-level2)',
              borderRadius: 1,
              flex: '0 0 auto',
              height: '40px',
              width: '40px',
            }}
          />
          <Link color="text.primary" variant="subtitle2">
            {row?.dish?.name}
          </Link>
        </Stack>
      );
    },
    name: 'Product',
    width: '220px',
  },
  { field: 'quantity', name: 'Qty', width: '100px' },
  {
    formatter: (row) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(row?.dish?.price);
    },
    name: 'Unit Price',
    width: '120px',
  },
  {
    formatter: (row) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(row?.price);
    },
    name: 'Amount',
    width: '100px',
    align: 'right',
  },
];

export function LineItemsTable({ rows }) {
  return rows ? <DataTable columns={columns} rows={rows} /> : null;
}
