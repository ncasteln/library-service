import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Types
export interface IBookStatus {
  copies: number;
  current_user: string;
  user_history: string[];
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
  bookList: IBook[];
  responseStatus: 'init' | 'loading' | 'fulfilled' | 'rejected';
}

const initialState: ICatalogueState = {
  bookList: [],
  responseStatus: 'init'
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
      state.bookList.push(...payload);
      state.responseStatus = 'fulfilled';
    });
    builder.addCase(getCatalogue.rejected, (state) => {
      state.responseStatus = 'rejected';
    });
  }
});

const headersConfig = new Headers ({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})


// patch catalogue works but need to handle promise
export const patchCatalogue = createAsyncThunk(
  'catalogue/patch',
  async (id: string, thunkAPI) => {
    try {
      console.log(id)
      // const response = await axios.patch(
      //   `http://localhost:5000/catalogue/${id}`,
      //   {
      //     book_status: {
      //       copies: 9999
      //     }
      //   });
      // if (response.status === 200) {

      // }
    }
    catch (error) {
      console.error(`PATCH failed - ${error}`)
    }
  }
);

export const getCatalogue = createAsyncThunk(
  'catalogue/get',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5000/catalogue');
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
      console.error(`GET failed - ${error}`)
    }
  }
);

export const { } = catalogueSlice.actions;

export default catalogueSlice.reducer;