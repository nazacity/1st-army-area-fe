import React from 'react';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import HomeBottomNavigation from '../navbar/BottomNavigation';
import { COLORS } from 'theme';

interface IProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<IProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100vw',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: 1024,
          overflowY: 'scroll',
          overflowX: 'hidden',
          position: 'relative',
          bgcolor: COLORS.background.default2,
          backgroundImage: 'url("./images/background.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: { xs: 'cover', md: 'cover' },
          height: '100vh',
        }}
        elevation={1}
      >
        {children}
        <HomeBottomNavigation />
      </Paper>
    </Box>
  );
};

export default PageContainer;
