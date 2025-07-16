'use client';

import { Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function Example() {
  const GradientButton = styled(Button)(({ theme }) => ({
    background: theme.gradients?.homepageCTA,
    color: '#fff',
    padding: '0.75rem 2rem',
    borderRadius: '2rem',
    textTransform: 'none',
    fontWeight: 600,
    fontFamily: `'Cabinet Grotesk', sans-serif`,
    '&:hover': {
      opacity: 0.9,
    },
  }));

  const GradientButton2 = styled(Button)(({ theme }) => ({
    background: theme.gradients?.modalCTAActive,
    color: '#fff',
    padding: '0.75rem 2rem',
    borderRadius: '2rem',
    textTransform: 'none',
    fontWeight: 600,
    fontFamily: `'Cabinet Grotesk', sans-serif`,
    '&:hover': {
      opacity: 0.9,
    },
  }));

  const DisabledGradientButton = styled(Button)(({ theme }) => ({
    background: theme.gradients?.modalCTADisabled,
    color: theme.palette.text.disabled,
    padding: '0.75rem 2rem',
    borderRadius: '2rem',
    textTransform: 'none',
    fontWeight: 600,
    fontFamily: `'Cabinet Grotesk', sans-serif`,
  }));

  return (
    <Stack spacing={4} sx={{ padding: 4 }}>

      <Typography variant="h1">H1 Cabinet Grotesk</Typography>
      <Typography variant="h2">H2 Cabinet Grotesk</Typography>
      <Typography variant="h3">H3 Cabinet Grotesk</Typography>
      <Typography variant="h4">H4 Cabinet Grotesk</Typography>
      <Typography variant="h5">H5 Cabinet Grotesk</Typography>
      <Typography variant="h6">H6 Cabinet Grotesk</Typography>
      <Typography variant="body1">Body1 IBM Plex Sans</Typography>
      <Typography variant="body2">Body2 IBM Plex Sans</Typography>
      <Typography variant="caption">Caption IBM Plex Sans</Typography>
      <Typography variant="subtitle2">Subtitle2 Inter</Typography>
      <Typography variant="button">Button IBM Plex Sans</Typography>


      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary">Primary</Button>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="contained" color="info">Info</Button>
        <Button variant="contained" disabled>Disabled</Button>
      </Stack>


      <Stack direction="row" spacing={2}>
        <GradientButton>CTA Gradient</GradientButton>
        <GradientButton2>modalCTAActive</GradientButton2>
        <DisabledGradientButton disabled>Disabled Gradient</DisabledGradientButton>
      </Stack>
    </Stack>
  );
}
