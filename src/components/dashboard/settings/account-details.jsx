'use client';

import * as React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import axios from 'axios';

import { Option } from '@/components/core/option';

const countries = [
  { code: 'US', label: 'United States' },
  { code: 'FR', label: 'France' },
  { code: 'DE', label: 'Germany' },
  { code: 'ES', label: 'Spain' },
  { code: 'IN', label: 'India' },
  { code: 'CA', label: 'Canada' },
  { code: 'GB', label: 'United Kingdom' },
  // Add more countries as needed
];

export function AccountDetails({ user }) {
  const [selectedCountry, setSelectedCountry] = React.useState(
    countries.find((country) => country.code === user.address?.country) || null
  );
  const [updatedUser, setUpdatedUser] = React.useState(user);

  const flag = {
    '+1': '/assets/flag-us.svg',
    '+33': '/assets/flag-fr.svg',
    '+34': '/assets/flag-es.svg',
    '+49': '/assets/flag-de.svg',
  };

  const handleInputChange = (field, value) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // Handle address changes
  const handleAddressChange = (field, value) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [field]: value,
      },
    }));
  };

  // Handle phone number changes
  const handlePhoneNumberChange = (field, value) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      phoneNumber: {
        ...prevUser.phoneNumber,
        [field]: value,
      },
    }));
  };

  // Handle country change in the autocomplete
  const handleCountryChange = (event, newValue) => {
    setSelectedCountry(newValue);
    handleAddressChange('country', newValue?.code || '');
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('custom-auth-token');

      const payload = {
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address,
      };

      // Send the request to update the user
      const response = await axios.patch(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/users/me`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Failed to update user:', error.response?.data?.message || error.message);
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <UserIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Basic details"
      />
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                border: '1px dashed var(--mui-palette-divider)',
                borderRadius: '50%',
                display: 'inline-flex',
                p: '4px',
              }}
            >
              <Box sx={{ borderRadius: 'inherit', position: 'relative' }}>
                <Box
                  sx={{
                    alignItems: 'center',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: 'inherit',
                    bottom: 0,
                    color: 'var(--mui-palette-common-white)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    left: 0,
                    opacity: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    zIndex: 1,
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <CameraIcon fontSize="var(--icon-fontSize-md)" />
                    <Typography color="inherit" variant="subtitle2">
                      Select
                    </Typography>
                  </Stack>
                </Box>
                <Avatar src={updatedUser.avatar} sx={{ '--Avatar-size': '100px' }} />
              </Box>
            </Box>
            <Button color="secondary" size="small">
              Remove
            </Button>
          </Stack>
          <Stack spacing={2}>
            <FormControl disabled>
              <InputLabel>Full name</InputLabel>
              <OutlinedInput defaultValue={updatedUser.name} name="fullName" />
            </FormControl>
            <FormControl disabled>
              <InputLabel>Email address</InputLabel>
              <OutlinedInput name="email" type="email" value={updatedUser.email} />
              <FormHelperText>
                Please <Link variant="inherit">contact us</Link> to change your email
              </FormHelperText>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <FormControl sx={{ width: '160px' }}>
                <InputLabel>Dial code</InputLabel>
                <Select
                  name="countryCode"
                  startAdornment={
                    <InputAdornment position="start">
                      <Box
                        alt="Spain"
                        component="img"
                        src={flag[updatedUser.phoneNumber?.dialCode]}
                        sx={{ display: 'block', height: '20px', width: 'auto' }}
                      />
                    </InputAdornment>
                  }
                  value={updatedUser.phoneNumber?.dialCode}
                  onChange={(e) => handlePhoneNumberChange('dialCode', e.target.value)}
                >
                  <Option value="+1">United States</Option>
                  <Option value="+49">Germany</Option>
                  <Option value="+34">Spain</Option>
                  <Option value="+33">France</Option>
                </Select>
              </FormControl>
              <FormControl sx={{ flex: '1 1 auto' }}>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput
                  defaultValue={updatedUser.phoneNumber?.number}
                  name="phone"
                  onChange={(e) => handlePhoneNumberChange('number', e.target.value)}
                />
              </FormControl>
            </Stack>
            <FormControl>
              <InputLabel>Address Line 1</InputLabel>
              <OutlinedInput
                defaultValue={updatedUser.address?.line1}
                name="line1"
                onChange={(e) => handleAddressChange('line1', e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Address Line 2</InputLabel>
              <OutlinedInput
                defaultValue={updatedUser.address?.line2}
                name="line2"
                onChange={(e) => handleAddressChange('line2', e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>City</InputLabel>
              <OutlinedInput
                defaultValue={updatedUser.address?.city}
                name="city"
                onChange={(e) => handleAddressChange('city', e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>State</InputLabel>
              <OutlinedInput
                defaultValue={updatedUser.address?.state}
                name="state"
                onChange={(e) => handleAddressChange('state', e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Autocomplete
                options={countries}
                getOptionLabel={(option) => option.label}
                value={selectedCountry}
                onChange={handleCountryChange}
                renderInput={(params) => <TextField {...params} label="Country" variant="outlined" fullWidth />}
              />
            </FormControl>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button color="secondary">Cancel</Button>
        <Button variant="contained" onClick={handleSaveChanges}>
          Save changes
        </Button>
      </CardActions>
    </Card>
  );
}
