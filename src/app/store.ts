import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import catalogueReducer from '../features/catalogue/catalogueSlice';
import responseReducer from '../features/response/responseSlice';
import authReducer from '../features/authentication/authSlice';

export const store = configureStore({
  reducer: {
    catalogue: catalogueReducer,
    user: userReducer,
    response: responseReducer,
    auth: authReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
