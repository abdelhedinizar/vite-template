import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { ContactForm } from '@/components/marketing/contact/contact-form';

const metadata = { title: `Contact | ${config.site.name}` };

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        component="main"
        sx={{
          display: 'grid',
          flex: '1 1 auto',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          minHeight: '100%',
        }}
      >
        <Box
          sx={{
            bgcolor: 'var(--mui-palette-background-level1)',
            display: 'flex',
            alignItems: { md: 'flex-end' },
            flexDirection: 'column',
            px: { xs: '24px', md: '60px' },
            py: { xs: '60px', md: '120px' },
          }}
        >
          <Box maxWidth="sm">
            <Stack spacing={3}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.home}
                  sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                  variant="subtitle2"
                >
                  <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                  Accueil
                </Link>
              </div>
              <Stack spacing={6}>
                <Typography variant="h3">Contactez notre équipe</Typography>
                <Typography variant="body1">
                  Vous souhaitez moderniser la gestion de votre restaurant ? Nous proposons des solutions digitales
                  innovantes pour améliorer l’expérience client et simplifier la gestion de votre activité. Remplissez
                  simplement le formulaire ci-dessous et nous vous recontacterons dans les plus brefs délais.
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box sx={{ px: { xs: '24px', md: '60px' }, py: { xs: '60px', md: '120px' } }}>
          <Box maxWidth="sm">
            <Stack spacing={3}>
              <Typography variant="h6">Remplissez le formulaire ci-dessous</Typography>
              <ContactForm />
            </Stack>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
