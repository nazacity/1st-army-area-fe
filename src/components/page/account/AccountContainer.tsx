import React, { useState } from 'react';
import CardContainer from 'components/basecomponents/basecard/CardContainer';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';
import { COLORS } from 'theme';
import authServices from 'services/auth.services';
import { useRouter } from 'next/router';
import { clearUser } from 'store/slices/userSlice';
import { LoadingButton } from '@mui/lab';

interface IProps {}

const AccountContainer: React.FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);
  const { mutate: signout } = authServices.useMutationSignout(
    () => {
      setTimeout(() => {
        dispatch(clearUser());
        router.push('/');
        setLoading(false);
      }, 1200);
    },
    () => {}
  );

  const _HandleSignOut = () => {
    setLoading(true);
    signout();
  };

  return (
    <Box>
      <CardContainer
        style={{
          m: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar
            src={user?.profileImageUrl}
            style={{ width: 120, height: 120 }}
          />
        </Box>
        <Typography
          variant="h3"
          sx={{ color: COLORS.white, textAlign: 'center', my: 2 }}
        >{`${user?.rank} ${user?.firstName} ${user?.lastName}`}</Typography>
        <Box sx={{ bgcolor: COLORS.white, borderRadius: 1 }}>
          <Box
            onClick={() => {
              router.push('/account/profile_edit');
            }}
            sx={{ p: 2, cursor: 'pointer' }}
          >
            <Typography>แก้ไขข้อมูลประจำตัว</Typography>
          </Box>
          <Divider />
          <Box
            onClick={() => {
              router.push('/account/add_record');
            }}
            sx={{ p: 2, cursor: 'pointer' }}
          >
            <Typography>บันทึกข้อมูลการออกกำลังกาย</Typography>
          </Box>
          <Divider />
          <Box
            onClick={() => {
              router.push('/account/record');
            }}
            sx={{ p: 2, cursor: 'pointer' }}
          >
            <Typography>ข้อมูลการออกกำลังกาย</Typography>
          </Box>
        </Box>
        <LoadingButton
          variant="contained"
          loading={loading}
          sx={{ width: '100%', mb: 1, mt: 4 }}
          onClick={_HandleSignOut}
        >
          ออกจากระบบ
        </LoadingButton>
      </CardContainer>
      <Box sx={{ height: 100 }} />
    </Box>
  );
};

export default AccountContainer;
