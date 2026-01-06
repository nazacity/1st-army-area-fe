import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Pagination,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import TopBackButton from 'components/layout/navbar/TopBackButton';
import userServices from 'services/user.services';
import usePaginationHook from 'utils/usePaginationHook';
import { IUserScoreHistory } from 'models/user.model';
import { COLORS } from 'theme';
import BaseTable from 'components/basecomponents/basetable/BaseTable';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import numeral from 'numeral';
import useTranslation from 'next-translate/useTranslation';
import dayjs from 'dayjs';
import { RiFilePaper2Fill } from 'react-icons/ri';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

interface IProps {}

const tableSize = 10;

const RecordPage: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const {
    data: userScoreHistory,
    setData,
    page,
    setPage,
    total,
    setTotal,
  } = usePaginationHook<IUserScoreHistory>();
  const { data } = userServices.useQueryGetUserScoreHistoryByToken({
    page,
    take: tableSize,
  });

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      const addedIndex = data.data.map((item, index) => {
        return { ...item, index };
      });
      setData(addedIndex);
      setTotal(data.meta.total);
    }
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: 'index',
      headerName: t('common:table.index'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreHistory>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography>
            {params.row.index
              ? (page - 1) * tableSize + params.row.index + 1
              : 1}
          </Typography>
        </Box>
      ),
      width: 60,
    },
    {
      field: 'createdAt',
      headerName: t('common:table.createdAt'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreHistory>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography align="center" sx={{ width: '100%' }}>
            {dayjs(params.row.createdAt).format('DD MMM BB')}
          </Typography>
        </Box>
      ),
      width: 100,
    },
    {
      field: 'distance',
      headerName: t('common:table.distance'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreHistory>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography align="center" sx={{ width: '100%' }}>
            {numeral(params.row.distance).format('0,0.0')}
          </Typography>
        </Box>
      ),
      width: 140,
    },
    {
      field: 'time',
      headerName: t('common:table.time'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreHistory>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography align="center" sx={{ width: '100%' }}>
            {numeral(Math.floor(params.row.time / 60)).format('0,0') + ' ชม. '}
            {numeral(params.row.time % 60).format('0') + ' นาที'}
          </Typography>
        </Box>
      ),
      width: 100,
    },
    {
      field: 'image',
      headerName: t('common:table.record_image'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreHistory>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <PhotoProvider>
            <PhotoView src={params.row.imageUrl}>
              <Avatar
                src={params.row.imageUrl}
                style={{ width: 40, height: 40, borderRadius: 0 }}
              >
                <RiFilePaper2Fill />
              </Avatar>
            </PhotoView>
          </PhotoProvider>
        </Box>
      ),
      width: 100,
    },
    {
      field: 'stauts',
      headerName: t('common:table.status'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreHistory>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography align="center" sx={{ width: '100%' }}>
            {t(`common:history.status.${params.row.status}`)}
          </Typography>
        </Box>
      ),
      width: 180,
    },
  ];

  const CustomPagination = () => {
    return (
      <Pagination
        color="primary"
        count={Math.ceil(total / tableSize)}
        page={page}
        onChange={(event, value) => {
          setPage(value);
        }}
        variant="outlined"
        shape="rounded"
      />
    );
  };

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
      <Box
        sx={{
          height: 110 + 52 * tableSize,
          bgcolor: COLORS.background.default,
          width: '100%',
          mt: 2,
        }}
      >
        <BaseTable
          rows={userScoreHistory}
          columns={columns}
          // loading={loading}
          slots={{
            pagination: CustomPagination,
          }}
          pagination={undefined}
        />
      </Box>
      <Box sx={{ height: 100 }} />
    </Box>
  );
};

export default RecordPage;
