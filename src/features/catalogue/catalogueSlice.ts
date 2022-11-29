import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IProfile, reserve } from "../user/userSlice";

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
  explored: IBook;
}

const initialState: ICatalogueState = {
  list: [],
  explored: {} as IBook
}

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {
    exploredBook (state, action) {
      state.explored = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCatalogue.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
    builder.addCase(patchCatalogue.fulfilled, (state, { payload }) => {
      state.list.filter(book => {
        return book.id === payload.id;
      })[0].book_status = {
        copies: payload.book_status.copies,
        current: payload.book_status.username,
        history: payload.book_status.history
      }
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

export const { exploredBook } = catalogueSlice.actions;

export default catalogueSlice.reducer;