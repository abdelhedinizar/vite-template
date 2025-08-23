import * as React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';

export function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    companySize: '1-10',
    message: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      companySize: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire");
      }
      setSuccess(true);
      navigate(paths.home, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid size={{ sm: 6, xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel required>Nom</InputLabel>
            <OutlinedInput name="name" value={formData.name} onChange={handleChange} />
          </FormControl>
        </Grid>
        <Grid size={{ sm: 6, xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel required>Restaurant</InputLabel>
            <OutlinedInput name="companyName" value={formData.companyName} onChange={handleChange} />
          </FormControl>
        </Grid>
        <Grid size={{ sm: 6, xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel required>Adresse e-mail</InputLabel>
            <OutlinedInput name="email" type="email" value={formData.email} onChange={handleChange} />
          </FormControl>
        </Grid>
        <Grid size={{ sm: 6, xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel required>Numéro de téléphone</InputLabel>
            <OutlinedInput name="phone" value={formData.phone} onChange={handleChange} />
          </FormControl>
        </Grid>
        <Grid size={{ sm: 6, xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel>Taille du restaurant</InputLabel>
            <Select native name="companySize" value={formData.companySize} onChange={handleSelectChange}>
              <option value="1-10">1-10</option>
              <option value="11-30">11-30</option>
              <option value="31-50">31-50</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <InputLabel>Message</InputLabel>
            <OutlinedInput name="message" multiline minRows={3} value={formData.message} onChange={handleChange} />
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Envoi en cours...' : 'Discutons-en'}
      </Button>
      {success && <Typography color="success.main">Votre message a été envoyé avec succès !</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Typography color="text.secondary" variant="body2">
        En soumettant ce formulaire, vous acceptez notre{' '}
        <Link color="text.primary" underline="always" variant="subtitle2">
          politique de confidentialité
        </Link>{' '}
        et notre{' '}
        <Link color="text.primary" underline="always" variant="subtitle2">
          politique relative aux cookies
        </Link>
        .
      </Typography>
    </Stack>
  );
}
