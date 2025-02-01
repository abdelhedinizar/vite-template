import React, { useEffect, useState } from 'react';
import { fetchDishes } from '@/stores/slices/DishSlice';
import { Select, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { config } from '@/config';
import { Option } from '@/components/core/option';
import CategoryLayout2 from '@/components/dashboard/home/desktop/category';
import CategoryLayout from '@/components/dashboard/home/mobile/category';
import { Previewer } from '@/components/widgets/previewer';

const metadata = { title: `home | Dashboard | ${config.site.name}` };

export function Page() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, status } = useSelector((state) => state.categories);
  const [selectedCategries, setSelectedCategries] = useState(categories);
  const [selectedCategrie, setSelectedCategrie] = useState('All');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect if the screen is mobile

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
    if (status === 'idle') {
      dispatch(fetchDishes());
    }
    if (selectedCategrie === 'All') {
      setSelectedCategries(categories);
    }
  }, [status, dispatch]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',

          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={isMobile ? 2 : 4}>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ p: 2, alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Menu</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', px: 4 }}>
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
          {selectedCategries.map((category) =>
            isMobile ? (
              // Mobile layout: Horizontal scrolling
              <>
                <Box sx={{ flex: '1 1 auto', px: 3 }}>
                  <Typography variant="h5">{category.name}</Typography>
                </Box>
                <Box sx={{ flex: '1 1 auto' }}>
                  <CategoryLayout
                    key={category.id}
                    category={category}
                    handleOpenCreateBasket={handleOpenCreateBasket}
                  />
                </Box>
              </>
            ) : (
              <Previewer key={category.id} title={category.name}>
                <CategoryLayout2 category={category} handleOpenCreateBasket={handleOpenCreateBasket} />
              </Previewer>
            )
          )}
        </Stack>
      </Box>
    </React.Fragment>
  );
}
