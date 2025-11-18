import React from 'react';
import { Card, CardMedia, Divider, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Basket, Pepper } from '@phosphor-icons/react/dist/ssr';
import { Heart as HeartIcon } from '@phosphor-icons/react/dist/ssr/Heart';
import { ChatCircle as ChatCircleIcon } from '@phosphor-icons/react/dist/ssr/ChatCircle';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';
import { useDispatch } from 'react-redux';
import { toggleDishLike } from '@/stores/slices/DishSlice';
import { DishCommentModal } from '../desktop/dish-comment-modal';

export default function CategoryLayout({ category, handleOpenCreateBasket, reviewsByDish }) {
  const dispatch = useDispatch();
  const [commentDish, setCommentDish] = React.useState(null);

  const handleToggleLike = (dish) => {
    const dishId = dish._id || dish.id;
    dispatch(toggleDishLike({ dishId, like: !dish.isLikedByMe }));
  };

  const openComment = (dish) => setCommentDish(dish);
  const closeComment = () => setCommentDish(null);

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
                  {Array.from({ length: dish.SpiceLevel }).map((_, i) => (
                    <Pepper key={i} weight="fill" fill="var(--mui-palette-error-main)" size={18} />
                  ))}
                </Typography>
              </div>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', p: 1 }}>
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
                  <Tooltip title="Like">
                    <IconButton onClick={() => handleToggleLike(dish)}>
                      <HeartIcon fill="var(--mui-palette-error-main)" weight="light" />
                    </IconButton>
                  </Tooltip>
                )}
                <Typography color="text.secondary" variant="subtitle2">
                  {reviewsByDish[dish.id]?.reviews.length || 0}
                </Typography>
                <Tooltip title="Comment">
                  <IconButton onClick={() => openComment(dish)}>
                    <ChatCircleIcon fill="var(--mui-palette-error-main)" weight="light" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <Button
              startIcon={<Basket weight="fill" />}
              sx={{ fontSize: '0.775rem', fontWeight: 600 }}
              variant="contained"
              onClick={() => handleOpenCreateBasket(dish)}
            >
              Prendre
            </Button>
          </Stack>
        </Card>
      ))}
      <DishCommentModal open={!!commentDish} dish={commentDish} onClose={closeComment} />
    </Box>
  );
}
