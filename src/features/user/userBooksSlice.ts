import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// NOTES
// reserveBook() - no double bookings
// every field of registratio need validation

export interface IUserBooks {
  reservations: null | string[];
  history: null | string[];
  wishlist: null | string[];
}

const initialState: IUserBooks = {
  reservations: null,
  history: null,
  wishlist: null
}

const userBooksSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserBooks (state, { payload }) {
      state.reservations = payload.reservations.current;
      state.history = payload.reservations.history;
      state.wishlist = payload.wishlist;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(reserve.fulfilled, (state, { payload }) => {
      state.reservations = payload;
    });
    builder.addCase(updateWishlist.fulfilled, (state, { payload }) => {
      state.wishlist = payload;
    });
  }
});

export const reserve = createAsyncThunk(
  'user/reserve',
  async ({ bookId, userId, reservations }: {
    bookId: string;
    userId: string;
    reservations: string[];
  }, thunkAPI) => {
    try {
      const response = await axios.patch(`http://localhost:5000/users/${userId}`, 
      {
        reservations: {
          current: [...reservations, bookId],
          history: [...reservations, bookId],
        }
      });
      if (response.status === 200) {
        return response.data.reservations.current;
      }
    }
    catch (error) {
      console.error(error)
    }
  }
);

export const updateWishlist = createAsyncThunk(
  'user/updateWishlist',
  async ({ userId, newWishlist }: {
    userId: string;
    newWishlist: string[];
  }) => {
    try {
      const response = await axios.patch(`http://localhost:5000/users/${userId}`,
      {
        wishlist: newWishlist
      });
      return response.data.wishlist;
    }
    catch (error) {

    }
  }
)

export const { setUserBooks } = userBooksSlice.actions;

export default userBooksSlice.reducer;
