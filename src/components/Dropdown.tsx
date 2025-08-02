'use client';
import React, { useState } from 'react';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import UserProfileCard from './UserLabel';

interface DropdownProps {
  anchorElContent: React.ReactNode;
  dropdownOptions: DropdownOptionProps[];
  showUserLabel?: boolean;
  textAlignCenter?: boolean;
  layout?: 'vertical' | 'horizontal'; // Specify whether the dropdown items should be laid out vertically or horizontally
  transformOrigin?: {
    horizontal: 'left' | 'center' | 'right';
    vertical: 'top' | 'center' | 'bottom';
  };
  anchorOrigin?: { horizontal: 'left' | 'center' | 'right'; vertical: 'top' | 'center' | 'bottom' };
}

export interface DropdownOptionProps {
  label: string; // Display text shown in the menu
  value: string; // Unique value returned when selected
  icon?: React.ElementType | null; // Optional: Icon displayed before the label
  divider?: boolean; //(Optional) Whether to show a divider after this item
  onClick: (value: string) => void;
}

const DropDown: React.FC<DropdownProps> = ({
  anchorElContent,
  dropdownOptions,
  showUserLabel,
  textAlignCenter,
  layout = 'vertical',
  transformOrigin = { horizontal: 'right', vertical: 'top' },
  anchorOrigin = { horizontal: 'right', vertical: 'bottom' },
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // TODO: 状态和函数之间需要加空行
  const handleClick = (event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };
  // TODO: 函数和函数之间需要加空格，而且如果函数就一行逻辑那就没必要抽出来当一个函数
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Check popup direction and alignment and Dynamically calculate margin in order not to overlay the anchor element
  const getMenuMarginTopSx = () => {
    const isPopupUp = anchorOrigin.vertical === 'top'; // TODO: 只用了一次的变量没必要声明一个，除非很难以理解
    const isVerticalCenter = anchorOrigin.vertical === 'center';
    let marginTop = '0.5rem';

    if (isPopupUp) {
      marginTop = '-0.5rem';
    } else if (isVerticalCenter) {
      // TODO: 这两个条件天然互斥，所以不需要else，直接另一个if就可以了
      marginTop = '0rem'; // No margin needed when vertically centered
    }

    return {
      '& .MuiPaper-root': {
        marginTop,
      },
    };
  };

  return (
    <React.Fragment>
      {/* AnchorEL */}
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label="open menu"
      >
        {anchorElContent}
      </IconButton>
      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={transformOrigin}
        anchorOrigin={anchorOrigin}
        layout={layout}
        sx={getMenuMarginTopSx()}
      >
        {/* User label area, will update when userprofile global statement is ready */}
        {showUserLabel && layout === 'vertical' && (
          <MenuItem sx={{ minHeight: 'auto', alignItems: 'flex-start' }}>
            <UserProfileCard Avatar={'/images/banner-image.jpeg'} UserName="Leon" />
          </MenuItem>
        )}
        {showUserLabel && layout === 'vertical' && <Divider />}
        {/* Dropdown Settings & Preferences area */}
        {dropdownOptions.map((option: DropdownOptionProps) => {
          return (
            <React.Fragment key={option.value}>
              <MenuItem onClick={() => option.onClick(option.value)}>
                {option.icon && (
                  <ListItemIcon sx={{ mr: 1 }} data-testid={`${option.value}-icon`}>
                    {option.icon && <option.icon fontSize="small" />}
                  </ListItemIcon>
                )}
                <Typography sx={textAlignCenter ? { textAlign: 'center', flexGrow: 1 } : {}}>
                  {option.label}
                </Typography>
              </MenuItem>
              {option.divider && layout === 'vertical' && <Divider />}
            </React.Fragment>
          );
        })}
      </Menu>
    </React.Fragment>
  );
};

export default DropDown;
