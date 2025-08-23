import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';

function PlanIcon({ name }) {
  const icons = {
    'ai-lite': (
      <svg fill="none" height="52" viewBox="0 0 52 52" width="52">
        <rect fill="var(--mui-palette-primary-main)" height="52" rx="8" width="52" />
        <path
          d="M26 16C23.8 16 22 17.8 22 20S23.8 24 26 24S30 22.2 30 20S28.2 16 26 16ZM26 32C23.8 32 22 33.8 22 36S23.8 40 26 40S30 38.2 30 36S28.2 32 26 32ZM18 24C15.8 24 14 25.8 14 28S15.8 32 18 32S22 30.2 22 28S20.2 24 18 24ZM34 24C31.8 24 30 25.8 30 28S31.8 32 34 32S38 30.2 38 28S36.2 24 34 24Z"
          fill="white"
        />
      </svg>
    ),
    'ai-standard': (
      <svg fill="none" height="52" viewBox="0 0 52 52" width="52">
        <rect fill="var(--mui-palette-primary-main)" height="52" rx="8" width="52" />
        <path
          d="M26 14L29.09 20.26L36 21L29.09 21.74L26 28L22.91 21.74L16 21L22.91 20.26L26 14ZM32 30L33.5 33.5L37 35L33.5 36.5L32 40L30.5 36.5L27 35L30.5 33.5L32 30ZM20 30L21.5 33.5L25 35L21.5 36.5L20 40L18.5 36.5L15 35L18.5 33.5L20 30Z"
          fill="white"
        />
      </svg>
    ),
    'delivery': (
      <svg fill="none" height="52" viewBox="0 0 52 52" width="52">
        <rect fill="var(--mui-palette-primary-main)" height="52" rx="8" width="52" />
        <path
          d="M32 16H20C18.9 16 18 16.9 18 18V30C18 31.1 18.9 32 20 32H22C22 34.2 23.8 36 26 36S30 34.2 30 32H32C33.1 32 34 31.1 34 30V18C34 16.9 33.1 16 32 16ZM26 34C24.9 34 24 33.1 24 32S24.9 30 26 30S28 30.9 28 32S27.1 34 26 34ZM32 28H30C30 25.8 28.2 24 26 24S22 25.8 22 28H20V18H32V28Z"
          fill="white"
        />
      </svg>
    ),
  };

  return icons[name] || icons['ai-lite'];
}

export function AddonPlan({ currency, description, id, features, name, price, priceNote }) {
  const [isSelected, setIsSelected] = React.useState(false);

  const handleToggle = () => {
    setIsSelected(!isSelected);
  };

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      border: isSelected ? '2px solid #000' : '1px solid var(--mui-palette-divider)',
      transition: 'all 0.2s ease-in-out'
    }}>
      <Stack spacing={2} sx={{ p: 3 }}>
        <div>
          <Box sx={{ height: '52px', width: '52px' }}>
            <PlanIcon name={id} />
          </Box>
        </div>
        <Box sx={{ alignItems: 'flex-end', display: 'flex', gap: 1 }}>
          <Typography variant="h4">
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency,
              maximumFractionDigits: price === 0 ? 0 : 2,
            }).format(price)}
          </Typography>
          <Typography color="text.secondary" variant="subtitle2">
            /mois
          </Typography>
        </Box>
        {priceNote && (
          <Typography color="text.secondary" variant="caption">
            {priceNote}
          </Typography>
        )}
        <Typography variant="h6">{name}</Typography>
        <Typography color="text.secondary" variant="body2">
          {description}
        </Typography>
      </Stack>
      <Divider />
      <Stack spacing={6} sx={{ display: 'flex', flex: '1 1 auto', p: 3 }}>
        <Stack spacing={2} sx={{ flex: '1 1 auto' }}>
          {features.map((feature) => (
            <Stack direction="row" key={feature} spacing={1} sx={{ alignItems: 'center', display: 'flex' }}>
              <Box sx={{ display: 'flex' }}>
                <CheckIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
              </Box>
              <Typography variant="subtitle2">{feature}</Typography>
            </Stack>
          ))}
        </Stack>
        <Button
          variant={isSelected ? "contained" : "outlined"}
          color={isSelected ? "inherit" : "secondary"}
          onClick={handleToggle}
          sx={{
            bgcolor: isSelected ? '#000' : 'transparent',
            color: isSelected ? 'white' : 'inherit',
            '&:hover': {
              bgcolor: isSelected ? '#333' : 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          {isSelected ? '✓ Ajouté' : 'Ajouter'}
        </Button>
      </Stack>
    </Card>
  );
}
