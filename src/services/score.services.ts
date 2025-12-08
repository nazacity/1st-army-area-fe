import { useQuery } from '@tanstack/react-query';
import { ResponseModel } from 'models/respone.model';
import { EUserBase, IUserScoreInfo } from 'models/user.model';
import authenticatedRequest from 'utils/authenticatedRequest';

const scoreServices = {
  useQueryGetUserScoreByPublic({
    take,
    page,
    month,
    year,

    base,
  }: {
    take: number;
    page: number;
    month: number;
    year: number;
    base?: EUserBase;
  }) {
    return useQuery<
      ResponseModel<IUserScoreInfo[]>,
      Error,
      ResponseModel<IUserScoreInfo[]>,
      [
        string,
        {
          take: number;
          page: number;
          month: number;
          year: number;
          base?: EUserBase;
        },
      ]
    >({
      queryKey: ['get-user-score-by-public', { take, page, month, year, base }],
      queryFn: async ({ queryKey }) => {
        try {
          const res = await authenticatedRequest.get(
            '/user-score-info/public',
            {
              params: {
                take: queryKey[1].take,
                page: queryKey[1].page,
                month: queryKey[1].month,
                year: queryKey[1].year,
                ...(queryKey[1].base && {
                  base: queryKey[1].base,
                }),
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
};

export default scoreServices;
