'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/custom/client';
import { useUser } from '@/hooks/use-user';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';
import { toast } from '@/components/core/toaster';

const oAuthProviders = [
  { id: 'google', name: 'Google', logo: '/assets/logo-google.svg' },
  { id: 'discord', name: 'Discord', logo: '/assets/logo-discord.svg' },
];

const schema = zod.object({
  email: zod.string().min(1, { message: "L'email est requis" }).email(),
  password: zod.string().min(1, { message: 'Le mot de passe est requis' }),
});

const defaultValues = { email: '', password: '' };

export function SignInForm() {
  const { checkSession } = useUser();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState();

  const [isPending, setIsPending] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const onAuth = React.useCallback(async (providerId) => {
    setIsPending(true);

    const { error } = await authClient.signInWithOAuth({ provider: providerId });

    if (error) {
      setIsPending(false);
      toast.error(error);
      return;
    }

    setIsPending(false);

    // Redirection vers le fournisseur OAuth
  }, []);


  const onContinueAsGuest = React.useCallback(async () => {
    setIsPending(true);

    const { error } = await authClient.continueAsGuest();

    if (error) {
      setIsPending(false);
      toast.error(error);
      return;
    }

    await checkSession?.();
  }, [checkSession]);


  const onSubmit = React.useCallback(
    async (values) => {
      setIsPending(true);

      const { error } = await authClient.signInWithPassword(values);

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        return;
      }

      // Rafraîchir l'état d'authentification
      await checkSession?.();
      const redirectTo = sessionStorage.getItem('post-login-redirect');
      if (redirectTo && redirectTo.startsWith('/')) {
        sessionStorage.removeItem('post-login-redirect');
        navigate(redirectTo);
        return;
      }
      navigate(paths.dashboard.home);
    },
    [checkSession, navigate, setError]
  );

  return (
    <Stack spacing={4}>
      <div>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
        </Box>
      </div>
      <Stack spacing={1}>
        <Typography variant="h5">Connexion</Typography>
        <Typography color="text.secondary" variant="body2">
          Vous n'avez pas de compte ?{' '}
          <Link component={RouterLink} href={paths.auth.custom.signUp} variant="subtitle2">
            S'inscrire
          </Link>
        </Typography>
      </Stack>
      <Stack spacing={3}>
        <Stack spacing={2}>
          {oAuthProviders.map((provider) => (
            <Button
              color="secondary"
              disabled={isPending}
              endIcon={<Box alt="" component="img" height={24} src={provider.logo} width={24} />}
              key={provider.id}
              onClick={() => {
                onAuth(provider.id).catch(() => {
                  // noop
                });
              }}
              variant="outlined"
            >
              Continuer avec {provider.name}
            </Button>
          ))}
        </Stack>
        <Divider>ou</Divider>
        <Stack spacing={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.email)}>
                    <InputLabel>Adresse email</InputLabel>
                    <OutlinedInput {...field} type="email" />
                    {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.password)}>
                    <InputLabel>Mot de passe</InputLabel>
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
              {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
              <Button disabled={isPending} type="submit" variant="contained">
                Se connecter
              </Button>
            </Stack>
          </form>
          <div>
            <Link component={RouterLink} href={paths.auth.custom.resetPassword} variant="subtitle2">
              Mot de passe oublié ?
            </Link>
          </div>
          <Divider>ou</Divider>
          <Button
            color="secondary"
            variant="outlined"
            disabled={isPending}
            onClick={onContinueAsGuest}
          >
            Continuer en tant qu'invité
          </Button>
        </Stack>
      </Stack>
      <Alert color="warning">
        Utilisez{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          nizar.abdelhedi93@gmail.com
        </Typography>{' '}
        avec le mot de passe{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          nizar
        </Typography>
      </Alert>
    </Stack>
  );
}
