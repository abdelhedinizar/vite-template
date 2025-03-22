'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputAdornment, MenuItem, Select } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { RouterLink } from '@/components/core/link';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'Germany', value: 'de' },
  { label: 'Spain', value: 'es' },
];

const countryDialCodes = [
  { label: 'United States', code: '+1', flag: '/assets/flag-us.svg' },
  { label: 'Germany', code: '+49', flag: '/assets/flag-de.svg' },
  { label: 'Spain', code: '+34', flag: '/assets/flag-es.svg' },
  { label: 'France', code: '+33', flag: '/assets/flag-fr.svg' },
];

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(new Error('Error converting file to base64'));
    };
  });
}

const schema = zod
  .object({
    avatar: zod.string().optional(),
    firstname: zod.string().min(1, 'Name is required').max(50),
    lastname: zod.string().min(1, 'Name is required').max(50),
    email: zod.string().email('Must be a valid email').min(1, 'Email is required').max(255),
    phoneNumber: zod.object({
      number: zod.string().min(1, 'Phone is required').max(15),
      dialCode: zod.string().min(1, 'Dial code is required').max(3),
    }),
    password: zod.string().min(5, 'Password is required'),
    confirmPassword: zod.string().min(5, 'Confirm password is required').max(255),
    address: zod.object({
      country: zod.string().min(1, 'Country is required').max(255),
      state: zod.string().min(1, 'State is required').max(255),
      city: zod.string().min(1, 'City is required').max(255),
      zipCode: zod.string().min(1, 'Zip code is required').max(255),
      line1: zod.string().min(1, 'Street line 1 is required').max(255),
      line2: zod.string().max(255).optional(),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });

const defaultValues = {
  avatar: '',
  lastname: '',
  firstname: '',
  email: '',
  phoneNumber: { dialCode: '+33', number: '' },
  password: '',
  confirmPassword: '',
  address: { country: 'us', state: '', city: '', zipCode: '', line1: '', line2: '' },
  timezone: 'new_york',
  language: 'en',
  currency: 'USD',
};

export function CustomerCreateForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (_) => {
      try {
        _.role = 'Staff';
        const token = localStorage.getItem('custom-auth-token');
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/users`, _, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 201) {
          toast.success('Customer updated');
          navigate(paths.dashboard.customers.details(response.data.data.user._id));
        } else {
          toast.error('Failed to update customer');
        }
      } catch (err) {
        logger.error(err);
        toast.error('Something went wrong!');
      }
    },
    [navigate]
  );

  const avatarInputRef = React.useRef(null);
  const avatar = watch('avatar');

  const handleAvatarChange = React.useCallback(
    async (event) => {
      const file = event.target.files?.[0];

      if (file) {
        const url = await fileToBase64(file);
        setValue('avatar', url);
      }
    },
    [setValue]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={3}>
              <Typography variant="h6">Account information</Typography>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        border: '1px dashed var(--mui-palette-divider)',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        p: '4px',
                      }}
                    >
                      <Avatar
                        src={avatar}
                        sx={{
                          '--Avatar-size': '100px',
                          '--Icon-fontSize': 'var(--icon-fontSize-lg)',
                          alignItems: 'center',
                          bgcolor: 'var(--mui-palette-background-level1)',
                          color: 'var(--mui-palette-text-primary)',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <CameraIcon fontSize="var(--Icon-fontSize)" />
                      </Avatar>
                    </Box>
                    <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
                      <Typography variant="subtitle1">Avatar</Typography>
                      <Typography variant="caption">Min 400x400px, PNG or JPEG</Typography>
                      <Button
                        color="secondary"
                        onClick={() => {
                          avatarInputRef.current?.click();
                        }}
                        variant="outlined"
                      >
                        Select
                      </Button>
                      <input hidden onChange={handleAvatarChange} ref={avatarInputRef} type="file" />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="firstname"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.name)} fullWidth>
                        <InputLabel required>First Name</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.firstname ? <FormHelperText>{errors.firstname.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="lastname"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.name)} fullWidth>
                        <InputLabel required>Last Name</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.lastname ? <FormHelperText>{errors.lastname.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.email)} fullWidth>
                        <InputLabel required>Email address</InputLabel>
                        <OutlinedInput {...field} type="email" />
                        {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Controller
                      control={control}
                      name="phoneNumber.dialCode"
                      render={({ field }) => (
                        <FormControl sx={{ width: '160px' }}>
                          <InputLabel>Dial Code</InputLabel>
                          <Select {...field}>
                            {countryDialCodes.map((country) => (
                              <MenuItem key={country.code} value={country.code}>
                                {country.label} ({country.code})
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name="phoneNumber.number"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.phoneNumber?.number)} fullWidth>
                          <InputLabel>Phone Number</InputLabel>
                          <OutlinedInput
                            {...field}
                            startAdornment={
                              <InputAdornment position="start">{watch('phoneNumber.dialCode')}</InputAdornment>
                            }
                          />
                          {errors.phoneNumber?.number && (
                            <FormHelperText>{errors.phoneNumber.number.message}</FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.password)} fullWidth>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                          {...field}
                          endAdornment={
                            showPassword ? (
                              <EyeIcon
                                cursor="pointer"
                                fontSize="var(--icon-fontSize-md)"
                                onClick={() => {
                                  setShowPassword(false);
                                }}
                              />
                            ) : (
                              <EyeSlashIcon
                                cursor="pointer"
                                fontSize="var(--icon-fontSize-md)"
                                onClick={() => {
                                  setShowPassword(true);
                                }}
                              />
                            )
                          }
                          type={showPassword ? 'text' : 'password'}
                        />
                        {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.confirmPassword)} fullWidth>
                        <InputLabel>Confirm Password</InputLabel>
                        <OutlinedInput
                          {...field}
                          endAdornment={
                            showPassword ? (
                              <EyeIcon
                                cursor="pointer"
                                fontSize="var(--icon-fontSize-md)"
                                onClick={() => {
                                  setShowPassword(false);
                                }}
                              />
                            ) : (
                              <EyeSlashIcon
                                cursor="pointer"
                                fontSize="var(--icon-fontSize-md)"
                                onClick={() => {
                                  setShowPassword(true);
                                }}
                              />
                            )
                          }
                          type={showPassword ? 'text' : 'password'}
                        />
                        {errors.confirmPassword ? (
                          <FormHelperText>{errors.confirmPassword.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
            <Stack spacing={3}>
              <Typography variant="h6">Address information</Typography>
              <Grid container spacing={3}>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="address.country"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        getOptionLabel={(option) => option.label}
                        onChange={(_, value) => {
                          if (value) {
                            field.onChange(value.value);
                          }
                        }}
                        options={countryOptions}
                        renderInput={(params) => (
                          <FormControl error={Boolean(errors.billingAddress?.country)} fullWidth>
                            <InputLabel required>Country</InputLabel>
                            <OutlinedInput inputProps={params.inputProps} ref={params.InputProps.ref} />
                            {errors.billingAddress?.country ? (
                              <FormHelperText>{errors.billingAddress?.country?.message}</FormHelperText>
                            ) : null}
                          </FormControl>
                        )}
                        renderOption={(props, option) => (
                          <Option {...props} key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        )}
                        value={countryOptions.find((option) => option.value === field.value)}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="address.state"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.state)} fullWidth>
                        <InputLabel required>State</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.billingAddress?.state ? (
                          <FormHelperText>{errors.billingAddress?.state?.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="address.city"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.city)} fullWidth>
                        <InputLabel required>City</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.billingAddress?.city ? (
                          <FormHelperText>{errors.billingAddress?.city?.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="address.zipCode"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.zipCode)} fullWidth>
                        <InputLabel required>Zip code</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.billingAddress?.zipCode ? (
                          <FormHelperText>{errors.billingAddress?.zipCode?.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                >
                  <Controller
                    control={control}
                    name="address.line1"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.line1)} fullWidth>
                        <InputLabel required>Address</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.billingAddress?.line1 ? (
                          <FormHelperText>{errors.billingAddress?.line1?.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button color="secondary" component={RouterLink} href={paths.dashboard.customers.list}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create customer
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
