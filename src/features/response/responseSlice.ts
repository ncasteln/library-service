import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";

interface IResponse {
  status: 'idle' | 'pending' | 'rejected' | 'fulfilled';
}

const initialState: IResponse = {
  status: 'idle'
}

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(isPending, (state) => {
      state.status = 'pending';
      // console.log('A Promise is Pending')
    });
    builder.addMatcher(isFulfilled, (state) => {
      state.status = 'fulfilled';
      // console.log('A Promise is Fulfilled')
    });
    builder.addMatcher(isRejected, (state) => {
      state.status = 'rejected';
      // console.log('A Promise is Rejected')
    });
  },
});

export default responseSlice.reducer;