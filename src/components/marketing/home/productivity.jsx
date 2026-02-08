'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { useColorScheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { CodeBlock as CodeBlockIcon } from '@phosphor-icons/react/dist/ssr/CodeBlock';
import { DiamondsFour as DiamondsFourIcon } from '@phosphor-icons/react/dist/ssr/DiamondsFour';
import { Palette as PaletteIcon } from '@phosphor-icons/react/dist/ssr/Palette';
import { Robot as RobotIcon } from '@phosphor-icons/react/dist/ssr/Robot';

import { NoSsr } from '@/components/core/no-ssr';

export function Productivity() {
  const { colorScheme } = useColorScheme();

  return (
    <div>
      <Container maxWidth="lg" sx={{ py: '120px' }}>
        <Stack spacing={8}>
          <Stack maxWidth="700px" spacing={2} sx={{ mx: 'auto' }}>
            <Typography sx={{ textAlign: 'center' }} variant="h3">
              Augmentez votre productivité et comprenez vos clients
            </Typography>
            <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
              Avec Servy, vous savez quels plats vos clients préfèrent, vous gardez une vue d'ensemble sur votre
              restaurant, et vous gagnez du temps au quotidien. L'essentiel, sans le superflu.
            </Typography>
          </Stack>
          <Grid container spacing={3}>
            <Grid
              size={{
                md: 8,
                xs: 12,
              }}
            >
              <Box
                sx={{
                  bgcolor: 'var(--mui-palette-background-level1)',
                  border: '1px solid var(--mui-palette-divider)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
              >
                <Stack spacing={2} sx={{ p: 4 }}>
                  <div>
                    <Chip color="primary" icon={<CodeBlockIcon />} label="La qualité avant tout" variant="soft" />
                  </div>
                  <Typography variant="h5">Développé par des experts</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Chez Servy, nous choisissons les meilleures technologies pour booster vos ventes et simplifier votre
                    quotidien. Notre équipe est là pour vous accompagner et faire de Servy un vrai moteur de réussite
                    pour votre restaurant.
                  </Typography>
                </Stack>
                <Box sx={{ height: '300px', position: 'relative' }}>
                  <NoSsr>
                    <Box
                      component="img"
                      src={
                        colorScheme === 'dark' ? '/assets/home-feature-1-dark.png' : '/assets/home-feature-1-light.png'
                      }
                      sx={{ bottom: 0, height: '100%', position: 'absolute', left: 0, width: 'auto' }}
                    />
                  </NoSsr>
                </Box>
              </Box>
            </Grid>
            <Grid
              size={{
                md: 4,
                xs: 12,
              }}
            >
              <Box
                sx={{
                  bgcolor: 'var(--mui-palette-background-level1)',
                  border: '1px solid var(--mui-palette-divider)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
              >
                <Stack spacing={2} sx={{ p: 4 }}>
                  <div>
                    <Chip color="primary" icon={<PaletteIcon />} label="Design Pro" variant="soft" />
                  </div>
                  <Typography variant="h5">Simple. Beau. Intuitif.</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Servy, c’est une interface claire et fluide aussi sympa qu’un vrai serveur. Pas de prise de tête,
                    juste ce qu’il faut pour bosser vite et bien.
                  </Typography>
                </Stack>
                <Box sx={{ height: '300px', position: 'relative' }}>
                  <NoSsr>
                    <Box
                      component="img"
                      src={
                        colorScheme === 'dark' ? '/assets/home-feature-2-dark.png' : '/assets/home-feature-2-light.png'
                      }
                      sx={{ bottom: 0, height: '100%', top: '4px', left: 0, position: 'absolute', width: 'auto' }}
                    />
                  </NoSsr>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={12}>
              <Grid
                container
                spacing={0}
                sx={{
                  bgcolor: 'var(--mui-palette-background-level1)',
                  border: '1px solid var(--mui-palette-divider)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Stack spacing={2} sx={{ p: 4, flex: 1 }}>
                  <div>
                    <Chip color="primary" icon={<RobotIcon />} label="Assistance AI" variant="soft" />
                  </div>
                  <Typography variant="h5">Un assistant qui connaît vos plats par cœur</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Grâce à notre bot intégré, vos clients reçoivent des recommandations de plats, posent leurs
                    questions et passent commande en toute simplicité. Un vrai assistant digital, rapide, efficace et
                    toujours de bonne humeur — même en plein coup de feu.
                  </Typography>
                </Stack>
                <Box
                  component="img"
                  src="assets/chat.png"
                  alt="Interface de chat"
                  sx={{
                    width: { md: '50%' },
                    height: '100%',
                    objectFit: 'cover',
                    borderTopRightRadius: { md: '20px' },
                    borderBottomRightRadius: { md: '20px' },
                    borderTopLeftRadius: { xs: '0', md: 0 },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}
