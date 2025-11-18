import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { ChannelMonthlySalesPerformance } from '@/components/dashboard/analytics/channel-monthly-sales-performance';
import { ChannelSessionsVsBounce } from '@/components/dashboard/analytics/channel-sessions-vs-bounce-rate';
import { Summary } from '@/components/dashboard/analytics/summary';
import { CostBreakdown } from '@/components/dashboard/e-commerce/cost-breakdown';
import { TopProducts } from '@/components/dashboard/e-commerce/top-products';

const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

export function Page() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('custom-auth-token');
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/orders/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
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
              <Typography variant="h4">Analytics</Typography>
            </Box>
          </Stack>
          <Grid container spacing={4}>
            <Grid size={12}>
              <Summary stats={stats} />
            </Grid>

            <Grid
              size={{
                lg: 8,
                xs: 12,
              }}
            >
              <ChannelSessionsVsBounce data={stats?.data?.dailyOrders} />
            </Grid>

            <Grid
              size={{
                lg: 4,
                xs: 12,
              }}
            >
              <CostBreakdown data={stats?.data?.mostSellingCategories} />
            </Grid>
            <Grid
              size={{
                lg: 5,
                xs: 12,
              }}
            >
              <TopProducts products={stats?.data.topProducts} />
            </Grid>
            <Grid
              size={{
                lg: 7,
                xs: 12,
              }}
            >
              <ChannelMonthlySalesPerformance data={stats?.data?.monthlyOrders} />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
