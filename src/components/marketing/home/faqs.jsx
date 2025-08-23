'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { Question as QuestionIcon } from '@phosphor-icons/react/dist/ssr/Question';

const faqs = [
  {
    id: 'FAQ-1',
    question: 'Comment cette solution aide-t-elle mon restaurant au quotidien ?',
    answer:
      'Notre solution digitalise entièrement la prise de commande, permet un suivi en temps réel des performances via un tableau de bord, et réduit les erreurs de communication entre les clients, les serveurs et la cuisine.',
  },
  {
    id: 'FAQ-2',
    question: 'Est-ce que mes clients doivent télécharger une application ?',
    answer:
      'Non, vos clients peuvent accéder au menu et passer commande via un simple QR code, sans installer quoi que ce soit. L’expérience est fluide et immédiate sur mobile.',
  },
  {
    id: 'FAQ-3',
    question: 'Est-ce que le système fonctionne si je n’ai pas de serveur disponible ?',
    answer:
      'Oui. Le chatbot intégré permet aux clients de poser des questions sur les plats, et de commander directement, réduisant la charge de travail du personnel.',
  },
  {
    id: 'FAQ-4',
    question: 'Puis-je personnaliser le menu numérique avec mes couleurs et mon logo ?',
    answer:
      'Absolument. Votre menu est 100% personnalisable : images, descriptions, prix, catégories, etc.',
  },
  {
    id: 'FAQ-5',
    question: 'Quels sont les indicateurs que je peux suivre dans le tableau de bord ?',
    answer:
      "Vous avez accès à des KPIs essentiels comme les plats les plus vendus, le chiffre d'affaires journalier, etc.",
  },
  {
    id: 'FAQ-6',
    question: 'Comment les commandes sont-elles envoyées en cuisine ?',
    answer:
      "Les commandes sont transmises en temps réel sur une interface dédiée à la cuisine ou à l'imprimante, pour un traitement rapide sans erreur.",
  },
  {
    id: 'FAQ-7',
    question: 'Est-ce que l’outil est adapté aux restaurants traditionnels et aux fast-foods ?',
    answer:
      'Oui, notre système s’adapte à tous les types de restauration : service à table, à emporter, fast-food, food court, etc.',
  },
  {
    id: 'FAQ-8',
    question: 'Y a-t-il un accompagnement ou une formation prévue ?',
    answer:
      'Oui, nous vous accompagnons dans la prise en main de la solution avec une formation rapide pour votre équipe, et un support technique réactif en cas de besoin.',
  },
];

export function Faqs() {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', py: '120px' }}>
      <Container maxWidth="md">
        <Stack spacing={8}>
          <Stack maxWidth="700px" sx={{ mx: 'auto' }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Chip color="primary" icon={<QuestionIcon />} label="FAQ" variant="soft" />
              </Box>
              <Typography sx={{ textAlign: 'center' }} variant="h3">
                Questions fréquentes
              </Typography>
              <Typography color="text.secondary">
                Une autre question non listée ici ? Contactez-nous par{' '}
                <Box
                  component="a"
                  href="mailto:nizar.abdelhedi93@gmail.com"
                  sx={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  email
                </Box>
                .
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={2}>
            {faqs.map((faq) => (
              <Faq key={faq.id} {...faq} />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function Faq({ answer, question }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card sx={{ p: 3 }}>
      <Stack
        onClick={() => {
          setIsExpanded((prevState) => !prevState);
        }}
        sx={{ cursor: 'pointer' }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">{question}</Typography>
          {isExpanded ? <CaretDownIcon /> : <CaretRightIcon />}
        </Stack>
        <Collapse in={isExpanded}>
          <Typography color="text.secondary" sx={{ pt: 3 }} variant="body2">
            {answer}
          </Typography>
        </Collapse>
      </Stack>
    </Card>
  );
}
