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
  id: number;
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
  // userInfo: {} as IUserInfo,
  userInfo:
  {
    id: 244475798,
    role: "user",
    reservations: {
      "current": [],
      "history": [],
      "wishlist": []
    },
    email: "christoffer.christiansen@example.com",
    location: {
      street: "3391 pilevangen",
      city: "overby lyng",
      state: "danmark",
      postcode: 88520
    },
    username: "smallbird985",
    password: "samuel",
    first_name: "christoffer",
    last_name: "christiansen",
    picture: "./pictures/algolia/men/lucas.png"
  },
  responseStatus: 'init'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout () {
      return initialState;
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
    builder.addCase(reserve.pending, (state) => {
      state.responseStatus = 'loading'
    });
    builder.addCase(reserve.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.responseStatus = 'fulfilled';
    });
    builder.addCase(reserve.rejected, (state) => {
      state.responseStatus = 'rejected'
    })
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

export const reserve = createAsyncThunk(
  'user/reserve',
  async ({ book, userInfo }: {
    book: IBook;
    userInfo: IUserInfo;
  }, thunkAPI) => {
    const {
      id: userId,
      reservations: {
        current,
        history,
        wishlist
      }
    } = userInfo;
    const {
      id: bookId,
      title,
    } = book;
    try {
      const response = await axios.patch(`http://localhost:5000/users/${userId}`, 
      {
        reservations: {
          current: [...current, [bookId, title]],
          history: [...history], // remember to modify this field
          wishlist: [...wishlist], // remember to modify this field
        }
      });
      return response.data;
    }
    catch {

    }
  }
)

export const { logout, addToWishlist } = userSlice.actions;

export default userSlice.reducer;