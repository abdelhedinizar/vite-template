'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretLeft as CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import useEmblaCarousel from 'embla-carousel-react';


const reviews = [
  {
    id: 'REV-1',
    author: 'Ahmed Z.',
    comment:
      'Depuis que nous utilisons cette solution, la gestion des commandes est beaucoup plus fluide. Le chatbot aide vraiment nos clients à faire leur choix !',
  },
  {
    id: 'REV-2',
    author: 'Julie M.',
    comment:
      'La plateforme est super intuitive et notre staff adore la façon dont il peut gérer les commandes en temps réel.',
  },
  {
    id: 'REV-3',
    author: 'Karim L.',
    comment:
      'Nous avons gagné un temps précieux en cuisine grâce à la digitalisation. Les KPI sont clairs et très utiles pour piloter notre activité.',
  },
  {
    id: 'REV-4',
    author: 'Sophie D.',
    comment:
      'L’intelligence artificielle du serveur virtuel améliore vraiment l’expérience client. Beaucoup de retours positifs de nos habitués.',
  },
];

export function Testimonails() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState([]);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback((index) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const onInit = React.useCallback((api) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((api) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <Box
      sx={{
        bgcolor: 'var(--mui-palette-background-level1)',
        borderTop: '1px solid var(--mui-palette-divider)',
        pt: '120px',
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={8}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Chip color="primary" icon={<UsersIcon />} label="Témoignages" variant="soft" />
            </Box>
            <Typography sx={{ textAlign: 'center' }} variant="h3">
              Ce que disent nos restaurateurs
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ '--slide-spacing': '1rem', '--slide-size': '100%', '--slide-height': ' 300px' }}>
            <Box ref={emblaRef} sx={{ overflow: 'hidden' }}>
              <Box
                sx={{
                  backfaceVisibility: 'hidden',
                  display: 'flex',
                  touchAction: 'pan-y',
                  ml: 'calc(var(--slide-spacing) * -1)',
                }}
              >
                {reviews.map((review) => (
                  <Stack
                    key={review.id}
                    spacing={2}
                    sx={{
                      flex: '0 0 var(--slide-size)',
                      minWidth: 0,
                      pl: 'var(--slide-spacing)',
                      position: 'relative',
                    }}
                  >
                    <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
                      {review.comment}
                    </Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight: 500 }}>{review.author}</Typography>
                  </Stack>
                ))}
              </Box>
            </Box>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <IconButton disabled={prevBtnDisabled} onClick={scrollPrev}>
                <CaretLeftIcon />
              </IconButton>
              <Stack direction="row" spacing={1} sx={{ flex: '1 1 auto', justifyContent: 'center' }}>
                {scrollSnaps.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => {
                      scrollTo(index);
                    }}
                    sx={{
                      bgcolor:
                        index === selectedIndex
                          ? 'var(--mui-palette-primary-main)'
                          : 'var(--mui-palette-action-selected)',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      height: '8px',
                      mx: '0.25rem',
                      width: '8px',
                    }}
                  />
                ))}
              </Stack>
              <IconButton disabled={nextBtnDisabled} onClick={scrollNext}>
                <CaretRightIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
