import { EUserBase, EUserGender } from 'models/user.model';

export interface SignInByLineDto {
  lineId: string;
}

export const SignInDefaultValues: SignInByLineDto = {
  lineId: '',
};

export interface RegisterDto {
  lineId: string;
  displayName: string;
  profileImageUrl: string;
  rank: string;
  firstName: string;
  lastName: string;
  gender: EUserGender;
  base: EUserBase | undefined;
}

export const RegisterDefaultValues: RegisterDto = {
  lineId: '',
  displayName: '',
  profileImageUrl: '',
  rank: '',
  firstName: '',
  lastName: '',
  gender: EUserGender.male,
  base: undefined,
};
