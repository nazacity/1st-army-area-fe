import React from 'react';
import { Box, Theme, useMediaQuery } from '@mui/material';
import RegisterForm from 'components/page/register/RegisterForm';

interface IProps {}

const RegisterPage: React.FC<IProps> = ({}) => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  return (
    <Box
      sx={{
        pt: mdDown ? 8 : 10,
        pb: 10,
        minHeight: '100vh',
      }}
    >
      <RegisterForm />
      <Box sx={{ height: 100 }} />
    </Box>
  );
};

export default RegisterPage;
