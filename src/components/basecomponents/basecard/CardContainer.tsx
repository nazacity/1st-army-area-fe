import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface IProps {
  children: React.ReactNode;
  style?: SxProps<Theme>;
}

const CardContainer: React.FC<IProps> = ({ children, style }) => {
  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 0.22)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        p: 2,
        ...style,
      }}
    >
      {children}
    </Box>
  );
};

export default CardContainer;
