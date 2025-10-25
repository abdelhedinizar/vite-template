import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import { Star as StarIcon } from '@phosphor-icons/react/dist/ssr/Star';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import { useUser } from '@/hooks/use-user';
import { useDispatch } from 'react-redux';
import { upsertReview, addLocalReview, replaceLocalReview, removeLocalReview } from '@/stores/slices/ReviewsSlice';

export function CommentAdd({ dishId, onCreated }) {
  const { user } = useUser();
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');
  const [rating, setRating] = React.useState(null);
  const [sending, setSending] = React.useState(false);
  const [ratingAnchor, setRatingAnchor] = React.useState(null);
  const [ratingError, setRatingError] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const [imageFile, setImageFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);

  const normalizedDishId = typeof dishId === 'string' ? dishId : dishId?._id || dishId?.id || dishId?.dishId || '';

  const canSend = text.trim().length > 0 && !!normalizedDishId && !sending && !!rating;

  const handleSend = async () => {
    if (!rating) {
      setRatingError(true);
      return;
    }
    if (!canSend) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticReview = {
      dish: normalizedDishId,
      user: { name: user?.name, photo: user?.avatar },
      comment: text.trim(),
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      media: imagePreview,
      rating,
      likes: 0
    };

    try {
      setSending(true);
      
      // Optimistic insert
      dispatch(addLocalReview({ dishId: normalizedDishId, tempId, review: optimisticReview }));

      // Call server
      const action = await dispatch(
        upsertReview({ 
          dishId: normalizedDishId, 
          rating, 
          comment: text.trim(), 
          media: imagePreview 
        })
      );

      if (upsertReview.fulfilled.match(action)) {
        // Replace temp with real review
        dispatch(replaceLocalReview({ 
          dishId: normalizedDishId, 
          tempId, 
          realReview: action.payload.review 
        }));
        if (onCreated) onCreated(action.payload.review);
      } else {
        // Remove temp on failure
        dispatch(removeLocalReview({ dishId: normalizedDishId, tempId }));
        console.error('Review create failed:', action.payload || action.error);
      }

      // Reset form
      setText('');
      setRatingError(false);
      setRating(null);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImageFile(null);
      setImagePreview(null);
    } catch (e) {
      dispatch(removeLocalReview({ dishId: normalizedDishId, tempId }));
      console.error('Failed to create review', e);
    } finally {
      setSending(false);
    }
  };

  const openRating = (e) => {
    setRatingAnchor(e.currentTarget);
  };
  const closeRating = () => setRatingAnchor(null);
  const ratingPopoverOpen = Boolean(ratingAnchor);

  const handlePickImage = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const clearImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
      <Stack direction="row" spacing={2}>
        <Avatar src={user?.avatar} />
        <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
          <OutlinedInput
            multiline
            placeholder="Votre commentaire..."
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: ratingError && !rating ? 'var(--mui-palette-error-main)' : undefined,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: ratingError && !rating ? 'var(--mui-palette-error-main)' : undefined,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: ratingError && !rating ? 'var(--mui-palette-error-main)' : undefined,
              },
            }}
          />
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Tooltip title={imageFile ? 'Changer l’image' : 'Ajouter une image'}>
                <IconButton
                  onClick={handlePickImage}
                  sx={{
                    display: { xs: 'none', sm: 'inline-flex' },
                    color: imageFile ? 'var(--mui-palette-primary-main)' : 'inherit'
                  }}
                >
                  <ImageIcon />
                </IconButton>
              </Tooltip>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />

              {imagePreview && (
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="preview"
                    sx={{
                      width: 32,
                      height: 32,
                      objectFit: 'cover',
                      borderRadius: 1,
                      border: '1px solid var(--mui-palette-divider)'
                    }}
                  />
                  <Button size="small" color="error" variant="outlined" onClick={clearImage}>
                    Retirer
                  </Button>
                </Stack>
              )}
              <IconButton
                onClick={openRating}
                sx={{
                  color:
                    ratingError && !rating
                      ? 'var(--mui-palette-error-main)'
                      : rating
                        ? 'var(--mui-palette-warning-main)'
                        : 'text.disabled',
                  p: 0.75,
                }}
              >
                <StarIcon weight="fill" />
              </IconButton>


              <Typography
                variant="caption"
                color={
                  ratingError && !rating
                    ? 'var(--mui-palette-error-main)'
                    : 'text.secondary'
                }
              >
                {rating
                  ? `${rating} / 5`
                  : ratingError
                    ? 'tu as oublié de noté'
                    : 'Pas encore noté'}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              disabled={!canSend}
              onClick={handleSend}
            >
              {sending ? '...' : 'Envoyer'}
            </Button>
          </Stack>
        </Stack>
      </Stack>



      {/* Small anchored popover for rating */}
      <Popover
        open={ratingPopoverOpen}
        anchorEl={ratingAnchor}
        onClose={closeRating}
        disableAutoFocus
        disableEnforceFocus
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        PaperProps={{
          sx: {
            px: 1,
            py: 0.5,
            borderRadius: 2,
            display: 'flex',
            gap: 0.25,
            alignItems: 'center',
            boxShadow: 'var(--mui-shadows-8)',
            background: 'var(--mui-palette-background-paper)'
          }
        }}
      >
        {[1, 2, 3, 4, 5].map(v => (
          <IconButton
            key={v}
            size="small"
            onClick={() => {
              setRating(v);
              setRatingError(false);
              closeRating();
            }}
            sx={{
              color: v <= rating ? 'var(--mui-palette-warning-main)' : 'text.disabled',
              '&:hover': { color: 'var(--mui-palette-warning-main)' },
              p: 0.5
            }}
          >
            <StarIcon weight={v <= rating ? 'fill' : 'regular'} size={22} />
          </IconButton>
        ))}
      </Popover>
    </Stack>
  );
}