'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Switch, FormControlLabel } from '@mui/material';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trans } from '@lingui/react';  // 从 @lingui/react 导入，而不是 @lingui/macro
import { i18n } from '@/i18n';  // 添加这一行导入 i18n 实例

const NavBar = () => {
  const [isLoggedIn, _setIsLoggedIn] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { isEnglish, setLanguage } = useLanguage();

  // 在 handleLanguageChange 函数中添加日志
  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = event.target.checked ? 'en' : 'zh';
    console.log('NavBar: Switching language to:', newLanguage);
    console.log('Current i18n state before switch:', i18n.locale, i18n._);
    setLanguage(newLanguage);
    // Force a re-render
    setTimeout(() => {
      console.log('NavBar: Current language after switch:', newLanguage);
      console.log('Current i18n state after switch:', i18n.locale, i18n._);
      console.log('Translation test:', i18n._('Home'), i18n._('Chat'));
    }, 100);
  };

  // 在 Trans 组件附近添加测试输出
  console.log('NavBar rendering, current language:', isEnglish ? 'en' : 'zh');

  return (
    <div className="fixed w-[100vw] pt-5 top-0 left-0 flex justify-around items-center z-10">
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
          <div className="flex gap-2">
            <Button component={Link} href="/" variant="tertiary">
              <Trans id="Profile">Profile</Trans>
            </Button>
            <Button component={Link} href="/" variant="tertiary">
              <Trans id="Logout">Logout</Trans>
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button component={Link} href="/" variant="tertiary">
              <Trans id="Sign In">Sign In</Trans>
            </Button>
            <Button component={Link} href="/" variant="primary">
              <Trans id="Try HelloCity">Try HelloCity</Trans>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;