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
import axios from 'axios';

import { OrderPreview } from './order-completed-preview';
import { OrderDispatchedStep } from './order-dispatched-step';
import { OrderInProgressStep } from './order-inProgress-step';
import { OrderProcessingStep } from './order-processing-step';

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

export function OrderManageForm({ order }) {
  const getStatusStep = (status) => {
    switch (status) {
      case 'inProgress':
        return 0;
      case 'Processing':
        return 1;
      case 'Dispatched':
        return 2;
      case 'completed':
        return 3;
      default:
        return 0;
    }
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(order?.status === 'completed');

  const stepsTitles = [
    {
      active: {
        title: 'Order Received 🛒',
      },
      completed: {
        title: 'Order Processed ✅',
      },
    },
    {
      active: {
        title: 'In the Kitchen 👨🔪',
      },
      completed: {
        title: 'Cooking Completed 🍳🎯',
      },
    },
    {
      active: {
        title: 'Ready to Serve 🍽️',
      },
      completed: {
        title: 'Meal Enjoyed! 😊',
      },
    },
  ];

  React.useEffect(() => {
    if (order?.status) {
      setActiveStep(getStatusStep(order.status));
    }
  }, [order?.status]);

  const changeOrderStatus = async (status) => {
    const token = localStorage.getItem('custom-auth-token');
    const orderResponse = await axios.patch(
      `${import.meta.env.VITE_REACT_APP_BACK_API_URL}/orders/${order?._id}`,
      {
        status,
      },
      {
        headers: {
          'Content-Type': 'application/json', // Set the content type
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return orderResponse;
  };

  const handleStepChange = (newStep) => {
    switch (newStep) {
      case 0:
        changeOrderStatus('inProgress');
        break;
      case 1:
        changeOrderStatus('Processing');
        break;
      case 2:
        changeOrderStatus('Dispatched');
        break;
      default:
        changeOrderStatus('inProgress');
    }
  };
  const handleNext = React.useCallback(() => {
    setActiveStep((prevState) => {
      const newStep = prevState + 1;
      handleStepChange(newStep);
      return newStep;
    });
  }, [order, handleStepChange]);

  const handleBack = React.useCallback(() => {
    setActiveStep((prevState) => {
      const newStep = prevState - 1;
      handleStepChange(newStep);
      return newStep;
    });
    handleStepChange();
  }, [order, handleStepChange]);

  const handleComplete = React.useCallback(() => {
    setIsComplete(true);
    changeOrderStatus('completed');
  }, [order, handleStepChange]);

  const steps = React.useMemo(() => {
    return [
      {
        label: activeStep < 1 ? stepsTitles[0].active.title : stepsTitles[0].completed.title,
        content: <OrderInProgressStep onBack={handleBack} onNext={handleNext} />,
      },
      {
        label: activeStep < 2 ? stepsTitles[1].active.title : stepsTitles[1].completed.title,
        content: <OrderProcessingStep onBack={handleBack} onNext={handleNext} />,
      },
      {
        label: activeStep < 3 ? stepsTitles[2].active.title : stepsTitles[2].completed.title,
        content: <OrderDispatchedStep onBack={handleBack} onNext={handleComplete} />,
      },
    ];
  }, [activeStep, getStatusStep, handleBack, handleNext, handleComplete]);

  if (isComplete) {
    return <OrderPreview order={order} />;
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
