import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserInfo, reserve } from "../user/userSlice";

// NOTES
// PATCH - set a limit

// Types
export interface IBookStatus {
  copies: number;
  current: number[];
  history: number[];
}

export interface IBook {
  id: string;
  book_status: IBookStatus;
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
}

interface ICatalogueState {
  list: IBook[];
  responseStatus: 'init' | 'loading' | 'fulfilled' | 'rejected';
}

const initialState: ICatalogueState = {
  list: [],
  responseStatus: 'init',
}

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatalogue.pending, (state) => {
      state.responseStatus = 'loading';
    });
    builder.addCase(getCatalogue.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.responseStatus = 'fulfilled';
    });
    builder.addCase(getCatalogue.rejected, (state, action) => {
      state.responseStatus = 'rejected';
    });
    builder.addCase(patchCatalogue.pending, (state) => {
      state.responseStatus = 'loading';
    });
    builder.addCase(patchCatalogue.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.list.filter(book => {
        return book.id === payload.id;
      })[0].book_status = {
        copies: payload.book_status.copies,
        current: payload.book_status.username,
        history: payload.book_status.history
      }
      state.responseStatus = 'fulfilled';
    });
    builder.addCase(patchCatalogue.rejected, (state) => {
      state.responseStatus = 'rejected';
    });
  }
});

export const patchCatalogue = createAsyncThunk(
  'catalogue/patch',
  async ({ bookId, userId, book_status }: {
    bookId: string;
    userId: string;
    book_status: {
      copies: number;
      current: number[];
      history: number[];
    }
  }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/catalogue/${bookId}`,
        {
          book_status: {
            copies: book_status.copies - 1,
            current: [...book_status.current, userId],
            history: [...book_status.history, userId]
          }
        });
      if (response.status === 200) {
        return response.data;
      }
    }
    catch (error) {
      console.error(`PATCH failed - ${error}`)
    }
  },
);

export const getCatalogue = createAsyncThunk(
  'catalogue/get',
  async (_) => {
    try {
      const response = await axios.get('http://localhost:5000/catalogue');
      if (response.status === 200) {
        return response.data;
      }
    }
    catch (error) {
      console.error(`GET failed - ${error}`);
    }
  }
);

export const {  } = catalogueSlice.actions;

export default catalogueSlice.reducer;