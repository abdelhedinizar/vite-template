import * as React from 'react';
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
import { dayjs } from '@/lib/dayjs';
import { toast } from '@/components/core/toaster';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';

const metadata = { title: `List | Customers | Dashboard | ${config.site.name}` };

export function Page() {
  const { email, phone, sortDir, status } = useExtractSearchParams();
  const [customers, setCustomers] = React.useState([]);
  const [reload, setReload] = React.useState(false);

  const handleDeleteUser = React.useCallback(async (selection) => {
    const token = localStorage.getItem('custom-auth-token');
    const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/users`, {
      data: {
        ids: Array.from(selection.selected),
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 204) {
      toast.success('User Deleted successfully');
    } else {
      toast.error('Failed to delete customer');
    }
    setReload((prev) => !prev);
  }, []);

  const fetchCustomers = async () => {
    const token = localStorage.getItem('custom-auth-token');
    const customersAndStaff = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCustomers(
      customersAndStaff.data.data.users.map((user) => {
        return {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
          phone: `${user?.phoneNumber?.dialCode} ${user?.phoneNumber?.number}`,
          role: user?.role,
          status: 'active',
          createdAt: dayjs(user.createdAt).toDate(),
        };
      })
    );
  };

  React.useEffect(() => {
    fetchCustomers();
  }, [reload, applySort, applyFilters]);

  const sortedCustomers = applySort(customers, sortDir);
  const filteredCustomers = applyFilters(sortedCustomers, { email, phone, status });

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
              <Typography variant="h4">Customers and Staff</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button startIcon={<PlusIcon />} variant="contained">
                Add
              </Button>
            </Box>
          </Stack>
          <CustomersSelectionProvider customers={filteredCustomers}>
            <Card>
              <CustomersFilters
                filters={{ email, phone, status }}
                sortDir={sortDir}
                customers={filteredCustomers}
                onDelete={handleDeleteUser}
              />
              <Divider />
              <Box sx={{ overflowX: 'auto' }}>
                <CustomersTable rows={filteredCustomers} />
              </Box>
              <Divider />
              <CustomersPagination count={filteredCustomers.length + 100} page={0} />
            </Card>
          </CustomersSelectionProvider>
        </Stack>
      </Box>
    </React.Fragment>
  );
}

function useExtractSearchParams() {
  const [searchParams] = useSearchParams();

  return {
    email: searchParams.get('email') || undefined,
    phone: searchParams.get('phone') || undefined,
    sortDir: searchParams.get('sortDir') || undefined,
    status: searchParams.get('status') || undefined,
  };
}

// Sorting and filtering has to be done on the server.

function applySort(row, sortDir) {
  return row.sort((a, b) => {
    if (sortDir === 'asc') {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

function applyFilters(row, { email, phone, status }) {
  return row.filter((item) => {
    if (email) {
      if (!item.email?.toLowerCase().includes(email.toLowerCase())) {
        return false;
      }
    }

    if (phone) {
      if (!item.phone?.toLowerCase().includes(phone.toLowerCase())) {
        return false;
      }
    }

    if (status) {
      if (item.status !== status) {
        return false;
      }
    }

    return true;
  });
}
