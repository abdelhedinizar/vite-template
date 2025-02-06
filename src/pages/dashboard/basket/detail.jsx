import * as React from 'react';
import { Box, Card, CardContent, Link, Stack, Typography } from '@mui/material';
import { ArrowLeftIcon } from '@mui/x-date-pickers';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

const metadata = { title: `Create | Customers | Dashboard | ${config.site.name}` };

export function Page() {
  const { items } = useSelector((state) => state.basket);
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
                        <Stack direction="row" spacing={3}>
                          <Typography variant="h5">$ {item.price}</Typography>
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
    </React.Fragment>
  );
}
