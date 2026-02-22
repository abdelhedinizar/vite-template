import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { Password as PasswordIcon } from '@phosphor-icons/react/dist/ssr/Password';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import axios from 'axios';

import { toast } from '@/components/core/toaster';

export function PasswordForm() {
  const [values, setValues] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!values.oldPassword || !values.newPassword || !values.confirmNewPassword) {
      setError('Tous les champs sont requis.');
      return;
    }

    if (values.newPassword !== values.confirmNewPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('custom-auth-token');
      await axios.patch(
        `${import.meta.env.VITE_REACT_APP_BACK_API_URL}/users/changePassword`,
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('Mot de passe mis à jour.');
      setValues({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      toast.error('Impossible de mettre à jour le mot de passe.');
      setError('Ancien mot de passe incorrect ou erreur serveur.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <PasswordIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Changer le mot de passe"
      />
      <CardContent>
        <Stack spacing={3}>
          <Stack component="form" onSubmit={handleSubmit} spacing={3}>
            <FormControl>
              <InputLabel>Ancien mot de passe</InputLabel>
              <OutlinedInput
                name="oldPassword"
                type={showOldPassword ? 'text' : 'password'}
                value={values.oldPassword}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    {showOldPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={() => {
                          setShowOldPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={() => {
                          setShowOldPassword(true);
                        }}
                      />
                    )}
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl>
              <InputLabel>Nouveau mot de passe</InputLabel>
              <OutlinedInput
                name="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={values.newPassword}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    {showNewPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={() => {
                          setShowNewPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={() => {
                          setShowNewPassword(true);
                        }}
                      />
                    )}
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl>
              <InputLabel>Confirmer le nouveau mot de passe</InputLabel>
              <OutlinedInput
                name="confirmNewPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={values.confirmNewPassword}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    {showConfirmPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={() => {
                          setShowConfirmPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={() => {
                          setShowConfirmPassword(true);
                        }}
                      />
                    )}
                  </InputAdornment>
                }
              />
            </FormControl>
            {error ? <FormHelperText error>{error}</FormHelperText> : null}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Mettre à jour
              </Button>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
