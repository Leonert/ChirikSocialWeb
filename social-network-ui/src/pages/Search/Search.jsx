import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, InputAdornment, Tab, Tabs, TextField, alpha, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import AsideRecommendFollows from '../../components/AsideRecommendFollows/AsideRecommendFollows';
import useDebounce from '../../util/useDebounce';
import PostsList from './PostsList';
import UsersList from './UsersList';

function TabPanel(props) {
  const { children, tabValue, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tabValue !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {tabValue === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('value');
  const tabUrlValue = searchParams.get('tab');
  const tabIndex = tabUrlValue === 'users' ? 0 : 1;
  const [tabValue, setTabValue] = useState(tabIndex);
  const [searchInputValue, setSearchInputValue] = useState(searchValue);
  const debouncedValue = useDebounce(searchInputValue, 400);
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const { user } = useSelector((state) => state.auth);

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      setSearchParams({ value: searchValue, tab: 'users' });
    } else {
      setSearchParams({ value: searchValue, tab: 'posts' });
    }

    setTabValue(newValue);
  };

  useEffect(() => {
    if (debouncedValue !== '') {
      setSearchParams({ value: debouncedValue, tab: tabUrlValue });
    }
  }, [debouncedValue]);

  const handleSearchInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={matches ? 7 : 12}>
        <Box display="flex" flexDirection="column" maxWidth="600px" width="100%">
          <TextField
            value={searchInputValue}
            onChange={handleSearchInputChange}
            fullWidth
            sx={{
              border: 'none',
              mt: '40px',
              backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: (theme) => theme.palette.common.white }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs variant="fullWidth" value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab
                label="Users"
                {...a11yProps(0)}
                sx={{ '&.MuiTab-root': { color: (theme) => theme.palette.text.primary } }}
              />
              <Tab
                label="Posts"
                {...a11yProps(1)}
                sx={{ '&.MuiTab-root': { color: (theme) => theme.palette.text.primary } }}
              />
            </Tabs>
          </Box>
          <TabPanel tabValue={tabValue} index={0}>
            <UsersList key={debouncedValue} searchValue={debouncedValue} />
          </TabPanel>
          <TabPanel tabValue={tabValue} index={1}>
            <PostsList key={debouncedValue} searchValue={debouncedValue} />
          </TabPanel>
        </Box>
      </Grid>
      {matches && user && (
        <Grid item xs={5}>
          <AsideRecommendFollows />
        </Grid>
      )}
    </Grid>
  );
};

export default Search;
