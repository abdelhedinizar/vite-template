import * as React from 'react';
import { Box, Button, Card, CardContent, Link, Stack, Typography } from '@mui/material';
import { ArrowLeftIcon } from '@mui/x-date-pickers';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { config } from '@/config';
import { paths } from '@/paths';
import { useUser } from '@/hooks/use-user';
import { RouterLink } from '@/components/core/link';

const metadata = { title: `Create | Customers | Dashboard | ${config.site.name}` };

export function Page() {
  const { items } = useSelector((state) => state.basket);
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  const { user } = useUser();
  const onOrder = async () => {
    const body = {
      user: user?._id,
      dishes: items.map((item) => {
        return {
          dish: item.dish._id,
          quantity: item.quantity,
          price: item.price,
          addedAccompaniments: item.addedAccompaniments,
          size: item.size,
        };
      }),
      paymentMethod: 'card',
      totalPrice,
    };
    const orderResponse = await axios.post(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/orders`, body, {
      headers: {
        'Content-Type': 'application/json', // Set the content type
        // Add any other headers if needed (e.g., authorization token)
      },
    });
    const createSessionResponse = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACK_API_URL}/bookings/checkout-seesion/${orderResponse.data.data.order.id}`
    );
    window.location.href = createSessionResponse.data.session.url;
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
        <Stack spacing={4} sx={{ paddingBottom: '100px' }}>
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
            {items.map((item) => {
              let dishImage = item.dish.image;
              if (dishImage.startsWith('../')) {
                dishImage = dishImage.replace('..', '');
              }

              return (
                <Card
                  key={item.dish.id}
                  sx={{
                    borderRadius: 2,
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 30px !important;',
                  }}
                >
                  <CardContent sx={{ p: 0, pb: '0 !important' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        component="img"
                        src={dishImage}
                        sx={{
                          width: 130,
                          height: 130,
                          borderRadius: 2,
                          objectFit: 'cover',
                        }}
                      />
                      <Stack spacing={0.5}>
                        <Typography variant="h6">{item.dish.name}</Typography>
                        <Typography variant="body2">{item.dish.ingredients}</Typography>
                        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
                          <Typography variant="h6">{item.price} $</Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              backgroundColor: 'var(--mui-palette-primary-700)',
                              color: 'white',
                              borderRadius: 2,
                              boxShadow: '0px 4px 6px var(--mui-palette-primary-300)',
                              '&:hover': {
                                backgroundColor: 'var(--mui-palette-primary-800)',
                              },
                            }}
                          >
                            <Button sx={{ color: 'white', width: '30px' }}>-</Button>
                            <Typography variant="body1" sx={{ alignContent: 'center' }}>
                              {item.quantity}
                            </Typography>
                            <Button sx={{ color: 'white', width: '30px' }}>+</Button>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          maxWidth: 'var(--Content-maxWidth)',
          bottom: 0,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px; !important;',
          width: 'var(--Content-width)',
        }}
      >
        <Card
          sx={{
            borderRadius: 0,
            overflow: 'hidden',
          }}
        >
          <CardContent
            sx={{
              px: '20px !important',
              pt: '20px !important',
              pb: '20px !important',
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">Total : {totalPrice} $</Typography>
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
                  onOrder();
                }}
              >
                Order now !
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
}
