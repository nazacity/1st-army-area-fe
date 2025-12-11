import { useMutation, useQuery } from '@tanstack/react-query';
import { ProfileEditDto } from 'dto/user.dto';
import { ResponseModel } from 'models/respone.model';
import { IUser, IUserScoreHistory } from 'models/user.model';
import authenticatedRequest from 'utils/authenticatedRequest';

const userServices = {
  useQueryGetUserByToken() {
    return useQuery<IUser, Error, IUser, [string]>({
      queryKey: ['get-user-by-token'],
      queryFn: async () => {
        try {
          const res = await authenticatedRequest.get('/user/info');

          return res?.data.data;
        } catch (error) {
          throw error;
        }
      },
    });
  },
  useQueryGetUserScoreHistoryByToken({
    take,
    page,
  }: {
    take: number;
    page: number;
  }) {
    return useQuery<
      ResponseModel<IUserScoreHistory[]>,
      Error,
      ResponseModel<IUserScoreHistory[]>,
      [string, { take: number; page: number }]
    >({
      queryKey: ['get-user-score-history-by-token', { take, page }],
      queryFn: async ({ queryKey }) => {
        try {
          const res = await authenticatedRequest.get(
            '/user-score-history/user',
            {
              params: {
                take: queryKey[1].take,
                page: queryKey[1].page,
              },
            }
          );

          return res?.data;
        } catch (error) {
          throw error;
        }
      },
    });
  },
  useMutationProfileEdit(
    onSuccess: (data: IUser) => void,
    onError: (error: any) => void
  ) {
    return useMutation<IUser, Error, ProfileEditDto>({
      mutationFn: async (data: ProfileEditDto) => {
        try {
          const res = await authenticatedRequest.patch('/user', data);

          return res.data.data;
        } catch (error) {
          throw error.response.data.message;
        }
      },
      onSuccess,
      onError,
    });
  },
};

export default userServices;
