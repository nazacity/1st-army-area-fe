import * as React from 'react';
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { COLORS } from 'theme';
import SummaryContainer from 'components/page/home/SummaryContainer';
import RankContainer from 'components/page/home/RankContainer';
import CardContainer from 'components/basecomponents/basecard/CardContainer';

const HomePage: NextPage = () => {
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
      <Box sx={{ px: 2 }}>
        <CardContainer>
          <img
            src="/logo/logo.png"
            alt="Army Area Logo"
            style={{ width: '10%' }}
          />
        </CardContainer>
        <Box>
          <SummaryContainer />
          <RankContainer />
          <Box sx={{ height: 100 }}></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
