import { configureStore } from '@reduxjs/toolkit';
import sharedReducer from './shared/shared-slice';
import { useDispatch } from 'react-redux';
import homeReducer from './home/home-slice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    shared: sharedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
