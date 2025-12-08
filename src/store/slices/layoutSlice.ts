import { createSlice } from '@reduxjs/toolkit';
import { ISnackBarProps } from 'components/basecomponents/basesnackbar/BaseSnackbar';

const initialState = {
  sideBarOpen: false,
  snackbar: {
    open: false,
    severity: 'success',
    message: '',
  } as ISnackBarProps,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    handleSideBar(state, action) {
      state.sideBarOpen = action.payload;
    },
    handleShowSnackbar(
      state,
      action: {
        type: string;
        payload: ISnackBarProps;
      }
    ) {
      state.snackbar = action.payload;
    },
    handleCloseSnackbar(state) {
      state.snackbar.open = false;
    },
    handleLoginModal(state, action) {
      state.loginModalOpen = action.payload;
    },
    handleCartModal(state, action) {
      state.cartModalOpen = action.payload;
    },
  },
});

export const {
  handleSideBar,
  handleShowSnackbar,
  handleCloseSnackbar,
  handleLoginModal,
  handleCartModal,
} = layoutSlice.actions;

export default layoutSlice.reducer;
