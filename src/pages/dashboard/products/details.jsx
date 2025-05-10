import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { ProductEditForm } from '@/components/dashboard/product/product-edit-form';

const metadata = { title: `Details | Products | Dashboard | ${config.site.name}` };

export function Page() {
  const { productId } = useParams();
  const [dish, setDish] = React.useState(null);

  React.useEffect(() => {
    // Fetch product details using dishId
    const fetchDishDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/dishs/${productId}`);
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        setDish(response.data.data.dish);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchDishDetails();
  }, [productId]);
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
          <Stack spacing={3}>
            <div>
              <Link
                color="text.primary"
                component={RouterLink}
                href={paths.dashboard.products.list}
                sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                variant="subtitle2"
              >
                <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                Products
              </Link>
            </div>
            <div>
              <Typography variant="h4">Edit product</Typography>
            </div>
          </Stack>
          <ProductEditForm
            product={{
              id: dish?._id,
              name: dish?.name,
              status: dish?.status,
              category: dish?.category,
              SpiceLevel: dish?.SpiceLevel,
              PreparationTime: dish?.PreparationTime,
              currency: 'USD',
              price: dish?.price,
              images: [{ id: 'IMG-001', url: dish?.image , fileName: `${dish?.name}.png` }],
              ingredients: dish?.ingredients,
            }}
          />
        </Stack>
      </Box>
    </React.Fragment>
  );
}
