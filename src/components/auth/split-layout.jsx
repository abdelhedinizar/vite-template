import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function SplitLayout({ children }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 800px' }, minHeight: '100%' }}>
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'var(--mui-palette-background-level1)',
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          p: 3,
        }}
      >
        <Stack spacing={4} sx={{ maxWidth: '700px' }}>
          <Stack spacing={1}>
            <Typography variant="h4">Bienvenue chez Servy</Typography>
            <Typography color="text.secondary">
              Votre compagnon intelligent pour la restauration qui rend la commande plus simple et plus rapide. Obtenez des recommandations personnalisées, discutez avec notre assistant intelligent et profitez d'une expérience culinaire exceptionnelle.
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={4}
            sx={{ alignItems: 'center', color: 'var(--mui-palette-neutral-500)', flexWrap: 'wrap' }}
          >
            {/* AI Assistant */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 3.5C14.1 3.1 13.1 3.1 12.2 3.5L6 7V9C6 10.1 6.9 11 8 11S10 10.1 10 9V8L12 9L14 8V9C14 10.1 14.9 11 16 11S18 10.1 18 9H21ZM6 12V10H4V12C4 12.6 4.4 13 5 13S6 12.6 6 12ZM18 12V10H20V12C20 12.6 19.6 13 19 13S18 12.6 18 12Z"/>
                <path d="M9 16C9 14.9 9.9 14 11 14H13C14.1 14 15 14.9 15 16V18C15 19.1 14.1 20 13 20H11C9.9 20 9 19.1 9 18V16Z"/>
              </svg>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>Assistant IA</Typography>
            </Box>

            {/* Fast Delivery */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8C18.56 8 19 7.56 19 7S18.56 6 18 6 17 6.44 17 7 17.44 8 18 8ZM12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM13 7H11V13L16.25 16.15L17.25 14.45L13 11.93V7Z"/>
              </svg>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>Preparation Rapide</Typography>
            </Box>

            {/* Quality Food */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                <path d="M16 17L16.91 20.26L20 21L16.91 21.74L16 25L15.09 21.74L12 21L15.09 20.26L16 17Z"/>
                <path d="M8 17L8.91 20.26L12 21L8.91 21.74L8 25L7.09 21.74L4 21L7.09 20.26L8 17Z"/>
              </svg>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>Qualité Premium</Typography>
            </Box>

            {/* 24/7 Support */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 15.5C18.75 15.5 17.58 15.15 16.56 14.55L14.5 16.61C16.53 18.24 19.14 19.25 22 19.77V16.63C21.4 16.4 20.72 15.5 20 15.5ZM4 7.5C4 8.22 4.2 8.9 4.57 9.5L7.5 6.57C6.45 5.5 5.25 4.75 4 4.25V7.5ZM6.62 10.79C6.88 11.3 7.24 11.77 7.68 12.17L11.03 8.82C10.63 8.38 10.16 8.02 9.61 7.76L6.62 10.79ZM12 2C6.48 2 2 6.48 2 12S6.48 22 12 22C14.85 22 17.45 20.84 19.36 18.93C21.27 17.02 22.43 14.42 22.43 11.57C22.43 6.05 17.95 1.57 12.43 1.57L12 2Z"/>
              </svg>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>Support 24/7</Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ boxShadow: 'var(--mui-shadows-8)', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Box sx={{ maxWidth: '420px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
