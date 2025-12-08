import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { COLORS } from 'theme';

interface IProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  description?: string;
  icon: React.ReactNode;
  buttonLeftLabel?: string;
  buttonRightLabel?: string;
}

const BaseConfirmAlert: React.FC<IProps> = ({
  open,
  handleClose,
  handleConfirm,
  title,
  description,
  icon,
  buttonLeftLabel,
  buttonRightLabel,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} maxWidth="sm" fullWidth sx={{ zIndex: 1000000 }}>
      <Box
        sx={{
          bgcolor: COLORS.white,
          borderRadius: 5,
          py: 4,
          px: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>{icon}</Box>
        <Box sx={{ my: 2 }}>
          <Typography variant="h3" align="center">
            {title}
          </Typography>
          {description && <Typography align="center">{description}</Typography>}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ flex: 1, mr: 1, width: '100%' }}
          >
            {buttonLeftLabel
              ? t(`${buttonLeftLabel}`)
              : t('common:common.cancel')}
          </Button>
          <Button variant="contained" onClick={handleConfirm} sx={{ flex: 1 }}>
            {buttonRightLabel
              ? t(`${buttonRightLabel}`)
              : t('common:common.ok')}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default BaseConfirmAlert;
