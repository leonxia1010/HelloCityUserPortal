'use client';

import React, { useState } from 'react';
import { Button, Switch, FormControlLabel, Avatar } from '@mui/material';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trans } from '@lingui/react';
import Link from 'next/link';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

import { Dropdown } from '.';
import { userMenuOptions, languageMenuOptions } from './dropdownMenuOptions';

const NavBar = () => {
  const [isLoggedIn, _setIsLoggedIn] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Get the language and setLanguage from the LanguageContext.tsx
  const { language, setLanguage, isLanguage } = useLanguage();

  const isEnglish = isLanguage('en');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = event.target.checked ? 'en' : 'zh';
    setLanguage(newLanguage);
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex w-[100vw] items-center justify-around pt-5">
      <img src="/images/Logo.png" alt="HelloCity Logo" width={120} />
      <div className="flex gap-2">
        <Button component={Link} href="/" variant="tertiary" passHref>
          <Trans id="Home">Home</Trans>
        </Button>
        <Button component={Link} href="/" variant="tertiary">
          <Trans id="Chat">Chat</Trans>
        </Button>
        <Button component={Link} href="/" variant="tertiary">
          <Trans id="FAQ">FAQ</Trans>
        </Button>
        <Button onClick={() => setIsExpanded(!isExpanded)} href="/" variant="tertiary">
          <Trans id="Check Items">Check Items</Trans>
        </Button>
        <FormControlLabel
          control={<Switch checked={isEnglish} onChange={handleLanguageChange} color="primary" />}
          sx={{ color: 'white' }}
          label={isEnglish ? 'EN' : 'CN'}
        />
      </div>

      <div>
        {isLoggedIn ? (
          <Dropdown
            anchorElContent={
              <Avatar
                sx={{ width: 40, height: 40, cursor: 'pointer' }}
                src="/images/banner-image.jpeg"
                alt="User Avatar"
              />
            }
            dropdownOptions={userMenuOptions}
            showUserLabel
          />
        ) : (
          <div className="flex gap-2">
            <Button component={Link} href="/" variant="tertiary">
              <Trans id="Sign In">Sign In</Trans>
            </Button>
            <Button variant="tertiary" component={Link} href="/auth">
              Sign Up
            </Button>
            <Button component={Link} href="/" variant="primary">
              <Trans id="Try HelloCity">Try HelloCity</Trans>
            </Button>
          </div>
        )}

        <Button component={Link} href="/" variant="primary">
          <Trans id="Try HelloCity">Try HelloCity</Trans>
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
