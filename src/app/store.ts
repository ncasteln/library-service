import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userBooksReducer from '../features/user/userBooksSlice';
import catalogueReducer from '../features/catalogue/catalogueSlice';
import responseReducer from '../features/response/responseSlice';
import authReducer from '../features/authentication/authSlice';
import messageReducer from '../features/message/messageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userBooksReducer,
    catalogue: catalogueReducer,
    response: responseReducer,
    message: messageReducer
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
