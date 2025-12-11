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
  },
});

export const { handleSideBar, handleShowSnackbar, handleCloseSnackbar } =
  layoutSlice.actions;

export default layoutSlice.reducer;
