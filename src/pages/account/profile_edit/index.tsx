import React from 'react';
import { useMediaQuery } from '@mui/material';
import { Box, Theme } from '@mui/system';
import TopBackButton from 'components/layout/navbar/TopBackButton';

interface IProps {}

const ProfileEditPage: React.FC<IProps> = ({}) => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  return (
    <Box
      sx={{
        pt: mdDown ? 8 : 10,
        pb: 10,
        minHeight: '100vh',
      }}
    >
      <TopBackButton />
    </Box>
  );
};

export default ProfileEditPage;
