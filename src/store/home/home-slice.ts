import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

type AppState = {
  users: User[];
}

const initialState: AppState = {
  users: [],
};

export const getUsers = createAsyncThunk(
  'home/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(' http://localhost:8080/users');
      return await res.json();
    } catch (e) {
      return rejectWithValue('Something');
    }
  }
);

const appSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  }
});

export const {
} = appSlice.actions;

export default appSlice.reducer;
