'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';

import { JobCategoryStep } from '../jobs/job-category-step';
import { JobDescriptionStep } from '../jobs/job-description-step';
import { JobDetailsStep } from '../jobs/job-details-step';
import { JobPreview } from '../jobs/job-preview';

function StepIcon({ active, completed, icon }) {
  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        ...(highlight && {
          bgcolor: 'var(--mui-palette-primary-main)',
          color: 'var(--mui-palette-primary-contrastText)',
        }),
      }}
      variant="rounded"
    >
      {completed ? <CheckIcon /> : icon}
    </Avatar>
  );
}

export function OrderManageForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);

  const handleNext = React.useCallback(() => {
    setActiveStep((prevState) => prevState + 1);
  }, []);

  const handleBack = React.useCallback(() => {
    setActiveStep((prevState) => prevState - 1);
  }, []);

  const handleComplete = React.useCallback(() => {
    setIsComplete(true);
  }, []);

  const steps = React.useMemo(() => {
    return [
      { label: 'Cuisine en Cours 🧑🍳', content: <JobCategoryStep onBack={handleBack} onNext={handleNext} /> },
      { label: 'Contrôle Qualité 🔍', content: <JobDetailsStep onBack={handleBack} onNext={handleNext} /> },
      { label: 'Prête à Servir 🍽️', content: <JobDescriptionStep onBack={handleBack} onNext={handleComplete} /> },
    ];
  }, [handleBack, handleNext, handleComplete]);

  if (isComplete) {
    return <JobPreview />;
  }

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      sx={{
        '& .MuiStepConnector-root': { ml: '19px' },
        '& .MuiStepConnector-line': { borderLeft: '2px solid var(--mui-palette-divider)' },
        '& .MuiStepLabel-iconContainer': { paddingRight: '16px' },
        '& .MuiStepContent-root': { borderLeft: '2px solid var(--mui-palette-divider)', ml: '19px' },
        '& .MuiStep-root:last-of-type .MuiStepContent-root': { borderColor: 'transparent' },
      }}
    >
      {steps.map((step) => {
        return (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepIcon}>
              <Typography variant="overline">{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Box sx={{ px: 2, py: 3 }}>{step.content}</Box>
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
}
