import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import Logout from '@mui/icons-material/Logout';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import type { DropdownOptionProps } from './Dropdown';

export const userMenuOptions: DropdownOptionProps[] = [
  {
    label: 'Profile',
    value: 'profile',
    icon: PaymentOutlinedIcon,
    divider: false,
    onClick: (value: string) => alert(value),
  },
  {
    label: 'Settings',
    value: 'settings',
    icon: SettingsOutlinedIcon,
    divider: false,
    onClick: (value: string) => alert(value),
  },
  {
    label: 'Theme',
    value: 'theme',
    icon: ContrastOutlinedIcon,
    divider: false,
    onClick: (value: string) => alert(value),
  },
  {
    label: 'Subscription',
    value: 'subscription',
    icon: PaymentOutlinedIcon,
    divider: true,
    onClick: (value: string) => alert(value),
  },
  {
    label: 'Logout',
    value: 'logout',
    icon: Logout,
    divider: false,
    onClick: (value: string) => alert(value),
  },
];

export const languageMenuOptions: DropdownOptionProps[] = [
  {
    label: '简体中文',
    value: 'zh-CN',
    icon: null,
    divider: false,
    onClick: (value: string) => alert(value),
  },
  {
    label: '繁體中文',
    value: 'zh-TW',
    icon: null,
    divider: false,
    onClick: (value: string) => alert(value),
  },
  {
    label: 'English',
    value: 'en-UK',
    icon: null,
    divider: false,
    onClick: (value: string) => alert(value),
  },
  {
    label: 'Français',
    value: 'fr-FR',
    icon: null,
    divider: false,
    onClick: (value: string) => alert(value),
  },
  {
    label: 'Deutsch',
    value: 'de-DE',
    icon: null,
    divider: false,
    onClick: (value: string) => alert(value),
  },
  {
    label: '日本語',
    value: 'ja-JP',
    icon: null,
    divider: false,
    onClick: (value: string) => alert(value),
  },
  {
    label: '한국어',
    value: 'ko-KR',
    icon: null,
    divider: false,
    onClick: (value: string) => alert(value),
  },
];
