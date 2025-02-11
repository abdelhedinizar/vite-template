import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { OrderModal } from '@/components/dashboard/order/order-modal';
import { OrdersFilters } from '@/components/dashboard/order/orders-filters';
import { OrdersPagination } from '@/components/dashboard/order/orders-pagination';
import { OrdersSelectionProvider } from '@/components/dashboard/order/orders-selection-context';
import { OrdersTable } from '@/components/dashboard/order/orders-table';

const metadata = { title: `List | Orders | Dashboard | ${config.site.name}` };

const orders1 = [
  {
    _id: '67a930a367f23ae882eac0e9',
    user: {
      _id: '67322e49718e850d37d8fc31',
      name: 'Nizar Abdelhedi',
      email: 'nizar.abdelhedi93@gmail.com',
      role: 'admin',
    },
    dishes: [
      {
        dish: {
          _id: '66ed5f27210380f029de65e2',
          name: 'Penne Arrabbiata',
          image: '../images/arrabbiata.jpg',
          price: 11,
          id: '66ed5f27210380f029de65e2',
        },
        quantity: 1,
        price: 11,
        size: null,
        _id: '67a930a367f23ae882eac0ea',
        addedAccompaniments: [],
        id: '67a930a367f23ae882eac0ea',
      },
      {
        dish: {
          _id: '66ed63a4210380f029de65e9',
          name: 'Chicken Burger',
          image: '../images/chicken_burger.jpg',
          price: 9,
          id: '66ed63a4210380f029de65e9',
        },
        quantity: 2,
        price: 18,
        addedAccompaniments: [],
        size: null,
        _id: '67a930a367f23ae882eac0eb',
        id: '67a930a367f23ae882eac0eb',
      },
      {
        dish: {
          _id: '66e4e2bda66085d649fe6249',
          name: 'Pizza Margherita',
          image: '../images/margherita.jpg',
          price: 9,
          id: '66e4e2bda66085d649fe6249',
        },
        quantity: 1,
        price: 11.5,
        addedAccompaniments: [
          {
            quantity: 1,
            price: 1.5,
            _id: '6701828fb4aea5b9de6d7db8',
            id: '6701828fb4aea5b9de6d7db8',
          },
          {
            quantity: 1,
            price: 1,
            _id: '6701828fb4aea5b9de6d7db9',
            id: '6701828fb4aea5b9de6d7db9',
          },
        ],
        size: [
          {
            name: 'Meduim',
            price: 3,
            inputType: 'radio',
            _id: '678e9a3d1199bb9a71d6b2b9',
            id: '678e9a3d1199bb9a71d6b2b9',
          },
        ],
        _id: '67a930a367f23ae882eac0ec',
        id: '67a930a367f23ae882eac0ec',
      },
    ],
    totalPrice: 40.5,
    sequenceNumber: 100,
    status: 'inProgress',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    createdAt: '2025-02-09T22:48:03.904Z',
    sessionId: 'cs_test_b1uU9M40U1d3oF8xazQk57xDYFZmMGPeobiFZ5JHjN2P9LAw5sKBzwaarX',
    id: '67a930a367f23ae882eac0e9',
  },
  {
    _id: '67a936abed1b7424016d6106',
    user: {
      _id: '67322e49718e850d37d8fc31',
      name: 'Nizar Abdelhedi',
      email: 'nizar.abdelhedi93@gmail.com',
      role: 'admin',
    },
    dishes: [
      {
        dish: {
          _id: '66ed564b210380f029de65e1',
          name: 'Spaghetti Carbonara',
          image: '../images/carbonara.jpg',
          price: 10,
          id: '66ed564b210380f029de65e1',
        },
        quantity: 1,
        price: 10,
        size: null,
        _id: '67a936abed1b7424016d6107',
        addedAccompaniments: [],
        id: '67a936abed1b7424016d6107',
      },
      {
        dish: {
          _id: '66ed6353210380f029de65e8',
          name: 'Beef Burger',
          image: '../images/beef_burger.jpg',
          price: 8,
          id: '66ed6353210380f029de65e8',
        },
        quantity: 2,
        price: 16,
        addedAccompaniments: [],
        size: null,
        _id: '67a936abed1b7424016d6108',
        id: '67a936abed1b7424016d6108',
      },
      {
        dish: {
          _id: '66e4e2bda66085d649fe624b',
          name: 'Pizza BBQ Chicken',
          image: '../images/bbq_chicken.jpg',
          price: 13,
          id: '66e4e2bda66085d649fe624b',
        },
        quantity: 1,
        price: 20.5,
        addedAccompaniments: [],
        size: [
          {
            name: 'Large',
            price: 6,
            inputType: 'radio',
            _id: '678e99241199bb9a71d6b254',
            id: '678e99241199bb9a71d6b254',
          },
        ],
        _id: '67a936abed1b7424016d6109',
        id: '67a936abed1b7424016d6109',
      },
    ],
    totalPrice: 46.5,
    sequenceNumber: 100,
    status: 'cancelled',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    createdAt: '2025-02-09T23:13:47.252Z',
    sessionId: 'cs_test_b1eGbpFtAjgzjyy5XbZ6ZQctr3sHw7AhI5Cu0JZ7jBX0sjTkEbu194719H',
    id: '67a936abed1b7424016d6106',
  },
  {
    _id: '67a9c8d6921a8948059c790a',
    user: {
      _id: '67322e49718e850d37d8fc31',
      name: 'Nizar Abdelhedi',
      email: 'nizar.abdelhedi93@gmail.com',
      role: 'admin',
    },
    dishes: [
      {
        dish: {
          _id: '66ed5f27210380f029de65e2',
          name: 'Penne Arrabbiata',
          image: '../images/arrabbiata.jpg',
          price: 11,
          id: '66ed5f27210380f029de65e2',
        },
        quantity: 2,
        price: 22,
        addedAccompaniments: [],
        _id: '67a9c8d6921a8948059c790b',
        size: [],
        id: '67a9c8d6921a8948059c790b',
      },
      {
        dish: {
          _id: '66ed654a210380f029de65ec',
          name: 'Veggie Burger',
          image: '../images/veggie_burger.jpg',
          price: 9,
          id: '66ed654a210380f029de65ec',
        },
        quantity: 3,
        price: 27,
        addedAccompaniments: [],
        _id: '67a9c8d6921a8948059c790c',
        size: [],
        id: '67a9c8d6921a8948059c790c',
      },
      {
        dish: {
          _id: '66e4e2bda66085d649fe624d',
          name: 'Pizza Quattro Formaggi',
          image: '../images/quattro_formaggi.jpg',
          price: 12,
          id: '66e4e2bda66085d649fe624d',
        },
        quantity: 1,
        price: 13,
        addedAccompaniments: [
          {
            quantity: 1,
            price: 1,
            _id: '673e3e0a0fc20f53499e7a14',
            id: '673e3e0a0fc20f53499e7a14',
          },
        ],
        _id: '67a9c8d6921a8948059c790d',
        size: [],
        id: '67a9c8d6921a8948059c790d',
      },
    ],
    totalPrice: 62,
    sequenceNumber: 101,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    createdAt: '2025-02-10T09:37:26.133Z',
    sessionId: 'cs_test_b1Dl5T2pNS6ypPAURUtonSodowZxuYCTvhMVHGwbE2S29F0oFoF2OJbZmd',
    id: '67a9c8d6921a8948059c790a',
  },
];

const orders = [
  {
    id: 'ORD-005',
    customer: { name: 'Penjani Inyene', avatar: '/assets/avatar-4.png', email: 'penjani.inyene@domain.com' },
    lineItems: 1,
    paymentMethod: { type: 'visa', last4: '4011' },
    currency: 'USD',
    totalAmount: 56.7,
    status: 'pending',
    createdAt: dayjs().subtract(3, 'hour').toDate(),
  },
  {
    id: 'ORD-004',
    customer: { name: 'Jie Yan', avatar: '/assets/avatar-8.png', email: 'jie.yan@domain.com' },
    lineItems: 1,
    paymentMethod: { type: 'amex', last4: '5678' },
    currency: 'USD',
    totalAmount: 49.12,
    status: 'completed',
    createdAt: dayjs().subtract(6, 'hour').toDate(),
  },
  {
    id: 'ORD-003',
    customer: { name: 'Fran Perez', avatar: '/assets/avatar-5.png', email: 'fran.perez@domain.com' },
    lineItems: 2,
    paymentMethod: { type: 'applepay' },
    currency: 'USD',
    totalAmount: 18.75,
    status: 'canceled',
    createdAt: dayjs().subtract(7, 'hour').toDate(),
  },
  {
    id: 'ORD-002',
    customer: { name: 'Carson Darrin', avatar: '/assets/avatar-3.png', email: 'carson.darrin@domain.com' },
    lineItems: 1,
    paymentMethod: { type: 'googlepay' },
    currency: 'USD',
    totalAmount: 49.99,
    status: 'rejected',
    createdAt: dayjs().subtract(1, 'hour').subtract(1, 'day').toDate(),
  },
  {
    id: 'ORD-001',
    customer: { name: 'Miron Vitold', avatar: '/assets/avatar-1.png', email: 'miron.vitold@domain.com' },
    lineItems: 2,
    paymentMethod: { type: 'mastercard', last4: '4242' },
    currency: 'USD',
    totalAmount: 94.01,
    status: 'completed',
    createdAt: dayjs().subtract(3, 'hour').subtract(1, 'day').toDate(),
  },
];

export function Page() {
  const { customer, id, previewId, sortDir, status } = useExtractSearchParams();

  const sortedOrders = applySort(orders1, sortDir);
  const filteredOrders = applyFilters(sortedOrders, { customer, id, status });

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Orders</Typography>
            </Box>
          </Stack>
          <OrdersSelectionProvider orders={filteredOrders}>
            <Card>
              <OrdersFilters filters={{ customer, id, status }} sortDir={sortDir} />
              <Divider />
              <Box sx={{ overflowX: 'auto' }}>
                <OrdersTable rows={filteredOrders} />
              </Box>
              <Divider />
              <OrdersPagination count={filteredOrders.length} page={0} />
            </Card>
          </OrdersSelectionProvider>
        </Stack>
      </Box>
      <OrderModal open={Boolean(previewId)} />
    </React.Fragment>
  );
}

function useExtractSearchParams() {
  const [searchParams] = useSearchParams();

  return {
    customer: searchParams.get('customer') || undefined,
    id: searchParams.get('id') || undefined,
    previewId: searchParams.get('previewId') || undefined,
    sortDir: searchParams.get('sortDir') || undefined,
    status: searchParams.get('status') || undefined,
  };
}

// Sorting and filtering has to be done on the server.

function applySort(row, sortDir) {
  return row.sort((a, b) => {
    if (sortDir === 'asc') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function applyFilters(row, { customer, id, status }) {
  return row.filter((item) => {
    if (customer) {
      if (!item.customer?.name?.toLowerCase().includes(customer.toLowerCase())) {
        return false;
      }
    }

    if (id) {
      if (!item.id?.toLowerCase().includes(id.toLowerCase())) {
        return false;
      }
    }

    if (status) {
      if (item.status !== status) {
        return false;
      }
    }

    return true;
  });
}
