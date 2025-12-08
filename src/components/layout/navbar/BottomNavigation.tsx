import React, { useEffect, useMemo } from 'react';
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Paper,
} from '@mui/material';
import Router from 'next/router';
import { VscAccount } from 'react-icons/vsc';
import { HiMiniHome } from 'react-icons/hi2';
import { IoMdTrophy } from 'react-icons/io';
import useTranslation from 'next-translate/useTranslation';
import { useAppSelector } from 'store';

interface IProps {}

const HomeBottomNavigation: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState('recents');
  const user = useAppSelector((state) => state.user.user);

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
