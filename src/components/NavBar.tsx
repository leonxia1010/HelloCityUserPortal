'use client';


import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { Button, Switch } from '@mui/material';


const NavBar = () => {
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isExpanded, setIsExpanded] = useState<Boolean>(false);
  console.log('NavBar rendered successfully');


  const linkStyle =
    'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition';

  return (
    <div className="flex justify-around items-center py-4">
     
      <div className="flex gap-2">
        {isLoggedIn ? (
          <>
            <Button component={Link} href="/" color="primary" variant="contained">
              Profile
            </Button>
            <Link href="/" className={linkStyle}>
              Logout
            </Link>
            <Link href="/" className={linkStyle}>
              Language
            </Link>
          </>
        ) : (
          <Button color="secondary" variant="contained">
            Auth
          </Button>
        )}


        <Button color="secondary" variant="contained">
          Home
        </Button>
        <Button component={Link} href="/" color="primary" variant="contained">
          Chatbot
        </Button>
        <Button component={Link} href="/" color="primary" variant="contained">
          About
        </Button>
        <Button onClick={()=>setIsExpanded(!isExpanded)} href="/" color="primary" variant="contained">
          Check Items
        </Button>
        <Switch defaultChecked size="small" />
        <Button
          variant="contained"
          sx={{
            background: theme.gradients.homepageCTA,
            color: '#fff',
            borderRadius: '999px',
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'opacity 0.2s ease-in-out',
            '&:hover': {
              opacity: 0.9,
              background: theme.gradients.homepageCTA,
            },
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};


export default NavBar;