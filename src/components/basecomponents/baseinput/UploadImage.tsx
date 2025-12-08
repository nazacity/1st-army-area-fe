import { Box, IconButton } from '@mui/material';
import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { COLORS } from 'theme';
import useTranslation from 'next-translate/useTranslation';
import useAsync from 'utils/useAsync';

import BaseToolTip from 'components/basecomponents/basetooltip/BaseToolTip';

interface IProps {
  onChange: (args: string) => void;
  error?: boolean;
  message?: string;
  uploadService: (args: any) => Promise<any>;
  uploadConfig: {
    resolutionWidth?: number;
    resolutionHeight?: number;
    maxNumber?: number;
    maxFileSize?: number;
    dataURLKey?: 'image_url';
    multiple?: boolean;
  };
  width?: number;
  height?: number;
  value: string;
}

const UploadImage: React.FC<IProps> = ({
  onChange,
  error,
  message,
  uploadService,
  uploadConfig,
  width,
  height,
  value,
}) => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const { execute: uploadImage } = useAsync(uploadService, {
    onSuccess: (data) => {
      onChange(data.resourceUrl);
    },
  });

  const onSelectImages = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    if (addUpdateIndex && addUpdateIndex[0] > -1) {
      const formData = new FormData();
      formData.append('image', imageList[addUpdateIndex[0]].file);
      uploadImage(formData);
    }
    setImages(imageList as never[]);
  };

  return (
    <Box>
      <ImageUploading
        value={images}
        onChange={onSelectImages}
        {...uploadConfig}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <Box>
            {value ? (
              <Box sx={{ position: 'relative' }}>
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    backgroundColor: COLORS.transparent[2],
                  }}
                  size="small"
                  onClick={() => {
                    onChange('');
                  }}
                >
                  <CloseIcon
                    sx={{ fontSize: 20, color: COLORS.primary.main }}
                  />
                </IconButton>
                <Box
                  sx={{
                    width: width || '100%',
                    height: height || 150,
                    border: `1px dashed ${COLORS.primary.main}`,
                    borderRadius: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={value}
                    alt=""
                    style={{
                      width: width || '100%',
                      height: height || 150,
                      borderRadius: 2,
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <BaseToolTip open={error} title={message ? message : ''} arrow>
                <Box
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  sx={{
                    width: width || '100%',
                    height: height || 150,
                    border: `1px dashed ${COLORS.primary.main}`,
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <IconButton
                    sx={{ border: `1px solid ${COLORS.primary.main}` }}
                  >
                    <AddIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </Box>
              </BaseToolTip>
            )}
          </Box>
        )}
      </ImageUploading>
    </Box>
  );
};

export default UploadImage;
