import * as React from 'react';
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import SummaryContainer from 'components/page/home/SummaryContainer';
import RankContainer from 'components/page/home/RankContainer';
import CardContainer from 'components/basecomponents/basecard/CardContainer';

const HomePage: NextPage = () => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        // pt: mdDown ? 8 : 10,
        pb: 10,
        minHeight: '100vh',
      }}
    >
      <img
        src="/images/promote.png"
        alt="Army Area Logo"
        style={{ width: '100%' }}
      />
      <Box sx={{ px: 2 }}>
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
