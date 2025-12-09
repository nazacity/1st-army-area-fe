import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Avatar, Box, Pagination, Typography } from '@mui/material';
import { IUserScoreInfo } from 'models/user.model';
import scoreServices from 'services/score.services';
import { useFormContext } from 'react-hook-form';
import { MonthSelectDto } from 'dto/score.dto';
import dayjs from 'dayjs';
import usePaginationHook from 'utils/usePaginationHook';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import BaseTable from 'components/basecomponents/basetable/BaseTable';
import { COLORS } from 'theme';
import numeral from 'numeral';

interface IProps {}

const tableSize = 20;

const RankTableContainer: React.FC<IProps> = ({}) => {
  const { t } = useTranslation();
  const {
    data: userScore,
    setData,
    page,
    setPage,
    total,
    setTotal,
  } = usePaginationHook<IUserScoreInfo>();
  const { watch } = useFormContext<MonthSelectDto>();

  const { data } = scoreServices.useQueryGetUserScoreByPublic({
    take: tableSize,
    page: page,
    month: dayjs(watch('date')).month(),
    year: dayjs(watch('date')).year(),
  });

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      const addedIndex = data.data.map((item, index) => {
        return { index, ...item };
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
      renderCell: (params: GridRenderCellParams<IUserScoreInfo>) => (
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
      field: 'image',
      headerName: t('common:table.image'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreInfo>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Avatar src={params.row?.user?.profileImageUrl} />
        </Box>
      ),
      width: 90,
    },
    {
      field: 'name',
      headerName: t('common:table.name'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreInfo>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography align="center" sx={{ width: '100%' }}>
            {`${params.row?.user?.rank} ${params.row?.user?.firstName} ${params.row?.user?.lastName}`}
          </Typography>
        </Box>
      ),
      width: 180,
    },
    {
      field: 'distance',
      headerName: t('common:table.distance'),
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreInfo>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography align="center" sx={{ width: '100%' }}>
            {numeral(params.row.sumDistance).format('0,0.0')}
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
      renderCell: (params: GridRenderCellParams<IUserScoreInfo>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography align="center" sx={{ width: '100%' }}>
            {numeral(
              Math.floor(
                params.row.history.reduce((previousValue, item) => {
                  return Math.floor(item.time) + previousValue;
                }, 0) / 60
              )
            ).format('0,0') + ' ชม. '}
            {numeral(
              params.row.history.reduce((previousValue, item) => {
                return item.time + previousValue;
              }, 0) % 60
            ).format('0') + ' นาที'}
          </Typography>
        </Box>
      ),
      width: 100,
    },
    {
      field: 'noaction',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUserScoreInfo>) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        ></Box>
      ),
      flex: 1,
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
    <Box sx={{ p: 1 }}>
      <Box
        sx={{
          height: 110 + 52 * tableSize,
          bgcolor: COLORS.background.default,
          width: '100%',
        }}
      >
        <BaseTable
          rows={userScore}
          columns={columns}
          // loading={loading}
          slots={{
            pagination: CustomPagination,
          }}
          pagination={undefined}
        />
      </Box>
    </Box>
  );
};

export default RankTableContainer;
