import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeStatusFollowing, changeStatusRecommendation } from '../../features/slices/homeSlice';

const GridContainer = styled(Grid)(({ theme }) => ({
  top: '0',
  listStyle: 'none',
  margin: '0',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(11,18,23,0.7)',
  padding: '20px 0 ',
  zIndex: '2',
}));

const HeaderButton = styled(Button)(({ theme }) => ({
  width: '100%',
  color: '#fff !important',
  '&:hover': {
    borderRadius: 1,
  },
}));

const GridWrapper = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));

export default function HeaderMain() {
  const recommendation = useSelector((state) => state.home.recommendation);
  const following = useSelector((state) => state.home.following);
  const dispatch = useDispatch();
  // const classes = useHeaderMenuStyles();
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <GridContainer container rowSpacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <h2 style={{ paddingLeft: '20px', margin: '0 0 20px 0 ' }}>Home</h2>
        </Grid>
        <Grid item xs={6}>
          {user && <HeaderButton onClick={() => dispatch(changeStatusRecommendation())}>For you</HeaderButton>}
        </Grid>
        <Grid item xs={6}>
          {user && <HeaderButton onClick={() => dispatch(changeStatusFollowing())}>Following</HeaderButton>}
        </Grid>
        <GridWrapper item xs={6}>
          {user && recommendation && (
            <Box
              sx={{
                width: 70,
                height: 3,
                backgroundColor: 'primary.dark',
              }}
            />
          )}
        </GridWrapper>
        <GridWrapper item xs={6}>
          {user && following && (
            <Box
              sx={{
                width: 85,
                height: 3,
                backgroundColor: 'primary.dark',
              }}
            />
          )}
        </GridWrapper>
      </GridContainer>
    </div>
  );
}
