import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { EUserBase, EUserGender, EUserRank } from 'models/user.model';

export interface UserUpdateDto {
  displayName: string;
  profileImageUrl: string;
  rank: EUserRank;
  firstName: string;
  lastName: string;
  gender: EUserGender;
  base: EUserBase;
}

export const UserUpdateDefaultValues: UserUpdateDto = {
  displayName: '',
  profileImageUrl: '',
  rank: EUserRank[''],
  firstName: '',
  lastName: '',
  gender: EUserGender[''],
  base: EUserBase[''],
};

export const UserUpdateFormSchema = () => {
  return yupResolver(
    yup.object().shape({
      displayName: yup.string().required(),
      profileImageUrl: yup.string().required(),
      rank: yup.mixed<EUserRank>().oneOf(Object.values(EUserRank)).defined(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      gender: yup
        .mixed<EUserGender>()
        .oneOf(Object.values(EUserGender))
        .defined(),
      base: yup.mixed<EUserBase>().oneOf(Object.values(EUserBase)).defined(),
    })
  );
};

export interface ProfileEditDto {
  displayName: string;
  profileImageUrl: string;
  rank: EUserRank;
  firstName: string;
  lastName: string;
  gender: EUserGender;
  base: EUserBase;
}

export const ProfileEditDefaultValues: ProfileEditDto = {
  displayName: '',
  profileImageUrl: '',
  rank: EUserRank[''],
  firstName: '',
  lastName: '',
  gender: EUserGender[''],
  base: EUserBase[''],
};

export const ProfileEditFormSchema = () => {
  return yupResolver(
    yup.object().shape({
      displayName: yup.string().required(),
      profileImageUrl: yup.string().required(),
      rank: yup.mixed<EUserRank>().oneOf(Object.values(EUserRank)).defined(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      gender: yup
        .mixed<EUserGender>()
        .oneOf(Object.values(EUserGender))
        .defined(),
      base: yup.mixed<EUserBase>().oneOf(Object.values(EUserBase)).defined(),
    })
  );
};
