import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpInDTO } from '../api/dto/sign-up.in';

interface AuthState {
  user: SignUpInDTO['user'] | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SignUpInDTO['user']>) => {
      state.user = {
        ...action.payload,
      };
    },
  },
});

export const { setUser } = authSlice.actions;
