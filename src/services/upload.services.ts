import { useMutation } from '@tanstack/react-query';
import { ResponseModel } from 'models/respone.model';
import { ResourceUrl } from 'models/upload.model';

import authenticatedRequest from 'utils/authenticatedRequest';

const uploadServices = {
  useMutationUploadScoreImage(
    onSuccess: (data: ResponseModel<ResourceUrl>) => void
  ) {
    return useMutation<ResponseModel<ResourceUrl>, Error, { file: File }>({
      mutationFn: async ({ file }) => {
        try {
          const formData = new FormData();
          formData.append('image', file);
          const res = await authenticatedRequest.post(
            `/r2/score-image`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          return res.data;
        } catch (error) {
          throw error.response.data.message;
        }
      },
      onSuccess,
    });
  },
};

export default uploadServices;
