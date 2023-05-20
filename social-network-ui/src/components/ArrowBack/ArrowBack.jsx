import { Box } from '@mui/material';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export const ArrowBack = () => {
  return (
    <>
      <Link to={-1}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: '50%',
            p: '5px',
            '&:hover': {
              backgroundColor: '#eceff1',
            },
          }}
        >
          <BiArrowBack size={30} color="rgb(63, 81, 181)" />
        </Box>
      </Link>
    </>
  );
};
