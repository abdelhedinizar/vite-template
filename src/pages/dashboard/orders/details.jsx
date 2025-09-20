import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { HourglassMedium as HourglassMediumIcon } from '@phosphor-icons/react/dist/ssr';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { ShoppingCartSimple as ShoppingCartSimpleIcon } from '@phosphor-icons/react/dist/ssr/ShoppingCartSimple';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';
import { Money as MoneyIcon } from '@phosphor-icons/react/dist/ssr/Money';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { RouterLink } from '@/components/core/link';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { LineItemsTable } from '@/components/dashboard/order/line-items-table';
import { OrderManageForm } from '@/components/dashboard/order/order-manage-form';

const metadata = { title: `Details | Orders | Dashboard | ${config.site.name}` };

const mapping = {
  pending: { label: 'Pending', icon: <ClockIcon color="var(--mui-palette-warning-main)" weight="fill" /> },
  completed: {
    label: 'Completed',
    icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
  },
  cancelled: { label: 'Canceled', icon: <XCircleIcon color="var(--mui-palette-error-main)" weight="fill" /> },
  rejected: { label: 'Rejected', icon: <MinusIcon color="var(--mui-palette-error-main)" /> },
  inProgress: {
    label: 'InProgress',
    icon: <HourglassMediumIcon color="var(--mui-palette-info-main)" weight="fill" />,
  },
};

export function Page() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { label, icon } = mapping[order?.status] ?? { label: 'Unknown', icon: null };

  const handlePaymentStatusChange = async (newStatus) => {
    try {
      console.log('Updating payment status:', { orderId, newStatus, currentOrder: order });

      const token = localStorage.getItem('custom-auth-token');
      const response = await axios.patch(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/orders/${orderId}`, {
        paymentStatus: newStatus ? 'paid' : 'unpaid'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('API Response:', response.data);

      // Update the order state
      setOrder(prev => ({
        ...prev,
        paymentStatus: newStatus ? 'paid' : 'unpaid'
      }));

      console.log('Order updated successfully');
    } catch (error) {
      console.error('Error updating payment status:', error);
      console.error('Error details:', error.response?.data);
    }
  };

  React.useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const token = localStorage.getItem('custom-auth-token');
        const orderResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Fetched order data:', orderResponse.data.data.order);
        setOrder(orderResponse.data.data.order);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetail();
    }
  }, [orderId]);

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
          <div>
            <Link
              color="text.primary"
              component={RouterLink}
              href={paths.dashboard.orders.todaylist}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Orders
            </Link>
          </div>
          <div>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
              <Box sx={{ flex: '1 1 auto' }}>
                <Typography variant="h5">ORD-{order?.sequenceNumber}</Typography>
              </Box>
            </Stack>
          </div>
          <Grid container spacing={4}>
            <Grid
              size={{
                md: 8,
                xs: 12,
              }}
            >
              <Stack spacing={4}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <TimerIcon fontSize="var(--Icon-fontSize)" />
                      </Avatar>
                    }
                    title="Order management"
                  />
                  <CardContent>
                    <OrderManageForm order={order} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader
                    avatar={
                      <Avatar sx={{
                        bgcolor: order?.paymentStatus === 'paid' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-warning-main)',
                        color: 'white'
                      }}>
                        <MoneyIcon fontSize="var(--Icon-fontSize)" />
                      </Avatar>
                    }
                    title="Statut de Paiement"
                  />
                  <CardContent>
                    <Stack spacing={3}>
                      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            Total de la commande
                          </Typography>
                          <Typography variant="h4" color="primary">
                            {new Intl.NumberFormat('fr-FR', {
                              style: 'currency',
                              currency: 'EUR'
                            }).format(order?.totalPrice || 0)}
                          </Typography>
                        </Box>
                        <Chip
                          icon={(order?.paymentStatus === 'paid') ? <CheckCircleIcon /> : <ClockIcon />}
                          label={(order?.paymentStatus === 'paid') ? 'Payé' : 'Non payé'}
                          color={(order?.paymentStatus === 'paid') ? 'success' : 'warning'}
                          variant="filled"
                          sx={{ fontSize: '0.875rem', fontWeight: 600 }}
                        />
                      </Stack>

                      <Divider />

                      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="subtitle1" gutterBottom>
                            Méthode de paiement
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {order?.paymentMethod === 'card' ? 'Carte bancaire' : 'Espèces'}
                          </Typography>
                        </Box>

                        <FormControlLabel
                          control={
                            <Switch
                              checked={order?.paymentStatus === 'paid'}
                              onChange={(e) => handlePaymentStatusChange(e.target.checked)}
                              color="success"
                              size="medium"
                            />
                          }
                          label="Marquer comme payé"
                          labelPlacement="start"
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              color: 'text.primary'
                            },
                          }}
                        />
                      </Stack>

                      {order?.paymentStatus === 'paid' && (
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: 'var(--mui-palette-success-50)',
                            borderRadius: 1,
                            border: '1px solid var(--mui-palette-success-200)'
                          }}
                        >
                          <Typography variant="body2" color="success.dark">
                            ✓ Paiement confirmé - Commande prête à être préparée
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <ShoppingCartSimpleIcon fontSize="var(--Icon-fontSize)" />
                      </Avatar>
                    }
                    title="Checkout Summary"
                  />
                  <CardContent>
                    <Stack spacing={2}>
                      <Card sx={{ borderRadius: 1 }} variant="outlined">
                        <Box sx={{ overflowX: 'auto' }}>
                          <LineItemsTable rows={order?.dishes} />
                        </Box>
                      </Card>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3 }}>
                        <Stack spacing={2} sx={{ width: '300px', maxWidth: '100%' }}>
                          <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                            <Typography variant="body2">Subtotal</Typography>
                            <Typography variant="body2">
                              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                                order?.totalPrice
                              )}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                            <Typography variant="body2">Discount</Typography>
                            <Typography variant="body2">-</Typography>
                          </Stack>

                          <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1">Total</Typography>
                            <Typography variant="subtitle1">
                              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(
                                order?.totalPrice
                              )}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid
              size={{
                md: 4,
                xs: 12,
              }}
            >
              <Card>
                <CardHeader
                  avatar={
                    <Avatar>
                      <CreditCardIcon fontSize="var(--Icon-fontSize)" />
                    </Avatar>
                  }
                  title="Order information"
                />
                <CardContent>
                  <Card sx={{ borderRadius: 1 }} variant="outlined">
                    <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '12px 24px' }}>
                      {[
                        { key: 'Customer', value: <Link variant="subtitle2">{order?.user?.name}</Link> },
                        {
                          key: 'Address',
                          value: (
                            <Typography variant="subtitle2">
                              {order?.user?.address?.line1}
                              <br />
                              {order?.user?.address?.line2}
                              {order?.user?.address?.city}
                              <br />
                              {order?.user?.address?.state}, {order?.user?.address?.country}
                            </Typography>
                          ),
                        },
                        {
                          key: 'Date',
                          value: dayjs(order?.createdAt).subtract(3, 'hour').format('MMMM D, YYYY hh:mm A'),
                        },
                        // Added Table info
                        {
                          key: 'Table',
                          value: (
                            <Typography variant="subtitle2">
                              {order?.tableName || order?.table || '—'}
                            </Typography>
                          ),
                        },
                        {
                          key: 'Status',
                          value: <Chip icon={icon} label={label} size="small" variant="outlined" />,
                        },
                        {
                          key: 'Payment method',
                          value: order?.paymentMethod === 'card' ? (
                            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                              <Avatar
                                sx={{
                                  bgcolor: 'var(--mui-palette-background-paper)',
                                  boxShadow: 'var(--mui-shadows-8)',
                                }}
                              >
                                <Box
                                  component="img"
                                  src="/assets/payment-method-1.png"
                                  sx={{ borderRadius: '50px', height: 'auto', width: '35px' }}
                                />
                              </Avatar>
                              <div>
                                <Typography variant="body2">Mastercard</Typography>
                                <Typography color="text.secondary" variant="body2">
                                  **** {order?.cardLast4}
                                </Typography>
                              </div>
                            </Stack>
                          ) : (
                            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                              <Avatar
                                sx={{
                                  color: 'white',
                                }}
                              >
                                <MoneyIcon fontSize="var(--Icon-fontSize)" />
                              </Avatar>
                              <div>
                                <Typography variant="body2">Espèces</Typography>
                                <Typography color="text.secondary" variant="body2">
                                  Paiement en liquide
                                </Typography>
                              </div>
                            </Stack>
                          ),
                        },
                      ].map((item) => (
                        <PropertyItem key={item.key} name={item.key} value={item.value} />
                      ))}
                    </PropertyList>
                  </Card>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
