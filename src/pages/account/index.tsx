import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { setLineInfo, setUser } from 'store/slices/userSlice';
import { IUser } from 'models/user.model';
import { Box, Theme, useMediaQuery } from '@mui/material';
import { AuthGuardNoRedirect } from 'utils/authGuard';
import { GetServerSideProps } from 'next';
import authServices from 'services/auth.services';
import liff from '@line/liff';
import { useRouter } from 'next/router';
import LoginContainer from 'components/page/account/LoginContainer';
import AccountContainer from 'components/page/account/AccountContainer';

interface IProps {
  user: IUser;
}

const AccountPage: React.FC<IProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const router = useRouter();

  const { mutate: signinByLine } = authServices.useMutationSigninByLine(
    (data) => {
      if (data.user) {
        dispatch(setUser(data.user));
        setTimeout(() => {
          router.push('/');
        }, 600);
      } else {
        router.push('/register');
      }
    },
    (err) => {
      console.log(err);
    }
  );

  const liffInit = async () => {
    try {
      await liff.init({
        liffId: process.env.NEXT_PUBLIC_LINE_LIFF_ID || '',
        withLoginOnExternalBrowser: true,
      });

      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();

        dispatch(
          setLineInfo({
            displayName: profile.displayName,
            lineId: profile.userId,
            profileImageUrl: profile.pictureUrl || '',
          })
        );

        signinByLine({
          displayName: profile.displayName,
          lineId: profile.userId,
          profileImageUrl: profile.pictureUrl || '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    liffInit();
  }, [liff]);

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
