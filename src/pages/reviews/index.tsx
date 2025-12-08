import React from 'react';
import { useMediaQuery, Theme } from '@mui/material';
import { Box } from '@mui/system';
import { COLORS } from 'theme';

interface IProps {}

const ReviewsPage: React.FC<IProps> = ({}) => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  return (
    <Box
      sx={{
        pt: mdDown ? 8 : 10,
        pb: 10,
        minHeight: '100vh',
        bgcolor: COLORS.background.default,
      }}
    >
      Reviews
    </Box>
  );
};

export default ReviewsPage;
