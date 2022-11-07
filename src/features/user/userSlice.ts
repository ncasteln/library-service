import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBook } from '../catalogue/catalogueSlice';
import axios from "axios";

// NOTES
// reserveBook() - no double bookings
// handle failed login
// every field of registratio need validation

interface ILogin {
  email: string;
  password: string;
}

export interface IRegistration {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
};

export interface IUserInfo extends ILogin {
  id: number | null;
  reservations: {
    current: string[];
    history: string[];
    wishlist: string[];
  };
  username: string;
  role: string;
  first_name: string;
  last_name: string;
  location: {
    street: string;
    city: string;
    state: string;
    postcode: number | string | null;
  };
  picture: string;
}

interface IUser {
  isLoading: boolean;
  userInfo: IUserInfo;
  responseStatus: 'init' | 'loading' | 'fulfilled' | 'rejected';
}

const initialState: IUser = {
  isLoading: false,
  userInfo: {} as IUserInfo,
  responseStatus: 'init'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout () {
      return initialState;
    },
    reserveBook (state, { payload }) {
      console.log('Book reserved');
    },
    addToWishlist (state, action) {
      console.log('Added to Wishlist')
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.responseStatus = 'loading';
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.responseStatus = 'fulfilled';
      state.userInfo = payload[0];
    });
    builder.addCase(login.rejected, (state) => {
      state.responseStatus = 'rejected';
    });
    builder.addCase(registration.pending, (state) => {
      state.responseStatus = 'loading'
    });
    builder.addCase(registration.fulfilled, (state, { payload }) => {
      state.responseStatus = 'fulfilled';
    });
    builder.addCase(registration.rejected, (state) => {
      state.responseStatus = 'rejected'
    });
  }
});

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: ILogin, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(`login failed - response status ${response.status}`)
    }
    catch (error) {
      console.error(`Login error - ${error}`)
    }
  }
);

export const registration = createAsyncThunk(
  'user/registration',
  async (formData: IRegistration, thunkAPI) => {
    try {
      const newUser = {
        ...formData,
        id: Math.floor(Math.random() * (999 - 111 + 1) + 111),
        reservations: {
          current: [],
          history: [],
          wishlist: []
        },
        role: 'user',
        location: {
          street: '',
          city: '',
          state: '',
          postcode: ''
        },
        picture: ''
      }
      const response = axios.post(`http://localhost:5000/users`, newUser);
    }
    catch (error) {
      console.error(`Registration error - ${error}`)
    }
  }
);

export const { reserveBook, logout, addToWishlist } = userSlice.actions;

export default userSlice.reducer;