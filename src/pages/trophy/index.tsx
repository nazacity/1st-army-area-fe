import React from 'react';
import { IUser } from 'models/user.model';
import { Box, Theme, useMediaQuery } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { MonthSelectDefaultValues, MonthSelectDto } from 'dto/score.dto';
import RankTableContainer from 'components/page/trophy/RankTableContainer';
import RankCardContainer from 'components/page/trophy/RankCardContainer';

interface IProps {
  user: IUser;
}

const TrophyPage: React.FC<IProps> = () => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const monthForm = useForm<MonthSelectDto>({
    defaultValues: MonthSelectDefaultValues,
  });

  return (
    <Box
      sx={{
        pt: mdDown ? 8 : 10,
        pb: 10,
        minHeight: '100vh',
      }}
    >
      <FormProvider {...monthForm}>
        <RankCardContainer />
        <RankTableContainer />
      </FormProvider>
      <Box sx={{ height: 100 }} />
    </Box>
  );
};

export default TrophyPage;
