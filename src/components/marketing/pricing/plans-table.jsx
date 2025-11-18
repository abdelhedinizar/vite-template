import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { Plan } from './plan';
import { AddonPlan } from './addon-plan';

export function PlansTable() {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', py: { xs: '60px', sm: '120px' } }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Typography sx={{ textAlign: 'center' }} variant="h3">
              Révolutionnez votre restaurant avec Servy
            </Typography>
            <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body1">
              Simplifiez les commandes, augmentez vos ventes et offrez une expérience client exceptionnelle.
            </Typography>
          </Stack>
          <div>
            <Grid container spacing={3}>
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Plan
                  action={<Button variant="outlined">Commencer</Button>}
                  currency="EUR"
                  description="Menu numérique accessible par QR code, parfait pour débuter."
                  features={[
                    'Menu numérique accessible par QR code',
                    'Branding avec logo et couleurs du restaurant',
                    'Mobile-friendly, fonctionne sur tous les téléphones',
                    'Articles illimités',
                    'Codes QR inclus (fichiers design)',
                    'Éditable par vous'
                  ]}
                  id="starter"
                  name="Starter - Menu QR"
                  price={60}
                  priceNote="par mois/emplacement + €49/an (hébergement)"
                />
              </Grid>
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Plan
                  action={<Button variant="contained">Essai gratuit</Button>}
                  currency="EUR"
                  description="Système de commandes complet avec interface staff et analytics avancés."
                  features={[
                    'Tout du plan Starter',
                    'Commandes depuis table QR',
                    'Interface staff (statut: préparation/prêt/servi)',
                    'Interface admin (gestion complète)',
                    'KPIs avancés et analytics',
                    'Paiements Stripe',
                    'Historique des commandes'
                  ]}
                  id="pro"
                  name="Pro - Système Complet"
                  popular
                  price={89}
                  priceNote="par mois/emplacement + €399 setup"
                />
              </Grid>
            </Grid>
          </div>
          
          {/* Add-ons Section */}
          <Stack spacing={3} sx={{ mt: 6 }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              Modules Complémentaires
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ md: 4, xs: 12 }}>
                <AddonPlan
                  currency="EUR"
                  description="Assistant IA pour Q&A menu et ajout au panier"
                  features={[
                    'Réponses automatiques sur le menu',
                    'Ajout intelligent au panier',
                    'Support multilingue',
                    'Intégration transparente'
                  ]}
                  id="ai-lite"
                  name="IA Chatbot Lite"
                  price={29}
                  priceNote="par mois (usage faible)"
                />
              </Grid>
              <Grid size={{ md: 4, xs: 12 }}>
                <AddonPlan
                  currency="EUR"
                  description="Version avancée pour restaurants très fréquentés"
                  features={[
                    'Tout du plan Lite',
                    'Capacité élevée',
                    'Réponses plus rapides',
                    'Analytics IA avancés'
                  ]}
                  id="ai-standard"
                  name="IA Chatbot Standard"
                  price={39}
                  priceNote="par mois (usage intensif)"
                />
              </Grid>
              <Grid size={{ md: 4, xs: 12 }}>
                <AddonPlan
                  currency="EUR"
                  description="Module livraison avec suivi en temps réel"
                  features={[
                    'Click & collect',
                    'Suivi de livraison',
                    'Notifications clients',
                    'Gestion des livreurs'
                  ]}
                  id="delivery"
                  name="Module Livraison"
                  price={39}
                  priceNote="par mois + 0.5% du volume"
                />
              </Grid>
            </Grid>
          </Stack>

          <div>
            <Typography color="text.secondary" component="p" sx={{ textAlign: 'center' }} variant="caption">
              Frais Stripe France: ~1.6% + €0.25 (cartes EU) / 3.1% + €0.25 (cartes non-EU)
            </Typography>
          </div>
        </Stack>
      </Container>
    </Box>
  );
}
