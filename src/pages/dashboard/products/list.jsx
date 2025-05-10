import * as React from 'react';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { ProductModal } from '@/components/dashboard/product/product-modal';
import { ProductsFilters } from '@/components/dashboard/product/products-filters';
import { ProductsPagination } from '@/components/dashboard/product/products-pagination';
import { ProductsTable } from '@/components/dashboard/product/products-table';

const metadata = { title: `List | Products | Dashboard | ${config.site.name}` };


export function Page() {
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const dishResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/dishs?sort=-createdAt`);
        setProducts(dishResponse.data.data.dishs);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const { category, previewId, sortDir, sku, status } = useExtractSearchParams();

  const orderedProducts = applySort(products, sortDir);
  const filteredProducts = applyFilters(orderedProducts, { category, sku, status });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Error loading orders: {error.message}</Typography>
      </Box>
    );
  }

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
              <Typography variant="h4">Products</Typography>
            </Box>
            <div>
              <Button
                component={RouterLink}
                href={paths.dashboard.products.create}
                startIcon={<PlusIcon />}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
          <Card>
            <ProductsFilters filters={{ category, sku, status }} sortDir={sortDir} />
            <Divider />
            <Box sx={{ overflowX: 'auto' }}>
              <ProductsTable rows={filteredProducts} />
            </Box>
            <Divider />
            <ProductsPagination count={filteredProducts.length} page={0} />
          </Card>
        </Stack>
      </Box>
      <ProductModal open={Boolean(previewId)} />
    </React.Fragment>
  );
}

function useExtractSearchParams() {
  const [searchParams] = useSearchParams();

  return {
    category: searchParams.get('category') || undefined,
    previewId: searchParams.get('previewId') || undefined,
    sortDir: searchParams.get('sortDir') || undefined,
    sku: searchParams.get('sku') || undefined,
    status: searchParams.get('status') || undefined,
  };
}

// Sorting and filtering has to be done on the server.

function applySort(row, sortDir) {
  return row.sort((a, b) => {
    if (sortDir === 'asc') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function applyFilters(row, { category, status, sku }) {
  return row.filter((item) => {
    if (category) {
      if (item.category !== category) {
        return false;
      }
    }

    if (status) {
      if (item.status !== status) {
        return false;
      }
    }

    if (sku) {
      if (!item.sku?.toLowerCase().includes(sku.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}
