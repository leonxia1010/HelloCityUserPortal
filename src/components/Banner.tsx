import React from 'react';
import { Typography, Button } from '@mui/material';
import { Trans } from '@lingui/react';
import styles from './BannerCustom.module.scss';

type Props = {
  isCustom?: boolean;
};

const Banner = ({ isCustom }: Props) => {
  if (isCustom) {
    return (
      <div className={styles['banner-container-custom']}>
        <div className={styles['banner-overlay-custom']} />
        <div className={styles['banner-content-custom']}>
          <Typography variant="h2" sx={{ marginTop: '12vh', fontWeight: 'bold' }}>
            <Trans id="banner.title1">Navigate your new city with</Trans>
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
            <Trans id="banner.title2">Confidence</Trans>
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            <Trans id="banner.paragraph">
              Get personalized guidance step by step checklists, and timeline planning for setting into any city. Whether you're a tourist, student or migrant.
            </Trans>
          </Typography>

          <Button variant="primary" sx={{ marginTop: '12px' }}>
            <Trans id="banner.cta">Try HelloCity</Trans>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[57vh] w-screen bg-[url('/images/banner-image.jpeg')] bg-cover bg-center bg-no-repeat text-left">
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative ml-[20vw] w-[70%] pt-24 text-white">
        <Typography variant="h2" sx={{ marginTop: '10vh' }}>
          <Trans id="banner.title1">Navigate your new city with</Trans>
        </Typography>
        <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          <Trans id="banner.title2">confidence</Trans>
        </Typography>

        <Typography variant="body1">
          <Trans id="banner.paragraph">
            Get personalized guidance step by step checklists, and timeline planning for setting into any city. Whether you're a tourist, student or migrant.
          </Trans>
        </Typography>

        <Button variant="primary" sx={{ marginTop: '6px' }}>
          <Trans id="banner.cta">Try HelloCity</Trans>
        </Button>
      </div>
    </div>
  );
};

export default Banner;
