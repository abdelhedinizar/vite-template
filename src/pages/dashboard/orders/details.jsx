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
import { HourglassMedium as HourglassMediumIcon } from '@phosphor-icons/react/dist/ssr';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { Minus as MinusIcon } from '@phosphor-icons/react/dist/ssr/Minus';
import { ShoppingCartSimple as ShoppingCartSimpleIcon } from '@phosphor-icons/react/dist/ssr/ShoppingCartSimple';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';
import { XCircle as XCircleIcon } from '@phosphor-icons/react/dist/ssr/XCircle';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { RouterLink } from '@/components/core/link';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { EventsTimeline } from '@/components/dashboard/order/events-timeline';
import { LineItemsTable } from '@/components/dashboard/order/line-items-table';

const metadata = { title: `Details | Orders | Dashboard | ${config.site.name}` };

const events = [
  {
    id: 'EV-004',
    createdAt: dayjs().subtract(3, 'hour').toDate(),
    type: 'note_added',
    author: { name: 'Fran Perez', avatar: '/assets/avatar-5.png' },
    note: 'Customer states that the products have been damaged by the courier.',
  },
  {
    id: 'EV-003',
    createdAt: dayjs().subtract(12, 'hour').toDate(),
    type: 'shipment_notice',
    description: 'Left the package in front of the door',
  },
  {
    id: 'EV-002',
    createdAt: dayjs().subtract(18, 'hour').toDate(),
    type: 'items_shipped',
    carrier: 'USPS',
    trackingNumber: '940011189',
  },
  { id: 'EV-001', createdAt: dayjs().subtract(21, 'hour').toDate(), type: 'order_created' },
];

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
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { label, icon } = mapping[order?.status] ?? { label: 'Unknown', icon: null };

  React.useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const orderResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/orders/${orderId}`);
        setOrder(orderResponse.data.data.order);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, []);

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
                          {
                            key: 'Status',
                            value: <Chip icon={icon} label={label} size="small" variant="outlined" />,
                          },
                          {
                            key: 'Payment method',
                            value: (
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
                            ),
                          },
                        ].map((item) => (
                          <PropertyItem key={item.key} name={item.key} value={item.value} />
                        ))}
                      </PropertyList>
                    </Card>
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
                          <LineItemsTable rows={order.dishes} />
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
                      <TimerIcon fontSize="var(--Icon-fontSize)" />
                    </Avatar>
                  }
                  title="Timeline"
                />
                <CardContent>
                  <EventsTimeline events={events} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
