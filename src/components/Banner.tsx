import React from 'react';
import { Typography, Button } from '@mui/material';
const Banner = () => {
  return (
    <div className="relative h-[57vh] w-screen bg-[url('/images/banner-image.jpeg')] bg-cover bg-center bg-no-repeat text-left">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative ml-[20vw] w-[70%] pt-24 text-white">
        <Typography variant="h2" sx={{ marginTop: '10vh' }}>
          Navigate your new city with <br />
          <Typography variant="inherit" component="span" sx={{ color: 'primary.main' }}>
            confidence
          </Typography>
        </Typography>
        <Typography variant="body1">
          Get personalized guidance step by step checklists, and timeline <br />
          planning for setting into any city. Whether you're a tourist, student or <br />
          migrant
        </Typography>
        <Button variant="primary" sx={{ marginTop: '6px' }}>
          Try HelloCity
        </Button>
      </div>
    </div>
  );
};

export default Banner;
