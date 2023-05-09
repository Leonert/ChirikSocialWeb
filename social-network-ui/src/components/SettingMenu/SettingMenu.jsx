import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import MenuList from '@mui/material/MenuList';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';

import SettingItem from '../SettingItem/SettingItem';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginTop: 40,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SettingMenu = () => {
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <>
      <Typography variant={'h5'}>Settings</Typography>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      </Search>
      <MenuList>
        <SettingItem text="Your account" icon={<ArrowForwardIosIcon color="primary" />} />
        <SettingItem text="Twitter Blue" icon={<ArrowForwardIosIcon color="primary" />} />
        <SettingItem text="Security and account access" icon={<ArrowForwardIosIcon color="primary" />} />
        <SettingItem text="Privacy and safety" icon={<ArrowForwardIosIcon color="primary" />} />
        <SettingItem text="Notifications" icon={<ArrowForwardIosIcon color="primary" />} />
        <SettingItem text="Accessibility, display, and languages" icon={<ArrowForwardIosIcon color="primary" />} />
        <SettingItem text="Additional resources" icon={<ArrowForwardIosIcon color="primary" />} />
      </MenuList>
    </>
  );
};

export default SettingMenu;
