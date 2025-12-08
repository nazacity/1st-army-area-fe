import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useAppDispatch, useAppSelector } from 'store';
import { setUser } from 'store/slices/userSlice';
import { IUser } from 'models/user.model';
import { Box, Theme, useMediaQuery } from '@mui/material';
import { COLORS } from 'theme';
import { handleLoginModal } from 'store/slices/layoutSlice';
import { AuthGuardNoRedirect } from 'utils/authGuard';
import { GetServerSideProps } from 'next';

interface IProps {
  user: IUser;
}

const TrophyPage: React.FC<IProps> = ({ user }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isLogin = useAppSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (isLogin && user) {
      dispatch(setUser(user));
      dispatch(handleLoginModal(false));
    } else {
      dispatch(handleLoginModal(true));
    }
  }, [user, isLogin]);

  return (
    <Box
      sx={{
        pt: mdDown ? 8 : 10,
        pb: 10,
        minHeight: '100vh',
        bgcolor: COLORS.background.default,
      }}
    ></Box>
  );
};

export default TrophyPage;
