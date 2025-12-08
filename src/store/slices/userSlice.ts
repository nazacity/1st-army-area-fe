import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'models/user.model';

const initialState = {
  isLogin: false,
  user: undefined as IUser | undefined,
  selectedAddress: '',
  selectedCartItemLists: [] as string[],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(
      state,
      action: {
        type: string;
        payload: IUser;
      }
    ) {
      state.isLogin = true;
      state.user = action.payload;
    },

    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
