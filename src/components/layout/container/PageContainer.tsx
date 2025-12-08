import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';
import HomeBottomNavigation from '../navbar/BottomNavigation';
import authServices from 'services/auth.services';
import { useAppDispatch } from 'store';
import { setUser } from 'store/slices/userSlice';
import liff from '@line/liff';

interface IProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { mutate: signinByLine } = authServices.useMutationSigninByLine(
    (data) => {
      dispatch(setUser(data.user));
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
    // liffInit();
  }, [liff]);

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
