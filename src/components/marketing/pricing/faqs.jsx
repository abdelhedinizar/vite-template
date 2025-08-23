import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Faq } from './faq';

const faqs = [
  {
    id: 'FAQ-1',
    question: 'Quelle est la différence entre le plan Starter et Pro ?',
    answer:
      'Le plan Starter offre un menu numérique accessible par QR code, parfait pour les restaurants qui veulent digitaliser leur menu. Le plan Pro inclut un système de commandes complet avec interface staff, analytics avancés et paiements Stripe.',
  },
  {
    id: 'FAQ-2',
    question: 'Combien de temps faut-il pour configurer le système ?',
    answer:
      'Le plan Starter peut être mis en place en 24-48h. Le plan Pro nécessite environ 1 semaine incluant la configuration du menu, formation staff et tests. Nous nous occupons de tout le processus.',
  },
  {
    id: 'FAQ-3',
    question: 'Le système fonctionne-t-il sur tous les appareils ?',
    answer:
      'Oui ! Nos solutions sont entièrement responsive et fonctionnent sur smartphones, tablettes et ordinateurs. Aucune application à télécharger pour vos clients.',
  },
  {
    id: 'FAQ-4',
    question: 'Puis-je modifier mon menu après la mise en place ?',
    answer:
      'Absolument ! Avec le plan Starter, vous pouvez modifier votre menu vous-même. Avec le plan Pro, vous avez une interface admin complète pour gérer menu, prix, disponibilité en temps réel.',
  },
  {
    id: 'FAQ-5',
    question: 'Y a-t-il des frais cachés ou supplémentaires ?',
    answer:
      'Non, nos prix sont transparents. Seuls les frais Stripe standards s\'appliquent pour les paiements (1.6% + €0.25 pour cartes EU). Les modules complémentaires sont optionnels et clairement indiqués.',
  },
  {
    id: 'FAQ-6',
    question: 'Proposez-vous un support technique ?',
    answer:
      'Oui ! Support inclus avec tous nos plans. Support prioritaire disponible avec SLA <2h pour €39/mois. Formation staff incluse avec le plan Pro.',
  },
];

export function Faqs() {
  return (
    <Box sx={{ py: '120px' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid
            size={{
              md: 6,
              xs: 12,
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h3">Questions Fréquemment Posées</Typography>
              <Typography color="text.secondary" variant="subtitle2">
                Tout ce que vous devez savoir sur Servy
              </Typography>
            </Stack>
          </Grid>
          <Grid
            size={{
              md: 6,
              xs: 12,
            }}
          >
            <Stack spacing={3}>
              {faqs.map((faq) => (
                <Faq key={faq.id} {...faq} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
