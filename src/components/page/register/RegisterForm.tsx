import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RegisterDefaultValues, RegisterFormSchema } from 'dto/auth.dto';
import { useAppDispatch, useAppSelector } from 'store';
import {
  Avatar,
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { EUserBase, EUserGender, EUserRank } from 'models/user.model';
import { COLORS } from 'theme';
import CardContainer from 'components/basecomponents/basecard/CardContainer';
import useTranslation from 'next-translate/useTranslation';
import authServices from 'services/auth.services';
import { setUser } from 'store/slices/userSlice';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';

interface IProps {}

const RegisterForm: React.FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { lineId, displayName, profileImageUrl } = useAppSelector(
    (state) => state.user.lineInfo
  );

  const { mutate: register } = authServices.useMutationRegisterByLine(
    (data) => {
      if (data.user) {
        dispatch(setUser(data.user));
        router.push('/');
      }
      setTimeout(() => {
        setLoading(false);
      }, 600);
    },
    (error) => {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...RegisterDefaultValues,
      lineId,
      displayName,
      profileImageUrl,
    },
    resolver: RegisterFormSchema(),
  });
  const _HandleRegister = handleSubmit((data) => {
    setLoading(true);
    register(data);
  });
  return (
    <CardContainer style={{ m: 1, p: 1 }}>
      <Controller
        control={control}
        name="profileImageUrl"
        render={({ field: { value, onChange }, formState: { errors } }) => (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={value} style={{ width: 120, height: 120 }} />
          </Box>
        )}
      />
      <Controller
        control={control}
        name="rank"
        render={({ field: { value, onChange }, formState: { errors } }) => (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ color: COLORS.white }}>
              <span style={{ color: COLORS.red[5] }}>*</span> ยศ
            </Typography>
            <Select
              value={value}
              onChange={onChange}
              displayEmpty
              sx={{ width: '100%', bgcolor: COLORS.white }}
              size="small"
              error={!!errors.rank?.message}
            >
              <MenuItem value="">เลือกยศ</MenuItem>
              {Object.values(EUserRank)
                .filter((a) => a)
                .map((item) => {
                  return (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </Box>
        )}
      />
      <Controller
        control={control}
        name="firstName"
        render={({ field: { value, onChange }, formState: { errors } }) => (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ color: COLORS.white }}>
              <span style={{ color: COLORS.red[5] }}>*</span> ชื่อ
            </Typography>
            <TextField
              value={value}
              onChange={onChange}
              sx={{ width: '100%', bgcolor: COLORS.white, borderRadius: 1 }}
              size="small"
              placeholder="ชื่อ"
              error={!!errors.firstName?.message}
            />
          </Box>
        )}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ field: { value, onChange }, formState: { errors } }) => (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ color: COLORS.white }}>
              <span style={{ color: COLORS.red[5] }}>*</span> สกุล
            </Typography>
            <TextField
              value={value}
              onChange={onChange}
              sx={{ width: '100%', bgcolor: COLORS.white, borderRadius: 1 }}
              size="small"
              placeholder="สกุล"
              error={!!errors.firstName?.message}
            />
          </Box>
        )}
      />
      <Controller
        control={control}
        name="gender"
        render={({ field: { value, onChange }, formState: { errors } }) => (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ color: COLORS.white }}>
              <span style={{ color: COLORS.red[5] }}>*</span> เพศ
            </Typography>
            <Select
              value={value}
              onChange={onChange}
              displayEmpty
              sx={{ width: '100%', bgcolor: COLORS.white }}
              size="small"
              error={!!errors.gender?.message}
            >
              <MenuItem value="">เลือกเพศ</MenuItem>
              {Object.values(EUserGender)
                .filter((a) => a)
                .map((item) => {
                  return (
                    <MenuItem value={item} key={item}>
                      {t(`common:gender.${item}`)}
                    </MenuItem>
                  );
                })}
            </Select>
          </Box>
        )}
      />
      <Controller
        control={control}
        name="base"
        render={({ field: { value, onChange }, formState: { errors } }) => (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ color: COLORS.white }}>
              <span style={{ color: COLORS.red[5] }}>*</span> สังกัด
            </Typography>
            <Select
              value={value}
              onChange={onChange}
              displayEmpty
              sx={{ width: '100%', bgcolor: COLORS.white }}
              size="small"
              error={!!errors.base?.message}
            >
              <MenuItem value="">เลือกสังกัด</MenuItem>
              {Object.values(EUserBase)
                .filter((a) => a)
                .map((item) => {
                  return (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  );
                })}
            </Select>
          </Box>
        )}
      />
      <LoadingButton
        variant="contained"
        loading={loading}
        sx={{ width: '100%', mb: 1, mt: 4 }}
        onClick={_HandleRegister}
      >
        ลงทะเบียน
      </LoadingButton>
    </CardContainer>
  );
};

export default RegisterForm;
