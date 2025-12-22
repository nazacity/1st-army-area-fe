import React from 'react';
import { useMediaQuery } from '@mui/material';
import { Box, Theme } from '@mui/system';
import TopBackButton from 'components/layout/navbar/TopBackButton';
import ProfileEditContainer from 'components/page/profileedit/ProfileEditContainer';

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
      <ProfileEditContainer />
      <Box sx={{ height: 100 }} />
    </Box>
  );
};

export default ProfileEditPage;
