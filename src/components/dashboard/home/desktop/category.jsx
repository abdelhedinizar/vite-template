import React from 'react';
import { Card, CardMedia, Divider, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Basket, Pepper } from '@phosphor-icons/react/dist/ssr';
import { Heart as HeartIcon } from '@phosphor-icons/react/dist/ssr/Heart';
import { ChatCircle as ChatCircleIcon } from '@phosphor-icons/react/dist/ssr/ChatCircle';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';
import { useDispatch } from 'react-redux';
import { toggleDishLike } from '@/stores/slices/DishSlice';

export default function CategoryLayout2({ category, handleOpenCreateBasket }) {
  const dispatch = useDispatch();

  const handleToggleLike = (dish) => {
    const dishId = dish._id || dish.id;
    dispatch(toggleDishLike({ dishId, like: !dish.isLikedByMe }));
  };

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Grid container spacing={3}>
        {category?.dishes?.map((dish) => (
          <Grid
            key={dish.id}
            size={{
              md: 4,
              sm: 6,
              xs: 12,
            }}
          >
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia image={dish.image} sx={{ bgcolor: 'var(--mui-palette-background-level2)', height: '220px' }} />
              <Stack spacing={2} sx={{ flex: '1 1 auto', p: 2 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <div>
                    <Link color="text.primary" variant="h5">
                      {dish.name}
                    </Link>
                  </div>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  {dish.ingredients}
                </Typography>
                <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <Typography variant="subtitle2">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(dish.price)}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Price
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">
                      {dish.PreparationTime} <TimerIcon size={16} />
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Preparation Time
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">
                      {Array.from({ length: dish.SpiceLevel }).map((_, i) => (
                        <Pepper key={i} weight="fill" fill="var(--mui-palette-error-main)" size={22} />
                      ))}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Spice Level
                    </Typography>
                  </div>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', p: 2 }}>
                <Stack direction="row" spacing={2} sx={{ flex: '1 1 auto' }}>
                  <Stack direction="row" sx={{ alignItems: 'center' }}>
                    <Typography color="text.secondary" variant="subtitle2">
                      {dish.likesCount}
                    </Typography>
                    {dish.isLikedByMe ? (
                      <Tooltip title="Unlike">
                        <IconButton onClick={() => handleToggleLike(dish)}>
                          <HeartIcon fill="var(--mui-palette-error-main)" weight="fill" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="like">
                        <IconButton onClick={() => handleToggleLike(dish)}>
                          <HeartIcon fill="var(--mui-palette-error-main)" weight="light" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Typography color="text.secondary" variant="subtitle2">
                      {dish.likesCount}
                    </Typography>
                    <Tooltip title="Comment">
                      <IconButton>
                        <ChatCircleIcon fill="var(--mui-palette-error-main)" weight="light" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
                <Button
                  startIcon={<Basket weight="fill" />}
                  variant="contained"
                  onClick={() => handleOpenCreateBasket(dish)}
                >
                  Order now !
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
