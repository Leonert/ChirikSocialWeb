import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';

import Logo from './Logo';
import SideMenu from './SideMenu';

export default function MobileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowSideMenu(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setShowSideMenu(false);
  };

  return (
    <div style={{ position: 'absolute', top: '10px', right: '30px', zIndex: '2', display: 'flex' }}>
      <Logo />
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      {showSideMenu && <SideMenu />}
    </div>
  );
}
