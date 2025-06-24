import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { Stack as StackIcon } from '@phosphor-icons/react/dist/ssr/Stack';

import { paths } from '@/paths';

export function Features() {
  return (
    <Box sx={{ pt: '120px' }}>
      <Stack spacing={8}>
        <Stack maxWidth="700px" sx={{ mx: 'auto', px: 3 }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Chip color="primary" icon={<StackIcon />} label="Technologie & IA" variant="soft" />
            </Box>
            <Typography sx={{ textAlign: 'center' }} variant="h3">
              Bien plus qu'une simple solution
            </Typography>
            <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
              Nous utilisons les meilleures technologies et l'intelligence artificielle pour vous offrir les meilleures
              performances. Explorez tout ce que notre plateforme peut vous apporter pour digitaliser votre restaurant
              de manière efficace.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button endIcon={<CaretRightIcon />} href={paths.pricing} target="_blank" variant="contained">
                Essayez maintenant
              </Button>
            </Box>
          </Stack>
        </Stack>
        <Container maxWidth="md">
          <Box component="img" src="/assets/home-techs.svg" sx={{ display: 'block', height: 'auto', width: '100%' }} />
        </Container>
      </Stack>
    </Box>
  );
}
