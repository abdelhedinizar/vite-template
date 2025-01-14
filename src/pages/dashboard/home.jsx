import React, { useEffect, useState } from 'react';
import { fetchDishes } from '@/stores/slices/DishSlice';
import { Card, CardMedia, Divider, IconButton, Select, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Basket, Pepper } from '@phosphor-icons/react/dist/ssr';
import { Heart as HeartIcon } from '@phosphor-icons/react/dist/ssr/Heart';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { config } from '@/config';
import { Option } from '@/components/core/option';
import { Previewer } from '@/components/widgets/previewer';

const metadata = { title: `home | Dashboard | ${config.site.name}` };

export function Page() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, status } = useSelector((state) => state.categories);
  const [selectedCategries, setSelectedCategries] = useState(categories);
  const [selectedCategrie, setSelectedCategrie] = useState('All');

  const handleCategoriesChange = (event) => {
    const { value } = event.target;
    setSelectedCategrie(value);
    if (value === 'All') {
      setSelectedCategries(categories);
    } else {
      setSelectedCategries(categories.filter((category) => category.name === value));
    }
  };

  const handleOpenCreateBasket = (dish) => {
    navigate('/dashboard/basket', { state: { selectedDish: dish } });
  };
  useEffect(() => {
    dispatch(fetchDishes());
    if (selectedCategrie === 'All') {
      setSelectedCategries(categories);
    }
  }, [categories, dispatch]);

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
        }}
      >
        <Stack spacing={4}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Menu</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', px: 3, py: 2 }}>
            <Select
              name="sort"
              sx={{ maxWidth: '100%', width: '120px' }}
              value={selectedCategrie}
              label="Category"
              onChange={handleCategoriesChange}
            >
              <Option key="All" value="All">
                All
              </Option>
              {categories.map((category) => (
                <Option key={category.id} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Stack>
          {selectedCategries.map((category) => (
            <Previewer key={category.id} title={category.name}>
              <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
                <Grid container spacing={3}>
                  {category?.dishes?.map((dish) => (
                    <Grid
                      key={dish.id}
                      size={{
                        md: 4,
                        sm: 6,
                        xs: 12,
                      }}
                    >
                      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                          image={dish.image}
                          sx={{ bgcolor: 'var(--mui-palette-background-level2)', height: '220px' }}
                        />
                        <Stack spacing={2} sx={{ flex: '1 1 auto', p: 2 }}>
                          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                            <div>
                              <Link color="text.primary" variant="h5">
                                {dish.name}
                              </Link>
                            </div>
                          </Stack>
                          <Typography color="text.secondary" variant="body2">
                            {dish.ingredients}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={3}
                            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                          >
                            <div>
                              <Typography variant="subtitle2">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(
                                  dish.price
                                )}
                              </Typography>
                              <Typography color="text.secondary" variant="body2">
                                Price
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="subtitle2">
                                {dish.PreparationTime} <TimerIcon size={16} />
                              </Typography>
                              <Typography color="text.secondary" variant="body2">
                                Preparation Time
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="subtitle2">
                                <Pepper weight="fill" fill="var(--mui-palette-error-main)" size={22} />
                                <Pepper weight="fill" fill="var(--mui-palette-error-main)" size={22} />
                                <Pepper weight="fill" fill="var(--mui-palette-error-main)" size={22} />
                              </Typography>
                              <Typography color="text.secondary" variant="body2">
                                Spice Level
                              </Typography>
                            </div>
                          </Stack>
                        </Stack>
                        <Divider />
                        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', p: 2 }}>
                          <Stack direction="row" spacing={2} sx={{ flex: '1 1 auto' }}>
                            <Stack direction="row" sx={{ alignItems: 'center' }}>
                              <Tooltip title="Unlike">
                                <IconButton>
                                  <HeartIcon fill="var(--mui-palette-error-main)" weight="fill" />
                                </IconButton>
                              </Tooltip>
                              <Typography color="text.secondary" variant="subtitle2">
                                18
                              </Typography>
                            </Stack>
                          </Stack>
                          <Button
                            startIcon={<Basket weight="fill" />}
                            variant="contained"
                            onClick={() => handleOpenCreateBasket(dish)}
                          >
                            Order now !
                          </Button>
                        </Stack>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Previewer>
          ))}
        </Stack>
      </Box>
    </React.Fragment>
  );
}
