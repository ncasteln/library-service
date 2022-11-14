import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

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

export interface ILocation {
  location: {
    street: string;
    city: string;
    state: string;
    postcode: number | string | null;
  };
}

export interface IUserInfo extends ILogin, ILocation {
  id: string;
  reservations: {
    current: string[];
    history: string[];
  };
  wishlist: string[];
  username: string;
  role: string;
  first_name: string;
  last_name: string;
  picture: string;
}

interface IUser {
  userInfo: IUserInfo;
  responseStatus: 'init' | 'loading' | 'fulfilled' | 'rejected';
}

const initialState: IUser = {
  responseStatus: 'init',
  userInfo: {} as IUserInfo,
  // userInfo:
  // {
  //   "id": "2u0b2CGrt_XrT6nNIGKqw",
  //   "role": "user",
  //   "reservations": {
  //     "current": [
  //       "mqdUyS5Z8sOdvtPQEI9ry",
  //         "fpNFiKI7KtCkoLfJWKfGq"
  //     ],
  //     "history": [
  //       "mqdUyS5Z8sOdvtPQEI9ry",
  //         "fpNFiKI7KtCkoLfJWKfGq"
  //     ]
  //   },
  //   "wishlist": [
  //     "FDoEBDPO6VClej6ugRf9z",
  //       "fA5zMWMP_CDOAbJks2YTh",
  //       "NoNhHHVDx08UXBiKdSnCu"
  //   ],
  //   "email": "christoffer.christiansen@example.com",
  //   "location": {
  //     "street": "3391 pilevangen",
  //     "city": "overby lyng",
  //     "state": "danmark",
  //     "postcode": 88520
  //   },
  //   "username": "smallbird985",
  //   "password": "samuel",
  //   "first_name": "christoffer",
  //   "last_name": "christiansen",
  //   "picture": "/data/users/pictures/algolia/men/lucas.png"
  // }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout () {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.responseStatus = 'loading';
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.userInfo = payload[0];
      state.responseStatus = 'fulfilled';
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
    });
    // Wishlist
    builder.addCase(addToWishlist.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.responseStatus = 'fulfilled';
    });
    builder.addCase(removeFromWishlist.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.responseStatus = 'fulfilled';
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
        id: nanoid(),
        reservations: {
          current: [],
          history: [],
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
  async ({ bookId, userId, reservations }: {
    bookId: string;
    userId: string;
    reservations: {
      current: string[];
      history: string[];
    }
  }, thunkAPI) => {
    try {
      const response = await axios.patch(`http://localhost:5000/users/${userId}`, 
      {
        reservations: {
          current: [...reservations.current, bookId],
          history: [...reservations.history, bookId],
        }
      });
      return response.data;
    }
    catch (error) {
      console.error(error)
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'user/addToWishlist',
  async ({ bookId, userId, wishlist }: {
    bookId: string;
    userId: string;
    wishlist: string[];
  }) => {
    try {
      const response = await axios.patch(`http://localhost:5000/users/${userId}`, 
      {
        wishlist: [...wishlist, bookId]
      });
      return response.data;
    }
    catch (error) {

    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'user/removeFromWishlist',
  async ({ userId, newWishlist }: {
    userId: string;
    newWishlist: string[];
  }) => {
    try {
      const response = await axios.patch(`http://localhost:5000/users/${userId}`,
      {
        wishlist: newWishlist 
      });
      return response.data;
    }
    catch (error) {

    }
  }
);

export const { logout } = userSlice.actions;

export default userSlice.reducer;
