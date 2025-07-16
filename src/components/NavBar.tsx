'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Switch } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isExpanded, setIsExpanded] = useState<Boolean>(false);

  return (
    <div className="absolute w-[100vw] h-[100px] top-0 left-0 flex justify-around items-center z-10">
      <img src="/images/Logo.png" alt="HelloCity Logo" width={'120px'} />
      <div className="flex gap-2">
        <Button component={Link} href="/" variant="tertiary">
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