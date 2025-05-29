'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useColorScheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

export function Hero() {
  const { colorScheme } = useColorScheme();

  const [img, setImg] = React.useState('/assets/home-hero-light.png');

  React.useEffect(() => {
    setImg(colorScheme === 'dark' ? '/assets/home-hero-dark.png' : '/assets/home-hero-light.png');
  }, [colorScheme]);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: 'var(--mui-palette-common-white)',
        backgroundImage: `
      linear-gradient(
        rgba(130, 0, 11, 0.61), 
        rgba(13, 0, 130, 0.85)
      ),
      url('/assets/restaurant-image.jpg')
    `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 0,
        }}
      >
        <Box component="img" src="/assets/home-cosmic.svg" sx={{ height: 'auto', width: '1600px' }} />
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 1,
        }}
      >
        <Box component="img" src="/assets/home-rectangles.svg" sx={{ height: 'auto', width: '1900px' }} />
      </Box>
      <Container maxWidth="md" sx={{ position: 'relative', py: '120px', zIndex: 3 }}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: '3.5rem', fontWeight: 600, lineHeight: 1.2, textAlign: 'center' }}>
              Focalisez-vous sur le goût,{' '}
              <Typography color="primary.main" component="span" variant="inherit">
                on s’occupe
              </Typography>{' '}
              du reste.
            </Typography>
            <Typography color="neutral.50" sx={{ fontWeight: 400, textAlign: 'center' }} variant="h5">
              Offrez à vos clients une nouvelle façon de commander, et à vous, restaurateur, une façon plus intelligente
              de gérer votre service. Notre plateforme vous accompagne dans la digitalisation de votre restaurant, sans
              prise de tête.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
            <Button component={RouterLink} href={paths.dashboard.home} variant="contained">
              🔍 Voir la solution
            </Button>
            <Button
              component={RouterLink}
              href={paths.components.index}
              sx={{
                color: 'var(--mui-palette-common-white)',
                '&:hover': { bgcolor: 'var(--mui-palette-action-hover)' },
              }}
            >
              📞 Contactez-nous
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center ' }}>
            <AvatarGroup sx={{ '& .MuiAvatar-root': { border: '2px solid var(--mui-palette-neutral-950)' } }}>
              <Avatar alt="User 5" src="/assets/avatar-5.png" />
              <Avatar alt="User 1" src="/assets/avatar-1.png" />
              <Avatar alt="User 2" src="/assets/avatar-2.png" />
            </AvatarGroup>
            <Typography color="neutral.300" sx={{ whiteSpace: 'nowrap' }} variant="caption">
              <Typography color="inherit" component="span" sx={{ fontWeight: 700 }} variant="inherit">
                4.7/5
              </Typography>{' '}
              based on (100+ reviews)
            </Typography>
          </Stack>
        </Stack>
      </Container>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ bottom: 0, left: 0, position: 'absolute', px: '24px', right: 0, top: 0, zIndex: 0 }}>
          <Box
            sx={{ bgcolor: 'var(--mui-palette-neutral-950)', borderRadius: '28px', height: '100%', width: '100%' }}
          />
        </Box>
        <Box
          sx={{
            bgcolor: '#8057f4',
            filter: 'blur(50px)',
            height: '30px',
            left: '50%',
            position: 'absolute',
            top: 0,
            transform: 'translateX(-50%)',
            width: '80%',
            zIndex: 1,
          }}
        />
        <Box
          component="img"
          src={img}
          sx={{ display: 'block', height: 'auto', position: 'relative', width: '100%', zIndex: 2 }}
        />
      </Container>
    </Box>
  );
}
