import React from 'react';
import { Card, CardMedia, Divider, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Basket, Pepper } from '@phosphor-icons/react/dist/ssr';
import { Heart as HeartIcon } from '@phosphor-icons/react/dist/ssr/Heart';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';

export default function CategoryLayout({ category, handleOpenCreateBasket }) {
  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 2,
        p: 2,
      }}
    >
      {category?.dishes?.map((dish) => (
        <Card
          key={dish.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '0 0 auto',
            width: 240,
            height: '100%',
            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 30px !important;',
          }}
        >
          <CardMedia image={dish.image} sx={{ bgcolor: 'var(--mui-palette-background-level2)', height: '160px' }} />
          <Stack spacing={1} sx={{ flex: '1 1 auto', p: 2 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <div>
                <Link color="text.primary" variant="h6">
                  {dish.name}
                </Link>
              </div>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {dish.ingredients}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Typography variant="subtitle1">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(dish.price)}
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle2">
                  {dish.PreparationTime} <TimerIcon size={16} />
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle2">
                  <Pepper weight="fill" fill="var(--mui-palette-error-main)" size={18} />
                  <Pepper weight="fill" fill="var(--mui-palette-error-main)" size={18} />
                  <Pepper weight="fill" fill="var(--mui-palette-error-main)" size={18} />
                </Typography>
              </div>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', p: 2 }}>
            <Stack direction="row" spacing={2} sx={{ flex: '1 1 auto' }}>
              <Stack direction="row" sx={{ alignItems: 'center' }}>
                <Tooltip title="Unlike">
                  <IconButton>
                    <HeartIcon fill="var(--mui-palette-error-main)" weight="fill" />
                  </IconButton>
                </Tooltip>
                <Typography color="text.secondary" variant="subtitle2">
                  18
                </Typography>
              </Stack>
            </Stack>
            <Button
              startIcon={<Basket weight="fill" />}
              variant="contained"
              onClick={() => handleOpenCreateBasket(dish)}
            >
              Order now!
            </Button>
          </Stack>
        </Card> 
      ))}
    </Box>
  );
}
