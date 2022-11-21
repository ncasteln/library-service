import { createSlice } from "@reduxjs/toolkit";

export interface IMessageState {
  show: boolean;
  title: string;
  bodyText: string;
  optional?: string | [];
}

const initialState: IMessageState = {
  show: false,
  title: '',
  bodyText: ''
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage (state, { payload }) {
      state.show = true;
      state.title = payload.title;
      state.bodyText = payload.bodyText;
    },
    clearMessage () {
      return initialState;
    }
  },
});

export const { showMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;