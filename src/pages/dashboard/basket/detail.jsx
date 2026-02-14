import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { ArrowLeftIcon } from '@mui/x-date-pickers';
import { CreditCard, Money, Trash } from '@phosphor-icons/react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { config } from '@/config';
import { paths } from '@/paths';
import { AuthStrategy } from '@/lib/auth/strategy';
import { useUser } from '@/hooks/use-user';
import { RouterLink } from '@/components/core/link';
import { addToBasket, removeAtIndex } from '@/stores/slices/BasketSlice';

const metadata = { title: `Create | Customers | Dashboard | ${config.site.name}` };

export function Page() {
  const { items } = useSelector((state) => state.basket);
  const table = useSelector((state) => state.table);
  const dispatch = useDispatch();
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  const { user, checkSession } = useUser();
  const navigate = useNavigate();
  const [guestDialogOpen, setGuestDialogOpen] = React.useState(false);
  const [pendingPaymentMethod, setPendingPaymentMethod] = React.useState(null);
  const [isGuestMode, setIsGuestMode] = React.useState(false);

  // Restore basket from backup if empty and backup exists
  React.useEffect(() => {
    if (items.length === 0) {
      const basketBackup = sessionStorage.getItem('basketBackup');
      if (basketBackup) {
        try {
          const backupItems = JSON.parse(basketBackup);
          backupItems.forEach(item => {
            dispatch(addToBasket(item));
          });
          // Clear backup after restoring
          sessionStorage.removeItem('basketBackup');
        } catch (error) {
          console.error('Error restoring basket backup:', error);
        }
      }
    }
  }, [items.length, dispatch]);

  React.useEffect(() => {
    const guestMode = localStorage.getItem('guest-mode') === 'true';
    setIsGuestMode(guestMode);
  }, [user]);

  const getSignInPath = () => {
    switch (config.auth.strategy) {
      case AuthStrategy.CUSTOM:
        return paths.auth.custom.signIn;
      case AuthStrategy.AUTH0:
        return paths.auth.auth0.signIn;
      case AuthStrategy.COGNITO:
        return paths.auth.cognito.signIn;
      case AuthStrategy.FIREBASE:
        return paths.auth.firebase.signIn;
      case AuthStrategy.SUPABASE:
        return paths.auth.supabase.signIn;
      default:
        return paths.auth.custom.signIn;
    }
  };

  const onOrder = async (paymentMethod = 'card') => {
    // Save basket to sessionStorage as backup before going to Stripe (only for card payments)
    if (paymentMethod === 'card') {
      sessionStorage.setItem('basketBackup', JSON.stringify(items));
    }

    const body = {
      user: user?._id,
      table: table?.id || table?.name || null,
      tableName: table?.name || null,
      dishes: items.map((item) => {
        return {
          dish: item.dish._id,
          quantity: item.quantity,
          price: item.price,
          addedAccompaniments: item.addedAccompaniments,
          size: item.size,
        };
      }),
      paymentMethod,
      totalPrice,
    };

    const orderResponse = await axios.post(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/orders`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (paymentMethod === 'card') {
      // Redirect to Stripe for card payment
      const createSessionResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACK_API_URL}/bookings/checkout-seesion/${orderResponse.data.data.order.id}`
      );
      window.location.href = createSessionResponse.data.session.url;
    } else {
      // For cash payment, redirect to success page directly
      window.location.href = `/dashboard/basket/success?order_id=${orderResponse.data.data.order.id}&payment_method=cash`;
    }
  };

  const handlePayClick = (paymentMethod) => {
    if (isGuestMode) {
      setPendingPaymentMethod(paymentMethod);
      setGuestDialogOpen(true);
      return;
    }

    onOrder(paymentMethod);
  };

  const handleGuestContinue = () => {
    setGuestDialogOpen(false);
    if (pendingPaymentMethod) {
      onOrder(pendingPaymentMethod);
      setPendingPaymentMethod(null);
    }
  };

  const handleGuestLogin = async () => {
    setGuestDialogOpen(false);
    localStorage.removeItem('guest-mode');
    localStorage.removeItem('guest-user');
    localStorage.removeItem('custom-auth-token');
    sessionStorage.setItem('post-login-redirect', `${window.location.pathname}${window.location.search}`);
    if (checkSession) {
      await checkSession();
    }
    navigate(getSignInPath());
  };
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
        <Stack spacing={4} sx={{ paddingBottom: { xs: '220px', sm: '180px' } }}>
          <Stack spacing={3}>
            <div>
              <Link
                component={RouterLink}
                href={paths.dashboard.home}
                sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                variant="subtitle2"
              >
                <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                menu
              </Link>
            </div>
            <div>
              <Typography variant="h4">Your Order</Typography>
            </div>
          </Stack>
          <Stack spacing={3}>
            {items.map((item, index) => {
              let dishImage = item.dish.image;
              if (dishImage.startsWith('../')) {
                dishImage = dishImage.replace('..', '');
              }

              return (
                <Card
                  key={item.dish.id}
                  sx={{
                    borderRadius: 3,
                    border: '1px solid var(--mui-palette-divider)',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 30px !important;',
                    overflow: 'hidden',
                    height: { xs: 'auto', sm: 160 },
                  }}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={0}
                    alignItems={{ xs: 'stretch', sm: 'stretch' }}
                    sx={{ height: '100%' }}
                  >
                    <Box
                      component="img"
                      src={dishImage}
                      sx={{
                        width: { xs: '100%', sm: 200 },
                        height: { xs: 160, sm: '100%' },
                        objectFit: 'cover',
                      }}
                    />
                    <Stack spacing={1} sx={{ flex: 1, p: { xs: 2, sm: 2.5 } }}>
                      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6">{item.dish.name}</Typography>
                        <IconButton
                          aria-label="Supprimer le plat"
                          onClick={() => {
                            dispatch(removeAtIndex(index));
                          }}
                          size="small"
                          sx={{
                            color: 'var(--mui-palette-error-main)',
                            bgcolor: 'rgba(0,0,0,0.04)',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.08)' },
                          }}
                        >
                          <Trash size={18} />
                        </IconButton>
                      </Stack>
                      <Typography color="text.secondary" variant="body2">
                        {item.dish.ingredients}
                      </Typography>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1.5, sm: 2 }}
                        sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {item.price} $
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            backgroundColor: 'var(--mui-palette-primary-700)',
                            color: 'white',
                            borderRadius: 999,
                            px: 0.5,
                            py: 0.25,
                            boxShadow: '0px 6px 14px rgba(25, 118, 210, 0.25)',
                          }}
                        >
                          <Button sx={{ color: 'white', minWidth: 36, px: 0 }}>-</Button>
                          <Typography variant="body1" sx={{ alignContent: 'center', px: 0.5 }}>
                            {item.quantity}
                          </Typography>
                          <Button sx={{ color: 'white', minWidth: 36, px: 0 }}>+</Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: { xs: 0, lg: 'var(--SideNav-width)' },
          right: 0,
          width: { xs: '100%', lg: 'calc(100% - var(--SideNav-width))' },
          zIndex: 'var(--mui-zIndex-appBar)',
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            maxWidth: 'var(--Content-maxWidth)',
            m: '0 auto',
            px: 'var(--Content-paddingX)',
            pb: { xs: 2, sm: 3 },
            width: '100%',
            boxSizing: 'border-box',
            pointerEvents: 'auto',
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.12)',
            }}
          >
            <CardContent sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 2.5 } }}>
              <Stack
                spacing={2}
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between' }}
              >
                <Stack spacing={0.5}>
                  <Typography color="text.secondary" variant="body2">
                    Total
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {totalPrice} $
                  </Typography>
                </Stack>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  sx={{ alignItems: 'stretch' }}
                >
                  <Button
                    startIcon={<Money size={20} />}
                    onClick={() => handlePayClick('cash')}
                    variant="outlined"
                    sx={{
                      borderColor: 'var(--mui-palette-secondary-700)',
                      color: 'var(--mui-palette-secondary-700)',
                      '&:hover': {
                        borderColor: 'var(--mui-palette-secondary-800)',
                        bgcolor: 'rgba(0,0,0,0.04)',
                      },
                    }}
                  >
                    Payer en espèces
                  </Button>
                  <Button
                    startIcon={<CreditCard size={20} />}
                    onClick={() => handlePayClick('card')}
                    variant="contained"
                    sx={{
                      backgroundColor: 'var(--mui-palette-primary-700)',
                      boxShadow: '0px 4px 6px var(--mui-palette-primary-300)',
                      '&:hover': {
                        backgroundColor: 'var(--mui-palette-primary-800)',
                      },
                    }}
                  >
                    Payer par carte
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Dialog open={guestDialogOpen} onClose={() => setGuestDialogOpen(false)}>
        <DialogTitle>Continuer en tant qu&apos;invité ?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Vous êtes en mode invité. Voulez-vous continuer en tant qu&apos;invité ou vous connecter ?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleGuestLogin} variant="outlined">
            Se connecter
          </Button>
          <Button onClick={handleGuestContinue} variant="contained">
            Rester invité
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
