import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

import Logo from './Logo';
import SideMenu from './SideMenu';

export default function MobileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowSideMenu((prevState) => !prevState);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setShowSideMenu(false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        right: '30px',
        display: 'flex',
        maxWidth: '100%',
        padding: '0 10px ',
        zIndex: '4',
      }}
    >
      <Logo />
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      {showSideMenu && <SideMenu handleCloseMenu={handleClose} />}
    </div>
  );
}
