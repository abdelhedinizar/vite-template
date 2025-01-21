import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Heart as HeartIcon } from '@phosphor-icons/react/dist/ssr/Heart';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

const metadata = { title: `Create | Customers | Dashboard | ${config.site.name}` };

export function Page() {
  const location = useLocation();
  const selectedDish = location.state?.selectedDish;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const handleQuantityChange = (add) => {
    const newQuantity = add ? selectedQuantity + 1 : selectedQuantity - 1;
    if (newQuantity > 0) {
      setSelectedQuantity(newQuantity);
    }
  };
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };
  const sizeMap = {
    Small: 'S',
    Meduim: 'M',
    Large: 'L',
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Card
        sx={{
          borderRadius: 0,
          boxShadow: 2,
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <CardMedia component="img" height="300" image={selectedDish.image} alt={selectedDish.name} />
        <CardContent sx={{ height: '100%' }}>
          <Stack spacing={2} sx={{ flex: '1 1 auto', p: 1 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <Typography variant="h5">{selectedDish.name}</Typography>
              <IconButton sx={{ background: '#f04438 !important', borderRadius: '50%' }}>
                <HeartIcon color="white" weight="fill" />
              </IconButton>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {selectedDish.ingredients}
            </Typography>
            {selectedDish?.Size && selectedDish?.Size.length > 0 ? (
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                {selectedDish.Size.map((size) => (
                  <Button
                    key={size.name}
                    onClick={() => handleSizeChange(size)}
                    sx={{
                      backgroundColor:
                        selectedSize?.name === size.name || (selectedSize === null && size.price === 0)
                          ? 'var(--mui-palette-primary-700)'
                          : 'var(--mui-palette-grey-400)',
                      color: 'white',
                      height: '40px',
                      width: '40px',
                      borderRadius: '25%',
                      fontWeight: 'bold',
                      boxShadow:
                        selectedSize?.name === size.name || (selectedSize === null && size.price === 0)
                          ? '0px 4px 6px var(--mui-palette-primary-300)'
                          : '0px 4px 6px var(--mui-palette-grey-200)',
                      '&:hover': {
                        backgroundColor: 'var(--mui-palette-primary-800)',
                      },
                    }}
                  >
                    {' '}
                    {sizeMap[size.name]}
                  </Button>
                ))}
              </Stack>
            ) : null}

            {selectedDish?.Accompaniments && selectedDish?.Accompaniments.length > 0 ? (
              <>
                <Typography color="text.secondary" variant="h6">
                  Accompaniment of your choice ?
                </Typography>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'start' }}>
                  <FormGroup>
                    {selectedDish.Accompaniments.map((accompaniment) => (
                      <FormControlLabel key={accompaniment.name} control={<Checkbox />} label={accompaniment.name} />
                    ))}
                  </FormGroup>
                </Stack>
              </>
            ) : null}
          </Stack>
        </CardContent>
      </Card>
      <Box
        sx={{
          position: 'absolute',
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <Stack spacing={3}>
            <div>
              <Link
                color="white"
                component={RouterLink}
                href={paths.dashboard.home}
                sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                variant="subtitle2"
              >
                <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                menu
              </Link>
            </div>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          maxWidth: 'var(--Content-maxWidth)',
          bottom: 0,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px; !important;',
          width: 'var(--Content-width)',
        }}
      >
        <Card
          sx={{
            borderRadius: 0,
            overflow: 'hidden',
          }}
        >
          <CardContent
            sx={{
              px: '20px !important',
              pt: '20px !important',
              pb: '20px !important',
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <Stack direction="row">
                <Button
                  onClick={() => handleQuantityChange(false)}
                  sx={{
                    backgroundColor: 'var(--mui-palette-primary-700)',
                    color: 'white',
                    height: '40px',
                    width: '40px',
                    borderRadius: '25%',
                    fontWeight: 'bold',
                    boxShadow: '0px 4px 6px var(--mui-palette-primary-300)',
                    '&:hover': {
                      backgroundColor: 'var(--mui-palette-primary-800)',
                    },
                  }}
                >
                  -
                </Button>
                <Typography
                  color="text.secondary"
                  sx={{
                    alignItems: 'center',
                    margin: 'auto',
                    p: 1,
                    color: 'var(--mui-palette-secondary-800)',
                    fontWeight: 'bold',
                  }}
                  variant="h6"
                >
                  {selectedQuantity}x
                </Typography>

                <Button
                  onClick={() => handleQuantityChange(true)}
                  sx={{
                    backgroundColor: 'var(--mui-palette-primary-700)',
                    color: 'white',
                    height: '40px',
                    width: '40px',
                    fontWeight: 'bold',
                    borderRadius: '25%',
                    boxShadow: '0px 4px 6px var(--mui-palette-primary-300)', // Subtle shadow
                    '&:hover': {
                      backgroundColor: 'var(--mui-palette-primary-800)', // Slightly darker shade on hover
                    },
                  }}
                >
                  +
                </Button>
              </Stack>

              <Button
                sx={{
                  backgroundColor: 'var(--mui-palette-primary-700)',
                  color: 'white',
                  mx: 'auto',
                  boxShadow: '0px 4px 6px var(--mui-palette-primary-300)', // Subtle shadow
                  '&:hover': {
                    backgroundColor: 'var(--mui-palette-primary-800)', // Slightly darker shade on hover
                  },
                }}
              >
                Order for €
                {(selectedSize ? selectedDish.price + selectedSize?.price : selectedDish.price) * selectedQuantity}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
}
