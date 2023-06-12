import { Divider, ListItem, ListItemText, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, json } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import AsideContainer from '../UI/AsideContainer';

const AsideTrends = () => {
  const [recommendedTrends, setRecommendedTrends] = useState([]);

  const fetchRecommendedTrends = async () => {
    try {
      const { data } = await axiosIns.get('api/trends/hashtags?n=10&p=0');
      setRecommendedTrends(data);
    } catch (e) {
      return json(e);
    }
  };

  useEffect(() => {
    fetchRecommendedTrends();
  }, []);

  return (
    <AsideContainer header="Trends for you" asideActions="/trends">
      {recommendedTrends.map((trend) => (
        <Link key={trend.id} to={`/search?value=${encodeURIComponent(trend.name)}&tab=posts`}>
          <ListItem sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}>
            <Stack justifyContent="space-between" alignItems="center" direction="row" width="100%">
              <Stack>
                <ListItemText primary={trend.name} sx={{ '>span': { fontWeight: 700 } }} />
                <ListItemText primary={trend.quantity + (trend.quantity === 1 ? ' Tweet' : ' Tweets')} />
              </Stack>
            </Stack>
            <Divider />
          </ListItem>
        </Link>
      ))}
    </AsideContainer>
  );
};

export default AsideTrends;
