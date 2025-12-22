import React from 'react';
import { useAppSelector } from 'store';
import { Box, Theme, useMediaQuery } from '@mui/material';
import LoginContainer from 'components/page/account/LoginContainer';
import AccountContainer from 'components/page/account/AccountContainer';

interface IProps {}

const AccountPage: React.FC<IProps> = () => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isLogin = useAppSelector((state) => state.user.isLogin);

  return (
    <Box
      sx={{
        pt: mdDown ? 8 : 10,
        pb: 10,
        minHeight: '100vh',
      }}
    >
      {isLogin ? <AccountContainer /> : <LoginContainer />}
    </Box>
  );
};

export default AccountPage;
