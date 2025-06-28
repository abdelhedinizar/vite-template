'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

import { NoSsr } from '@/components/core/no-ssr';

const HEIGHT = 60;
const WIDTH = 60;

export function Logo({ color = 'dark', emblem, height = HEIGHT, width = WIDTH }) {
  let url;

  if (emblem) {
    url = color === 'light' ? '/assets/servy_logo.png' : '/assets/logo-emblem--dark.svg';
  } else {
    url = color === 'light' ? '/assets/servy_logo.png' : '/assets/servy_logo_dark.png';
  }

  return <Box alt="logo" component="img" height={height} src={url} width={width} />;
}

export function DynamicLogo({ colorDark = 'light', colorLight = 'dark', height = HEIGHT, width = WIDTH, ...props }) {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colorDark : colorLight;

  return (
    <NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
      <Logo color={color} height={height} width={width} {...props} />
    </NoSsr>
  );
}
