import * as React from 'react';
import { useState } from 'react';
import { addToBasket } from '@/stores/slices/BasketSlice';
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
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

const metadata = { title: `Create | Customers | Dashboard | ${config.site.name}` };
export function Page() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDish = location.state?.selectedDish;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedAccompaniments, setSelectedAccompaniments] = useState([]);
  const [basketElement, setBasketElement] = useState({
    dish: selectedDish,
    price: selectedDish.price,
    size: selectedSize,
    quantity: selectedQuantity,
  });
  const handleQuantityChange = (add) => {
    const newQuantity = add ? selectedQuantity + 1 : selectedQuantity - 1;
    if (newQuantity > 0) {
      setSelectedQuantity(newQuantity);
      updateBasketAndCalculateThePrice(newQuantity, selectedSize, selectedAccompaniments);
    }
  };
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    updateBasketAndCalculateThePrice(selectedQuantity, size, selectedAccompaniments);
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
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
          pb: { xs: '220px', sm: '180px' },
        }}
      >
        <Stack spacing={4}>
          <div>
            <Link
              color="text.primary"
              component={RouterLink}
              href={paths.dashboard.home}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              menu
            </Link>
          </div>
          <Card
            sx={{
              borderRadius: 3,
              border: '1px solid var(--mui-palette-divider)',
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 30px !important;',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <CardContent sx={{ p: 0, pb: '0px !important', display: 'flex', flex: 1 }}>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={0}
                sx={{ alignItems: { xs: 'stretch', md: 'stretch' }, flex: 1 }}
              >
                <Box
                  component="img"
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  sx={{
                    width: { xs: '100%', md: 300 },
                    height: { xs: 240, md: '100%' },
                    objectFit: 'cover',
                    borderRadius: 0,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: { xs: 12, md: 0 },
                    borderBottomLeftRadius: { xs: 0, md: 12 },
                    alignSelf: { md: 'stretch' },
                    display: 'block',
                  }}
                />
                <Stack spacing={2} sx={{ flex: 1, p: { xs: 2.5, md: 3 } }}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h4">{selectedDish.name}</Typography>
                    <IconButton
                      sx={{
                        bgcolor: 'var(--mui-palette-error-main)',
                        '&:hover': { bgcolor: 'var(--mui-palette-error-dark)' },
                      }}
                    >
                      <HeartIcon color="white" weight="fill" />
                    </IconButton>
                  </Stack>
                  <Typography color="text.secondary" variant="body1">
                    {selectedDish.ingredients}
                  </Typography>

                  {selectedDish?.Size && selectedDish?.Size.length > 0 ? (
                    <Stack spacing={1}>
                      <Typography color="text.secondary" variant="subtitle2">
                        Taille
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
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
                            {sizeMap[size.name]}
                          </Button>
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}

                  {selectedDish?.Accompaniments && selectedDish?.Accompaniments.length > 0 ? (
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent sx={{ p: 2 }}>
                        <Typography color="text.secondary" variant="subtitle2" sx={{ mb: 1 }}>
                          Accompagnements
                        </Typography>
                        <FormGroup>
                          {selectedDish.Accompaniments.map((accompaniment) => (
                            <FormControlLabel
                              key={accompaniment.name}
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    let accompaniments;
                                    if (e.target.checked) {
                                      accompaniments = [
                                        ...selectedAccompaniments,
                                        {
                                          name: accompaniment.name,
                                          price: accompaniment.price,
                                          _id: accompaniment._id,
                                          quantity: 1,
                                        },
                                      ];
                                    } else {
                                      accompaniments = selectedAccompaniments.filter(
                                        (acc) => acc._id !== accompaniment._id
                                      );
                                    }
                                    setSelectedAccompaniments(accompaniments);
                                    updateBasketAndCalculateThePrice(selectedQuantity, selectedSize, accompaniments);
                                  }}
                                />
                              }
                              label={accompaniment.name}
                            />
                          ))}
                        </FormGroup>
                      </CardContent>
                    </Card>
                  ) : null}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: { xs: 0, lg: 'var(--SideNav-width)' },
          right: 0,
          width: { xs: '100%', lg: 'calc(100% - var(--SideNav-width))' },
          zIndex: 'var(--mui-zIndex-appBar)',
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            maxWidth: 'var(--Content-maxWidth)',
            m: '0 auto',
            px: 'var(--Content-paddingX)',
            pb: { xs: 2, sm: 3 },
            width: '100%',
            boxSizing: 'border-box',
            pointerEvents: 'auto',
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.12)',
            }}
          >
            <CardContent sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 2.5 } }}>
              <Stack
                spacing={2}
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between' }}
              >
                <Stack spacing={0.5}>
                  <Typography color="text.secondary" variant="body2">
                    Quantité
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
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
                      sx={{
                        px: 1,
                        color: 'var(--mui-palette-secondary-800)',
                        fontWeight: 'bold',
                      }}
                      variant="h6"
                    >
                      {selectedQuantity}
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
                        boxShadow: '0px 4px 6px var(--mui-palette-primary-300)',
                        '&:hover': {
                          backgroundColor: 'var(--mui-palette-primary-800)',
                        },
                      }}
                    >
                      +
                    </Button>
                  </Stack>
                </Stack>
                <Stack spacing={0.5} sx={{ alignItems: { xs: 'flex-start', sm: 'flex-end' } }}>
                  <Typography color="text.secondary" variant="body2">
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    €{basketElement.price}
                  </Typography>
                  <Button
                    sx={{
                      backgroundColor: 'var(--mui-palette-primary-700)',
                      color: 'white',
                      boxShadow: '0px 4px 6px var(--mui-palette-primary-300)',
                      '&:hover': {
                        backgroundColor: 'var(--mui-palette-primary-800)',
                      },
                    }}
                    onClick={handleBasket}
                    variant="contained"
                  >
                    Ajouter au panier
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </React.Fragment>
  );

  function handleBasket() {
    dispatch(addToBasket(basketElement));
    navigate('/dashboard/home');
  }

  function updateBasketAndCalculateThePrice(newQuantity, newSize, newAccompaniments) {
    const accompanimentsPrice = newAccompaniments.reduce((total, acc) => total + acc.price, 0);
    setBasketElement({
      dish: selectedDish,
      size: newSize,
      quantity: newQuantity,
      addedAccompaniments: selectedAccompaniments,
      price: ((newSize ? selectedDish.price + newSize?.price : selectedDish.price) + accompanimentsPrice) * newQuantity,
    });
  }
}
