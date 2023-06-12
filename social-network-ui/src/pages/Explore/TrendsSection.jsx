import { Box, Divider, ListItem, ListItemText, Stack, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, json } from 'react-router-dom';

import axiosIns from '../../axiosInstance';

const CustomLink = styled(Link)(({ theme }) => ({
  display: 'block',
  padding: '16px',
  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
}));

const TrendsSection = () => {
  const [trends, setTrends] = useState([]);
  const fetchTrends = async () => {
    try {
      const { data } = await axiosIns.get('/api/trends/hashtags?n=5');
      setTrends(data);
    } catch (error) {
      return json(error);
    }
  };
  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <Box>
      {trends.length > 0 &&
        trends.map((trend) => (
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
      <CustomLink to="/trends">Show more</CustomLink>
    </Box>
  );
};

export default TrendsSection;
