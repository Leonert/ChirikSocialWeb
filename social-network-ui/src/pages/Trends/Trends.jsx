import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Divider, Grid, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Form, Link, NavLink, json } from 'react-router-dom';

import axiosIns from '../../axiosInstance';
import AsideRecommendFollows from '../../components/AsideRecommendFollows/AsideRecommendFollows';
import SearchField from '../../components/SearchField/SearchField';
import Spinner from '../../components/Spinner/Spinner';

const Trends = () => {
  const [trends, setTrends] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const fetchTrends = async () => {
    try {
      const { data } = await axiosIns.get(`/api/trends/hashtags?p=${page}&n=5`);
      if (data.length === 0) {
        setHasMorePosts(false);
      } else if (data.length < 5 && page === 0) {
        setHasMorePosts(false);
      } else {
        setHasMorePosts(true);
      }
      setTrends((prevTrends) => [...prevTrends, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      return json({ Error: error });
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <Box sx={{ maxWidth: '600px', width: '100%' }}>
          <Stack direction="row" p="6px 0" alignItems="center">
            <NavLink
              style={{
                textDecoration: 'none',
                color: 'inherit',
                zIndex: 2,
                margin: '4px 26px 0 20px',
              }}
              to="/"
            >
              <ArrowBackIcon />
            </NavLink>
            <Typography component="h2" fontSize="18px">
              Trends
            </Typography>
          </Stack>
          <InfiniteScroll
            dataLength={trends.length}
            next={fetchTrends}
            hasMore={hasMorePosts}
            endMessage={
              <Typography
                sx={{
                  marginTop: '25px',
                  color: '#93989D',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '32px',
                }}
              >
                No more results
              </Typography>
            }
            loader={<Spinner />}
          >
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
          </InfiniteScroll>
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Form method="post">
          <SearchField />
        </Form>
        <AsideRecommendFollows />
      </Grid>
    </Grid>
  );
};

export default Trends;
