import React from 'react';
import { Box, IconButton } from '@mui/material';
import { FaChevronLeft } from 'react-icons/fa';
import { COLORS } from 'theme';
import { useRouter } from 'next/router';

interface IProps {}

const TopBackButton: React.FC<IProps> = ({}) => {
  const router = useRouter();
  return (
    <Box sx={{ ml: 2 }}>
      <IconButton
        onClick={() => {
          router.back();
        }}
        sx={{ bgcolor: COLORS.white }}
      >
        <FaChevronLeft style={{ color: COLORS.primary.main, fontSize: 20 }} />
      </IconButton>
    </Box>
  );
};

export default TopBackButton;
