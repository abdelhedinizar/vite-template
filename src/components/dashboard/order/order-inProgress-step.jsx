'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

const categoryOptions = [
  { title: 'Processing', description: 'The order is currently being prepared by the kitchen.', value: 'In Progress' },
  {
    title: 'Cancelled',
    description: 'The order has been cancelled and will not be processed.',
    value: 'Cancelled',
    sensitive: true,
  },
];

export function OrderInProgressStep({ onNext, onCancel }) {
  const [category, setCategory] = React.useState(categoryOptions[0].value);

  const handleCategoryChange = React.useCallback((newCategory) => {
    setCategory(newCategory);
  }, []);

  const handleNextClick = React.useCallback(() => {
    if (category === 'Cancelled') {
      onCancel();
    } else {
      onNext();
    }
  }, [onNext, onCancel, category]);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6">I&apos;m placing the order to...</Typography>
      </div>
      <RadioGroup
        onChange={(event) => {
          handleCategoryChange(event.target.value);
        }}
        sx={{
          '& .MuiFormControlLabel-root': {
            border: '1px solid var(--mui-palette-divider)',
            borderRadius: 1,
            gap: 2,
            p: 2,
            position: 'relative',
            '&::before': {
              borderRadius: 'inherit',
              bottom: 0,
              content: '" "',
              left: 0,
              pointerEvents: 'none',
              position: 'absolute',
              right: 0,
              top: 0,
            },
            '&.Mui-disabled': { bgcolor: 'var(--mui-palette-background-level1)' },
          },
        }}
        value={category}
      >
        {categoryOptions.map((option) => (
          <FormControlLabel
            control={<Radio />}
            disabled={option.disabled}
            key={option.value}
            label={
              <div>
                <Typography
                  sx={{
                    color: option.sensitive ? 'var(--mui-palette-error-dark)' : 'var(--mui-palette-text-primary)',
                  }}
                  variant="inherit"
                >
                  {option.title}
                </Typography>
                <Typography
                  sx={{
                    color: option.sensitive ? 'var(--mui-palette-error-main)' : 'var(--mui-palette-text-secondary)',
                  }}
                  variant="body2"
                >
                  {option.description}
                </Typography>
              </div>
            }
            sx={{
              ...(option.value === category && {
                '&::before': { boxShadow: '0 0 0 2px var(--mui-palette-primary-main)' },
              }),
            }}
            value={option.value}
          />
        ))}
      </RadioGroup>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button endIcon={<ArrowRightIcon />} onClick={handleNextClick} variant="contained">
          Continue
        </Button>
      </Box>
    </Stack>
  );
}
