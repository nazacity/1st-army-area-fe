import React, { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { COLORS } from 'theme';
import { useAppDispatch, useAppSelector } from 'store';
import router from 'next/router';
import { FaChevronLeft } from 'react-icons/fa';
import { LiaShoppingCartSolid } from 'react-icons/lia';
import { handleCartModal } from 'store/slices/layoutSlice';
import { TbCircleLetterCFilled } from 'react-icons/tb';

interface IProps {
  noCart?: boolean;
}

const BackTopNavBar: React.FC<IProps> = ({ noCart }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.user.user?.cart);
  const user = useAppSelector((state) => state.user.user);

  const _HandleCartOpen = () => {
    dispatch(handleCartModal(true));
  };

  const cartNumber = useMemo(() => {
    if (cart && cart.cartItemLists.length > 0) {
      return cart.cartItemLists.reduce((previousValue, item) => {
        return previousValue + item.quantity;
      }, 0);
    }

    return 0;
  }, [cart, cart?.cartItemLists.length]);

  return (
    <AppBar position="fixed" sx={{ bgcolor: COLORS.white }}>
      <Toolbar>
        <IconButton
          onClick={() => {
            router.back();
          }}
        >
          <FaChevronLeft style={{ color: COLORS.primary.main, fontSize: 20 }} />
        </IconButton>
        <Box sx={{ flex: 1 }} />
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
            <TbCircleLetterCFilled
              style={{ fontSize: 20, color: COLORS.grey[2] }}
            />
            <Typography variant="h3" sx={{ mx: 2 }}>
              {user?.credit.amount}
            </Typography>
          </Box>
        )}
        {!noCart && (
          <IconButton
            onClick={() => {
              _HandleCartOpen();
            }}
          >
            <Badge badgeContent={cartNumber} color="primary">
              <LiaShoppingCartSolid
                style={{ color: COLORS.primary.main, fontSize: 24 }}
              />
            </Badge>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default BackTopNavBar;
