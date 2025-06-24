import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Lightning as LightningIcon } from '@phosphor-icons/react/dist/ssr/Lightning';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

export function Included() {
  return (
    <Box
      sx={{
        bgcolor: 'var(--mui-palette-neutral-950)',
        color: 'var(--mui-palette-common-white)',
        overflow: 'hidden',
        py: '120px',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 0,
        }}
      >
        <Box component="img" src="/assets/home-cosmic.svg" sx={{ height: 'auto', width: '1600px' }} />
      </Box>
      <Stack spacing={8} sx={{ position: 'relative', zIndex: 1 }}>
        <Container maxWidth="md">
          <Stack spacing={2}>
            <Typography color="inherit" sx={{ textAlign: 'center' }} variant="h3">
              Tout ce qu’il faut pour digitaliser votre restaurant
            </Typography>
            <Typography color="neutral.300" sx={{ textAlign: 'center' }}>
              Une solution complète pour simplifier la prise de commande, améliorer le service et suivre vos performances.
            </Typography>
          </Stack>
        </Container>
        <Container maxWidth="lg">
          <Grid alignItems="center" container spacing={3}>
            <Grid
              size={{
                md: 4,
                xs: 12,
              }}
            >
              <Stack spacing={2}>
                <div>
                  <Chip color="success" icon={<LightningIcon />} label="Outils intelligents" variant="soft" />
                </div>
                <Typography color="inherit" variant="h3">
                  Dashboard intuitif
                </Typography>
                <Typography color="inherit">
                  Visualisez vos indicateurs clés : nombre de commandes, temps de préparation, plats populaires. 
                  Suivez la performance de votre restaurant en un coup d'œil.
                </Typography>
                <div>
                  <Button color="secondary" component={RouterLink} href={paths.dashboard.analytics} variant="contained">
                    Voir le dashboard
                  </Button>
                </div>
              </Stack>
            </Grid>
            <Grid
              size={{
                md: 8,
                xs: 12,
              }}
            >
              <Box sx={{ margin: '0 auto', maxWidth: '100%', position: 'relative', width: '390px' }}>
                <Box
                  sx={{
                    bgcolor: '#8057f4',
                    bottom: 0,
                    filter: 'blur(50px)',
                    height: '20px',
                    left: '15%',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    transform: 'rotate(-169deg)',
                    zIndex: 0,
                  }}
                />
                <Box
                  alt="Dashboard"
                  component="img"
                  src="/assets/home-widgets.png"
                  sx={{ height: 'auto', position: 'relative', width: '100%', zIndex: 1 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </Box>
  );
}
