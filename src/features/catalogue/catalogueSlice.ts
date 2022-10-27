import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

// Types
export interface IBook {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
}

type CatalogueState = {
  bookList: IBook[];
  responseStatus: 'init' | 'loading' | 'fulfilled' | 'rejected';
}

const initialState: CatalogueState = {
  bookList: [],
  responseStatus: 'init'
}

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCatalogue.pending, (state) => {
      state.responseStatus = 'loading';
    });
    builder.addCase(fetchCatalogue.fulfilled, (state, { payload }) => {
      state.bookList.push(...payload);
      state.responseStatus = 'fulfilled';
    });
    builder.addCase(fetchCatalogue.rejected, (state) => {
      state.responseStatus = 'rejected';
    });
  }
});

export const fetchCatalogue = createAsyncThunk(
  'catalogue/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('./data/books/data.json');
      if (response.status !== 200) {
        console.log('Error')
        return thunkAPI.rejectWithValue(`fetchCatalogue failed - response status ${response.status}`)
      }
      else {
        const data = await response.json();
        return data;
      }
    }
    catch(error) {
      console.error(`Fetch failed - ${error}`)
    }
  }
)

export const { } = catalogueSlice.actions;

export default catalogueSlice.reducer;