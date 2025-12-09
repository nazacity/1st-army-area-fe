import { EUserBase, EUserGender, EUserRank } from 'models/user.model';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface SignInByLineDto {
  lineId: string;
}

export const SignInDefaultValues: SignInByLineDto = {
  lineId: '',
};

export const SignInByLineFormSchema = () => {
  return yupResolver(
    yup.object().shape({
      lineId: yup.string().required(),
    })
  );
};

export interface RegisterDto {
  lineId: string;
  displayName: string;
  profileImageUrl: string;
  rank: EUserRank;
  firstName: string;
  lastName: string;
  gender: EUserGender;
  base: EUserBase;
}

export const RegisterDefaultValues: RegisterDto = {
  lineId: '',
  displayName: '',
  profileImageUrl: '',
  rank: EUserRank[''],
  firstName: '',
  lastName: '',
  gender: EUserGender[''],
  base: EUserBase[''],
};

export const RegisterFormSchema = () => {
  return yupResolver(
    yup.object().shape({
      lineId: yup.string().required(),
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
