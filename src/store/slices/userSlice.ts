import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'models/user.model';

const initialState = {
  isLogin: false,
  user: undefined as IUser | undefined,
  lineInfo: {
    displayName: '',
    lineId: '',
    profileImageUrl: '',
  },
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
    setLineInfo(
      state,
      action: {
        type: string;
        payload: {
          displayName: string;
          lineId: string;
          profileImageUrl: string;
        };
      }
    ) {
      console.log(action.payload);

      state.lineInfo = action.payload;
    },
  },
});

export const { setUser, clearUser, setLineInfo } = userSlice.actions;

export default userSlice.reducer;
