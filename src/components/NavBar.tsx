'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Switch, FormControlLabel, Avatar } from '@mui/material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

import { Dropdown } from '.';
import { userMenuOptions, languageMenuOptions } from './dropdownMenuOptions';

const NavBar = () => {
  const [isLoggedIn, _setIsLoggedIn] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isEnglish, setIsEnglish] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEnglish(event.target.checked);
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex w-[100vw] items-center justify-around pt-5">
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
          control={<Switch checked={isEnglish} onChange={handleChange} color="primary" />}
          sx={{ color: 'white' }}
          label={isEnglish ? 'EN' : 'CN'}
        />
        <Dropdown
          anchorElContent={<LanguageOutlinedIcon />}
          dropdownOptions={languageMenuOptions}
          layout="horizontal"
          textAlignCenter
        ></Dropdown>
      </div>

      <div>
        {!isLoggedIn ? (
          //   <>
          //   <Button component={Link} href="/" variant="tertiary">
          //     Profile
          //   </Button>
          //   <Button component={Link} href="/" variant="tertiary">
          //     Logout
          //   </Button>
          //   <Button component={Link} href="/" variant="tertiary">
          //     Language
          //   </Button>
          // </>
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
          ></Dropdown>
        ) : (
          <Button variant="tertiary">Sign In</Button>
        )}
        <Button component={Link} href="/" variant="primary">
          Try HelloCity
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
