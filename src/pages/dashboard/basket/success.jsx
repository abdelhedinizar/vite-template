import React, { useEffect, useState } from 'react';
import { clear } from '@/stores/slices/BasketSlice';
import { Backdrop, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Check } from '@phosphor-icons/react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { config } from '@/config';

export function Page() {
  const metadata = { title: `Create | Customers | Dashboard | ${config.site.name}` };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState('loading');
  const [order, setOrder] = useState();
  const sessionId = new URLSearchParams(location.search).get('session_id');

  const backToMenu = () => {
    dispatch(clear());
    navigate('/dashboard/home');
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/orders?sessionId=${sessionId}`);

      if (!response.data.data.orders || response.data.data.orders.length === 0) {
        setStatus('invalid');
        return;
      }
      if (response.data.data.orders[0].paymentStatus === 'paid') {
        setStatus('paid');
        setOrder(response.data.data.orders[0]);
      } else {
        setStatus('unpaid');
      }
    };
    fetchOrder();
  });
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
        {status === 'loading' && (
          <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        {status === 'paid' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Stack spacing={3} sx={{ alignItems: 'center' }}>
              <Typography variant="h2">Confirmation</Typography>
              <Check size={128} color="var(--mui-palette-primary-800)" weight="bold" />
              <Typography variant="h4">successful ! 🎉</Typography>
              <Typography variant="body1">Your order Number is #{order.sequenceNumber}</Typography>
              <Button
                sx={{
                  backgroundColor: 'var(--mui-palette-primary-700)',
                  color: 'white',
                  mx: 'auto',
                  boxShadow: '0px 4px 6px var(--mui-palette-primary-300)', // Subtle shadow
                  '&:hover': {
                    backgroundColor: 'var(--mui-palette-primary-800)', // Slightly darker shade on hover
                  },
                }}
                onClick={() => {
                  backToMenu();
                }}
              >
                Back to menu !
              </Button>
            </Stack>
          </Box>
        )}
        {status === 'invalid' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Typography variant="h1">Invalid order</Typography>
          </Box>
        )}
        {status === 'unpaid' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Typography variant="h1">Inpaid Order !</Typography>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}
