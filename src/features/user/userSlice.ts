import { createAsyncThunk, createSlice, current, nanoid } from "@reduxjs/toolkit";
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
  street: string;
  city: string;
  state: string;
  postcode: number | string | null;
}

export interface IProfile {
  id: string;
  email: string;
  password: string;
  username: string;
  role: string;
  first_name: string;
  last_name: string;
  picture: string;
  location: ILocation;
}

interface IUser {
  profile: IProfile;
  reservations: string[];
  history: string[];
  wishlist: string[];
}

const initialState: IUser = {
  // profile: {} as IProfile,
  // reservations: [],
  // history: [],
  // wishlist: [],
  profile: {
    id: "2u0b2CGrt_XrT6nNIGKqw",
    "role": "user",
    "email": "christoffer.christiansen@example.com",
    "location": {
      "street": "3391 pilevangen",
      "city": "overby lyng",
      "state": "danmark",
      "postcode": 88520
    },
    "username": "smallbird985",
    "password": "samuel",
    "first_name": "christoffer",
    "last_name": "christiansen",
    "picture": "/data/users/pictures/algolia/men/lucas.png"
  },
  reservations: [
    "mqdUyS5Z8sOdvtPQEI9ry",
    "fpNFiKI7KtCkoLfJWKfGq",
    "naukiyPKmYYc4n26L6uRD"
  ],
  history: [
    "mqdUyS5Z8sOdvtPQEI9ry",
    "fpNFiKI7KtCkoLfJWKfGq",
    "naukiyPKmYYc4n26L6uRD"
  ],
  wishlist: [
    "mqdUyS5Z8sOdvtPQEI9ry",
    "GTAdv0djI5WAEbReUrvK2",
    "FDoEBDPO6VClej6ugRf9z",
    "fA5zMWMP_CDOAbJks2YTh",
  ]
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile (state, { payload }) {
      state.profile = payload;
      state.reservations = payload.reservations.current;
      state.history = payload.reservations.history;
      state.wishlist = payload.wishlist;
    },
    resetUserState () {
      return initialState
    }
  },
  extraReducers: (builder) => {
  //   builder.addCase(registration.pending, (state) => {
  //     state.responseStatus = 'loading'
  //   });
  //   builder.addCase(registration.fulfilled, (state, { payload }) => {
  //     state.responseStatus = 'fulfilled';
  //   });
  //   builder.addCase(registration.rejected, (state) => {
  //     state.responseStatus = 'rejected'
  //   });
    builder.addCase(reserve.fulfilled, (state, { payload }) => {
      state.reservations = payload;
    });
    builder.addCase(updateWishlist.fulfilled, (state, { payload }) => {
      state.wishlist = payload;
    });
  }
});

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

export const { setProfile, resetUserState } = userSlice.actions;

export default userSlice.reducer;
