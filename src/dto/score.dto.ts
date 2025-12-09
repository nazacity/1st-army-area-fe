import dayjs, { Dayjs } from 'dayjs';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface MonthSelectDto {
  date: Dayjs;
}

export const MonthSelectDefaultValues: MonthSelectDto = {
  date: dayjs(),
};

export interface UserScoreHistoryDto {
  time: number;
  distance: number;
  imageUrl: string;
  userScoreInfoId: string;
}

export const UserScoreHistoryDefaultValues: UserScoreHistoryDto = {
  time: 0,
  distance: 0.0,
  imageUrl: '',
  userScoreInfoId: '',
};

export const UserScoreHistoryFormSchema = () => {
  return yupResolver(
    yup.object().shape({
      time: yup.number().required(),
      distance: yup.number().required(),
      imageUrl: yup.string().required(),
      userScoreInfoId: yup.string().required(),
    })
  );
};
