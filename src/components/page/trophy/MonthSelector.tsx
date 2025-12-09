import React from 'react';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, useFormContext } from 'react-hook-form';
import { MonthSelectDto } from 'dto/score.dto';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

interface IProps {}

const MonthSelector: React.FC<IProps> = ({}) => {
  const currentYear = dayjs().endOf('year');
  const { control } = useFormContext<MonthSelectDto>();

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Controller
        name="date"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                maxDate={currentYear}
                openTo="month"
                views={['year', 'month']}
                sx={{
                  minWidth: '90%',
                  backgroundColor: '#fff',
                  borderRadius: 1,
                }}
                value={value}
                onChange={onChange}
              />
            </LocalizationProvider>
          );
        }}
      />
    </Box>
  );
};

export default MonthSelector;
