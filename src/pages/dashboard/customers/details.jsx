import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { ShieldWarning as ShieldWarningIcon } from '@phosphor-icons/react/dist/ssr/ShieldWarning';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { RouterLink } from '@/components/core/link';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { Notifications } from '@/components/dashboard/customer/notifications';
import { Payments } from '@/components/dashboard/customer/payments';

const metadata = { title: `Details | Customers | Dashboard | ${config.site.name}` };

export function Page() {
  const { customerId } = useParams();
  const [user, setUser] = React.useState(null);
  const [relatedOrders, setRelatedOrders] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('custom-auth-token');
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/users/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUser(response.data.data.user);
          const relatedOrdersResponse = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BACK_API_URL}/orders?user=${customerId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (relatedOrdersResponse.status === 200) {
            setRelatedOrders(relatedOrdersResponse.data.data.orders);
          }
        }
      } catch (error) {
        alert('Error fetching user data. Please try again later.');
        setUser(null);
      }
    }
    fetchData();
  }, [customerId]);
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
                href={paths.dashboard.customers.list}
                sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                variant="subtitle2"
              >
                <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                {user?.role === 'Staff' ? 'Staff' : user?.role === 'admin' ? 'Staff' : 'Customers'}
              </Link>
            </div>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                <Avatar src="/assets/avatar-1.png" sx={{ '--Avatar-size': '64px' }}>
                  MV
                </Avatar>
                <div>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant="h5">{user?.name}</Typography>
                    <Chip
                      icon={<CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />}
                      label="Active"
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                  <Typography color="text.secondary" variant="body1">
                    {user?.email}
                  </Typography>
                </div>
              </Stack>
              <div>
                <Button endIcon={<CaretDownIcon />} variant="contained">
                  Action
                </Button>
              </div>
            </Stack>
          </Stack>
          <Grid container spacing={4}>
            <Grid
              size={{
                lg: 4,
                xs: 12,
              }}
            >
              <Stack spacing={4}>
                <Card>
                  <CardHeader
                    action={
                      <IconButton>
                        <PencilSimpleIcon />
                      </IconButton>
                    }
                    avatar={
                      <Avatar>
                        <UserIcon fontSize="var(--Icon-fontSize)" />
                      </Avatar>
                    }
                    title="Basic details"
                  />
                  <PropertyList
                    divider={<Divider />}
                    orientation="vertical"
                    sx={{ '--PropertyItem-padding': '12px 24px' }}
                  >
                    {[
                      { key: 'Role', value: <Chip label={user?.role} size="small" variant="soft" /> },
                      { key: 'Name', value: user?.name },
                      { key: 'Email', value: user?.email },
                      { key: 'Phone', value: user?.phoneNumber?.dialCode + user?.phoneNumber?.number },
                    ].map((item) => (
                      <PropertyItem key={item.key} name={item.key} value={item.value} />
                    ))}
                  </PropertyList>
                </Card>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <ShieldWarningIcon fontSize="var(--Icon-fontSize)" />
                      </Avatar>
                    }
                    title="Security"
                  />
                  <CardContent>
                    <Stack spacing={1}>
                      <div>
                        <Button color="error" variant="contained">
                          Delete account
                        </Button>
                      </div>
                      <Typography color="text.secondary" variant="body2">
                        A deleted customer cannot be restored. All data will be permanently removed.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid
              size={{
                lg: 8,
                xs: 12,
              }}
            >
              <Stack spacing={4}>
                <Payments
                  ordersValue={relatedOrders
                    .filter((order) => order.paymentStatus === 'unpaid' || order.paymentStatus === 'paid')
                    .reduce((acc, order) => acc + order.totalPrice, 0)}
                  payments={relatedOrders.map((order) => {
                    return {
                      currency: 'EUR',
                      amount: order.totalPrice,
                      invoiceId: `INV-${order.sequenceNumber}`,
                      status: order.status,
                      createdAt: dayjs().subtract(5, 'minute').subtract(1, 'hour').toDate(order.createdAt),
                    };
                  })}
                  refundsValue={relatedOrders
                    .filter((order) => order.paymentStatus === 'refunded')
                    .reduce((acc, order) => acc + order.totalPrice, 0)}
                  totalOrders={relatedOrders.length}
                />
                <Notifications
                  notifications={[
                    {
                      id: 'EV-002',
                      type: 'Refund request approved',
                      status: 'pending',
                      createdAt: dayjs().subtract(34, 'minute').subtract(5, 'hour').subtract(3, 'day').toDate(),
                    },
                    {
                      id: 'EV-001',
                      type: 'Order confirmation',
                      status: 'delivered',
                      createdAt: dayjs().subtract(49, 'minute').subtract(11, 'hour').subtract(4, 'day').toDate(),
                    },
                  ]}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
