import { useQuery } from '@tanstack/react-query';
import { IUser } from 'models/user.model';
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
};

export default userServices;
