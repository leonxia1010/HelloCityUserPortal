'use client';

import React, { useState } from 'react';
import { Button, Switch, FormControlLabel } from '@mui/material';
import Link from 'next/link';
import styles from './NavBarCustom.module.scss';

type Props = {
  isCustom?: boolean;
};

const NavBar = ({ isCustom = false }: Props) => {
  const [isLoggedIn, _setIsLoggedIn] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isEnglish, setIsEnglish] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEnglish(event.target.checked);
  };

  if (isCustom) {
    return (
      <div className={styles['navbar-container']}>
        <img src="/images/Logo.png" alt="HelloCity Logo" width={120} />
        <div className={styles['navbar-left']}>
          <Button component={Link} href="/" variant="tertiary" passHref>
            Home
          </Button>
          <Button component={Link} href="/" variant="tertiary">
            Chat
          </Button>
          <Button component={Link} href="/" variant="tertiary">
            FAQ
          </Button>
          <Button onClick={() => setIsExpanded(!isExpanded)} href="/" variant="tertiary">
            Check Items
          </Button>
          <FormControlLabel
            control={
              <Switch
                checked={isEnglish}
                onChange={handleChange}
                color="primary"
              />
            }
            sx={{ color: 'white' }}
            label={isEnglish ? 'EN' : 'CN'}
          />
        </div>

        <div className={styles['navbar-right']}>
          {isLoggedIn ? (
            <>
              <Button component={Link} href="/" variant="tertiary">
                Profile
              </Button>
              <Button component={Link} href="/" variant="tertiary">
                Logout
              </Button>
              <Button component={Link} href="/" variant="tertiary">
                Language
              </Button>
            </>
          ) : (
            <Button variant="tertiary">
              Sign In
            </Button>
          )}

          <Button component={Link} href="/" variant="primary">
            Try HelloCity
          </Button>
        </div>
      </div>
    );
  }

  // Default Tailwind version
  return (
    <div className="fixed w-[100vw] pt-5 top-0 left-0 flex justify-around items-center z-10">
      <img src="/images/Logo.png" alt="HelloCity Logo" width={120} />
      <div className="flex gap-2">
        <Button component={Link} href="/" variant="tertiary" passHref>
          Home
        </Button>
        <Button component={Link} href="/" variant="tertiary">
          Chat
        </Button>
        <Button component={Link} href="/" variant="tertiary">
          FAQ
        </Button>
        <Button onClick={() => setIsExpanded(!isExpanded)} href="/" variant="tertiary">
          Check Items
        </Button>
        <FormControlLabel
          control={
            <Switch
              checked={isEnglish}
              onChange={handleChange}
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
              Profile
            </Button>
            <Button component={Link} href="/" variant="tertiary">
              Logout
            </Button>
            <Button component={Link} href="/" variant="tertiary">
              Language
            </Button>
          </>
        ) : (
          <Button variant="tertiary">
            Sign In
          </Button>
        )}

        <Button component={Link} href="/" variant="primary">
          Try HelloCity
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
