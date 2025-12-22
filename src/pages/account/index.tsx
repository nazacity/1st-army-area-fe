import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { setUser } from 'store/slices/userSlice';
import { IUser } from 'models/user.model';
import { Box, Theme, useMediaQuery } from '@mui/material';
import { AuthGuardNoRedirect } from 'utils/authGuard';
import { GetServerSideProps } from 'next';
import LoginContainer from 'components/page/account/LoginContainer';
import AccountContainer from 'components/page/account/AccountContainer';

interface IProps {
  user: IUser;
}

const AccountPage: React.FC<IProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isLogin = useAppSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (isLogin && user) {
      dispatch(setUser(user));
    }
  }, [user, isLogin]);

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return AuthGuardNoRedirect(ctx);
};

export default AccountPage;
