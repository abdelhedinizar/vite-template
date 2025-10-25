import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { useSelector } from 'react-redux';
import { makeSelectReviewsByDish } from '@/stores/slices/ReviewsSlice';
import { PostCard } from '../post-card';
import { CommentAdd } from '../comment-add';

// Simple empty modal placeholder similar style intent to OrderModal
export function DishCommentModal({ open, dish, onClose }) {
    // Read reviews from Redux store (live updates)
    const dishKey = dish?._id || dish?.id;
    const selectReviews = React.useMemo(() => makeSelectReviewsByDish(dishKey), [dishKey]);
    const reviews = useSelector(selectReviews);

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDialog-container': { justifyContent: 'flex-end' },
                '& .MuiDialog-paper': { height: '100%', width: '100%' },
            }}
        >
            <DialogTitle sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6">{dish?.name || 'Dish'}</Typography>
                    <IconButton onClick={onClose} size="small">
                        <XIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent
                dividers
                sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        p: 2,
                        pb: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        <Card>
                            {reviews.map((post) => (
                               <Stack key={post.id} divider={<Divider />}>
                                   <PostCard post={post} />
                               </Stack>
                            ))}
                        </Card>
                    </Typography>

                    {/*comments.map((c) => (
            <Card key={c.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Stack spacing={0.5}>
                <Typography variant="subtitle2">{c.author.name}</Typography>
                <Typography variant="body2">{c.content}</Typography>
              </Stack>
            </Card>
          ))
          
          comments.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
              Pas encore de commentaires.
            </Typography>
          )
          */
                    }

                </Box>
            </DialogContent>

            <DialogActions
                sx={{
                    px: 2,
                    py: 1.5,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper'
                }}
            >

                <CommentAdd dishId={dishKey} />
            </DialogActions>
        </Dialog>
    );
}
