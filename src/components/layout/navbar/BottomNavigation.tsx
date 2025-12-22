import React, { useEffect, useMemo } from 'react';
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material';
import Router from 'next/router';
import { VscAccount } from 'react-icons/vsc';
import { HiMiniHome } from 'react-icons/hi2';
import { IoMdTrophy } from 'react-icons/io';
import useTranslation from 'next-translate/useTranslation';
import { useAppDispatch, useAppSelector } from 'store';
import authServices from 'services/auth.services';
import liff from '@line/liff';
import { useRouter } from 'next/router';
import { setLineInfo, setUser } from 'store/slices/userSlice';

interface IProps {}

const HomeBottomNavigation: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState('recents');
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const routePath = useMemo(() => {
    return Router.pathname.split('/')[1];
  }, [Router.pathname]);

  const routePath2 = useMemo(() => {
    return Router.pathname.split('/')[2];
  }, [Router.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    Router.push(`/${newValue}`);
    setValue(newValue);
  };

  useEffect(() => {
    setValue(routePath);
  }, [routePath]);

  const router = useRouter();

  const { mutate: signinByLine } = authServices.useMutationSigninByLine(
    (data) => {
      if (data.user) {
        dispatch(setUser(data.user));
      } else {
        if (routePath !== '/register') {
          router.push('/register');
          setTimeout(() => {
            router.reload();
          }, 600);
        }
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
        // withLoginOnExternalBrowser: true,
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

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 40,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 900,
          width: '100%',
          zIndex: 1000,
          borderRadius: 100,
          overflow: 'hidden',
        }}
      >
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          <BottomNavigationAction
            label={t('common:bottom_bar.home')}
            value=""
            icon={<HiMiniHome style={{ fontSize: 20 }} />}
          />
          <BottomNavigationAction
            label={t('common:bottom_bar.trophy')}
            value="trophy"
            icon={<IoMdTrophy style={{ fontSize: 20 }} />}
          />
          <BottomNavigationAction
            label={t('common:bottom_bar.account')}
            value="account"
            icon={
              user && user.profileImageUrl ? (
                <Avatar
                  src={user.profileImageUrl}
                  sx={{ width: 24, height: 24 }}
                  alt={user.displayName}
                />
              ) : (
                <VscAccount style={{ fontSize: 20 }} />
              )
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default HomeBottomNavigation;
