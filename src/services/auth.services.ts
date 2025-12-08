import { useMutation } from '@tanstack/react-query';
import { RegisterDto, SignInByLineDto } from 'dto/auth.dto';
import { IAuth } from 'models/auth.model';
import request from 'utils/request';
import { setCookie, deleteCookie } from 'cookies-next';

const authServices = {
  useMutationSigninByLine(
    onSuccess: (data: IAuth) => void,
    onError: (error: any) => void
  ) {
    return useMutation<IAuth, Error, SignInByLineDto>({
      mutationFn: async (data: SignInByLineDto) => {
        try {
          const res = await request.post('/auth/user/sign-in', data);

          signinHelper(res.data.data);

          return res.data.data;
        } catch (error) {
          throw error.response.data.message;
        }
      },
      onSuccess,
      onError,
    });
  },
  useMutationRegisterByLine(
    onSuccess: (data: IAuth) => void,
    onError: (error: any) => void
  ) {
    return useMutation<IAuth, Error, RegisterDto>({
      mutationFn: async (data: RegisterDto) => {
        try {
          const res = await request.post('/user', data);

          signinHelper(res.data.data);

          return res.data.data;
        } catch (error) {
          throw error.response.data.message;
        }
      },
      onSuccess,
      onError,
    });
  },
  useMutationSignout(
    onSuccess: (data: boolean) => void,
    onError: (error: any) => void
  ) {
    return useMutation<boolean, Error>({
      mutationFn: async () => {
        try {
          await signoutHelper();

          return true;
        } catch (error) {
          throw error.response.data.message;
        }
      },
      onSuccess,
      onError,
    });
  },
};

export const signinHelper = async (data: IAuth) => {
  setCookie('accessToken', data.token.accessToken);
};

export const signoutHelper = async () => {
  deleteCookie('accessToken');
};

export default authServices;
