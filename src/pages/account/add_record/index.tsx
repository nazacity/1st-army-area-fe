import React, { useState } from 'react';
import { TextField, Typography, useMediaQuery } from '@mui/material';
import { Box, Theme } from '@mui/system';
import TopBackButton from 'components/layout/navbar/TopBackButton';
import scoreServices from 'services/score.services';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import {
  UserScoreHistoryDefaultValues,
  UserScoreHistoryDto,
  UserScoreHistoryFormSchema,
} from 'dto/score.dto';
import { useAppDispatch, useAppSelector } from 'store';
import CardContainer from 'components/basecomponents/basecard/CardContainer';
import { COLORS } from 'theme';
import uploadServices from 'services/upload.services';
import { useDropzone } from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import useTranslation from 'next-translate/useTranslation';
import { LoadingButton } from '@mui/lab';
import { handleShowSnackbar } from 'store/slices/layoutSlice';

interface IProps {}

export const uploadConstants = {
  imageType: 'PNG JPG JPEG',
  docType: 'PDF',
  maxFileSize: '2 MB',
};

const AddRecordPage: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const router = useRouter();
  const scoreId = useAppSelector((state) => state.user.user?.score.id);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { control, handleSubmit, setValue, watch } =
    useForm<UserScoreHistoryDto>({
      defaultValues: {
        ...UserScoreHistoryDefaultValues,
        userScoreInfoId: scoreId,
      },
      resolver: UserScoreHistoryFormSchema(),
    });

  const { mutate: uploadScoreImage } =
    uploadServices.useMutationUploadScoreImage((data) => {
      setValue('imageUrl', data.data.resourceUrl);
    });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      uploadScoreImage({ file: acceptedFiles[0] });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  const { mutate: createUserScoreHistory } =
    scoreServices.useMutationCreateUserScoreHistory(
      () => {
        dispatch(
          handleShowSnackbar({
            open: true,
            severity: 'success',
            message: 'บันทึกผลการวิ่งเรียบร้อบ',
          })
        );

        setTimeout(() => {
          router.back();
          setLoading(false);
        }, 800);
      },
      () => {}
    );

  const _HandleSave = handleSubmit((data) => {
    setLoading(true);
    createUserScoreHistory(data);
  });

  return (
    <Box
      sx={{
        pt: mdDown ? 8 : 10,
        pb: 10,
        minHeight: '100vh',
        px: 1,
      }}
    >
      <TopBackButton />
      <CardContainer style={{ mt: 2 }}>
        <Controller
          control={control}
          name="distance"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" sx={{ color: COLORS.white }}>
                <span style={{ color: COLORS.red[5] }}>*</span> ระยะทาง (กม.)
              </Typography>
              <TextField
                value={value}
                onChange={onChange}
                sx={{ width: '100%', bgcolor: COLORS.white, borderRadius: 1 }}
                size="small"
                placeholder="ชื่อ"
                error={!!errors.distance?.message}
                type="number"
              />
            </Box>
          )}
        />
        <Controller
          control={control}
          name="time"
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h4" sx={{ color: COLORS.white }}>
                <span style={{ color: COLORS.red[5] }}>*</span> นาที
                (ไม่ต้องใส่จำนวนวินาที)
              </Typography>
              <TextField
                value={value}
                onChange={onChange}
                sx={{ width: '100%', bgcolor: COLORS.white, borderRadius: 1 }}
                size="small"
                placeholder="ชื่อ"
                error={!!errors.distance?.message}
                type="number"
              />
            </Box>
          )}
        />
        <Box
          {...getRootProps()}
          sx={{
            border: '1px solid #DFE2EB',
            borderRadius: 5,
            p: 10,
            cursor: 'pointer',
          }}
        >
          <input {...getInputProps()} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {watch('imageUrl') ? (
              <Box>
                <img src={watch('imageUrl')} style={{ width: '100%' }} />
              </Box>
            ) : (
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  bgcolor: '#FDFCFF',
                  boxShadow: 1,
                  mb: 2,
                }}
              >
                <FileUploadIcon />
              </Box>
            )}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography color="primary">
                {t('common:common.click_to_upload')}
              </Typography>
            </Box>
            <Typography>
              {uploadConstants.imageType + ' '}(
              {t('common:common.limit_file') + ' '}
              {uploadConstants.maxFileSize})
            </Typography>
          </Box>
        </Box>
        <LoadingButton
          variant="contained"
          loading={loading}
          sx={{ width: '100%', mb: 1, mt: 4 }}
          onClick={_HandleSave}
        >
          บันทึก
        </LoadingButton>
      </CardContainer>
      <Box sx={{ height: 100 }} />
    </Box>
  );
};

export default AddRecordPage;
