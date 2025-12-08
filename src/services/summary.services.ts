import { useQuery } from '@tanstack/react-query';
import { AllSummary } from 'models/summary.model';
import { EUserBase } from 'models/user.model';
import authenticatedRequest from 'utils/authenticatedRequest';

const summaryServices = {
  useQueryGetAllSummary({
    month,
    year,
    base,
  }: {
    month: number;
    year: number;
    base?: EUserBase;
  }) {
    return useQuery<
      AllSummary,
      Error,
      AllSummary,
      [
        string,
        {
          month: number;
          year: number;
          base?: EUserBase;
        },
      ]
    >({
      queryKey: ['get-all-summary', { month, year, base }],
      queryFn: async ({ queryKey }) => {
        try {
          const res = await authenticatedRequest.get('/summary/all-summary', {
            params: {
              month: queryKey[1].month,
              year: queryKey[1].year,
              ...(queryKey[1].base && {
                base: queryKey[1].base,
              }),
            },
          });

          return res?.data.data;
        } catch (error) {
          throw error;
        }
      },
    });
  },
};

export default summaryServices;
