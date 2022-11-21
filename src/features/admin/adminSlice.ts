import { createSlice } from "@reduxjs/toolkit";

export interface IAdmin {
}

const initialState: IAdmin = {
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
  }
});

export const { } = adminSlice.actions;

export default adminSlice.reducer;