import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Heart as HeartIcon } from '@phosphor-icons/react/dist/ssr/Heart';
import { ShareNetwork as ShareNetworkIcon } from '@phosphor-icons/react/dist/ssr/ShareNetwork';
import { Star as StarIcon } from '@phosphor-icons/react/dist/ssr/Star';

import { dayjs } from '@/lib/dayjs';


export function PostCard({ post }) {
  const comments = post.comments ?? [];

  return (
    <Stack spacing={2} sx={{ p: 3 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        {/* Left side: avatar + user info */}
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar
            src={post.user.photo === 'Default.jpg' ? '/assets/avatar-10.png' : post.user.photo}
            sx={{ cursor: 'pointer' }}
          />
          <div>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <Link color="text.primary" variant="subtitle2">
                {post.user.name}
              </Link>
              <Typography variant="body2">a laissé un avis</Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <ClockIcon />
              <Typography color="text.secondary" variant="caption">
                {dayjs(post.createdAt).fromNow()}
              </Typography>
            </Stack>
          </div>
        </Stack>

        {/* Right side: stars */}
        <Stack direction="row" spacing={0.5} sx={{ color: 'var(--mui-palette-warning-main)' }}>
          {[...Array(Math.floor(post.rating))].map((_, i) => (
            <StarIcon key={i} weight="fill" size={22} />
          ))}
        </Stack>
      </Stack>

      {post.comment ? <Typography>{post.comment}</Typography> : null}
      {post.media ? (
        <div>
          <CardActionArea>
            <CardMedia image={post.media} sx={{ backgroundPosition: 'center', height: '400px' }} />
          </CardActionArea>
        </div>
      ) : null}
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          {post.isLiked ? (
            <Tooltip title="Unlike">
              <IconButton color="error">
                <HeartIcon weight="fill" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Like">
              <IconButton color="error">
                <HeartIcon />
              </IconButton>
            </Tooltip>
          )}
          <Typography color="text.secondary" variant="subtitle2">
            {post.likes}
          </Typography>
        </Stack>
      </Stack>
      { /*
      <Stack divider={<Divider />} spacing={3}>
      
        <Stack spacing={3}>
          {comments.map((comment) => (
            <CommentBox comment={comment} key={comment.id} />
          ))}
        </Stack>
        <CommentAdd />
      </Stack>
        */}
    </Stack>
  );
}
