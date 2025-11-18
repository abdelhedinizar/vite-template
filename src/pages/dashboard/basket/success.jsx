import React, { useEffect, useState } from 'react';
import { clear } from '@/stores/slices/BasketSlice';
import { Backdrop, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Check, X } from '@phosphor-icons/react';
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
  const orderId = new URLSearchParams(location.search).get('order_id');
  const paymentMethod = new URLSearchParams(location.search).get('payment_method');

  const backToMenu = () => {
    // Clear both Redux basket and sessionStorage backup
    dispatch(clear());
    sessionStorage.removeItem('basketBackup');
    navigate('/dashboard/home');
  };

  useEffect(() => {
    const fetchOrder = async () => {
      let response;

      if (sessionId) {
        // Card payment - fetch by session ID
        response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/orders?sessionId=${sessionId}`);

        if (!response.data.data.orders || response.data.data.orders.length === 0) {
          setStatus('invalid');
          return;
        }

        if (response.data.data.orders[0].paymentStatus === 'paid') {
          setStatus('paid');
          setOrder(response.data.data.orders[0]);
          // Clear basket backup since payment was successful
          sessionStorage.removeItem('basketBackup');
          dispatch(clear());
        } else {
          setStatus('unpaid');
        }
      } else if (orderId && paymentMethod === 'cash') {
        // Cash payment - fetch by order ID
        try {
          response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/orders/${orderId}`);

          if (response.data.data.order) {
            setStatus('paid');
            setOrder(response.data.data.order);
            // Clear basket since order was placed successfully
            sessionStorage.removeItem('basketBackup');
            dispatch(clear());
          } else {
            setStatus('invalid');
          }
        } catch (error) {
          console.error('Error fetching cash order:', error);
          setStatus('invalid');
        }
      } else {
        setStatus('invalid');
      }
    };

    fetchOrder();
  }, [sessionId, orderId, paymentMethod]);
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
              <Typography variant="h4">
                {paymentMethod === 'cash' ? 'Commande enregistrée ! 🎉' : 'Paiement réussi ! 🎉'}
              </Typography>
              <Typography variant="body1">Votre numéro de commande est #{order.sequenceNumber}</Typography>
              {paymentMethod === 'cash' && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', maxWidth: '400px' }}>
                  Votre commande a été enregistrée. Vous pourrez payer en espèces lors de la livraison ou du retrait.
                </Typography>
              )}
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
                Retour au menu !
              </Button>
            </Stack>
          </Box>
        )}
        {status === 'invalid' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Stack spacing={3} sx={{ alignItems: 'center' }}>
              <Typography variant="h1">Commande invalide</Typography>
              <X size={128} color="var(--mui-palette-error-800)" weight="fill" />
              <Typography variant="h4">OOPS !</Typography>
              <Typography variant="body1">Quelque chose s'est mal passé.</Typography>
              <Button
                sx={{
                  backgroundColor: 'var(--mui-palette-error-700)',
                  color: 'white',
                  mx: 'auto',
                  boxShadow: '0px 4px 6px var(--mui-palette-error-300)', // Subtle shadow
                  '&:hover': {
                    backgroundColor: 'var(--mui-palette-error-800)', // Slightly darker shade on hover
                  },
                }}
                onClick={() => {
                  backToMenu();
                }}
              >
                Retour au menu !
              </Button>
            </Stack>
          </Box>
        )}
        {status === 'unpaid' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Stack spacing={3} sx={{ alignItems: 'center' }}>
              <Typography variant="h1">Commande non payée !</Typography>
              <Typography variant="body1">Le paiement n'a pas été effectué.</Typography>
              <Button
                sx={{
                  backgroundColor: 'var(--mui-palette-warning-700)',
                  color: 'white',
                  mx: 'auto',
                  boxShadow: '0px 4px 6px var(--mui-palette-warning-300)',
                  '&:hover': {
                    backgroundColor: 'var(--mui-palette-warning-800)',
                  },
                }}
                onClick={() => {
                  backToMenu();
                }}
              >
                Retour au menu !
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}
