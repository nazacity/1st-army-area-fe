import React from 'react';
import { TextField, Typography, useMediaQuery } from '@mui/material';
import { Box, Theme } from '@mui/system';
import TopBackButton from 'components/layout/navbar/TopBackButton';
import scoreServices from 'services/score.services';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import {
  UserScoreHistoryDefaultValues,
  UserScoreHistoryDto,
  UserScoreHistoryFormSchema,
} from 'dto/score.dto';
import { useAppSelector } from 'store';
import CardContainer from 'components/basecomponents/basecard/CardContainer';
import { COLORS } from 'theme';

interface IProps {}

const AddRecordPage: React.FC<IProps> = ({}) => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const router = useRouter();
  const scoreId = useAppSelector((state) => state.user.user?.score.id);
  const { mutate: createUserScoreHistory } =
    scoreServices.useMutationCreateUserScoreHistory(
      () => {
        router.back();
      },
      () => {}
    );
  const { control, handleSubmit } = useForm<UserScoreHistoryDto>({
    defaultValues: {
      ...UserScoreHistoryDefaultValues,
      userScoreInfoId: scoreId,
    },
    resolver: UserScoreHistoryFormSchema(),
  });
  return (
    <Box
      sx={{
        pt: mdDown ? 8 : 10,
        pb: 10,
        minHeight: '100vh',
        px: 1,
      }}
    >
      <TopBackButton />
      <CardContainer style={{ mt: 2 }}>
        <Controller
          control={control}
          name="distance"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" sx={{ color: COLORS.white }}>
                <span style={{ color: COLORS.red[5] }}>*</span> ระยะทาง (กม.)
              </Typography>
              <TextField
                value={value}
                onChange={onChange}
                sx={{ width: '100%', bgcolor: COLORS.white, borderRadius: 1 }}
                size="small"
                placeholder="ชื่อ"
                error={!!errors.distance?.message}
                type="number"
              />
            </Box>
          )}
        />
        <Controller
          control={control}
          name="time"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" sx={{ color: COLORS.white }}>
                <span style={{ color: COLORS.red[5] }}>*</span> นาที
                (ไม่ต้องใส่จำนวนวินาที)
              </Typography>
              <TextField
                value={value}
                onChange={onChange}
                sx={{ width: '100%', bgcolor: COLORS.white, borderRadius: 1 }}
                size="small"
                placeholder="ชื่อ"
                error={!!errors.distance?.message}
                type="number"
              />
            </Box>
          )}
        />
      </CardContainer>
    </Box>
  );
};

export default AddRecordPage;
