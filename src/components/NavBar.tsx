'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Switch, FormControlLabel } from '@mui/material';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

const NavBar = () => {
  const [isLoggedIn, _setIsLoggedIn] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { isEnglish, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = event.target.checked ? 'en' : 'zh';
    setLanguage(newLanguage);
  };

  return (
    <div className="fixed w-[100vw] pt-5 top-0 left-0 flex justify-around items-center z-10">
      <img src="/images/Logo.png" alt="HelloCity Logo" width={120} />
      <div className="flex gap-2">
        <Button component={Link} href="/" variant="tertiary" passHref>
          {t('Home')}
        </Button>
        <Button component={Link} href="/" variant="tertiary">
          {t('Chat')}
        </Button>
        <Button component={Link} href="/" variant="tertiary">
          {t('FAQ')}
        </Button>
        <Button onClick={() => setIsExpanded(!isExpanded)} href="/" variant="tertiary">
          {t('Check Items')}
        </Button>
        <FormControlLabel
          control={
            <Switch
              checked={isEnglish}
              onChange={handleLanguageChange}
              color="primary"
            />
          }
          sx={{ color: 'white' }}
          label={isEnglish ? 'EN' : 'CN'}
        />
      </div>

      <div>
        {isLoggedIn ? (
          <>
            <Button component={Link} href="/" variant="tertiary">
              {t('Profile')}
            </Button>
            <Button component={Link} href="/" variant="tertiary">
              {t('Logout')}
            </Button>
            <Button component={Link} href="/" variant="tertiary">
              {t('Language')}
            </Button>
          </>
        ) : (
          <Button variant="tertiary">
            {t('Sign In')}
          </Button>
        )}

        <Button component={Link} href="/" variant="primary">
          {t('Try HelloCity')}
        </Button>
      </div>
    </div>
  );
};

export default NavBar;