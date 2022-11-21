import { createAsyncThunk, createSlice, current, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

// NOTES
// reserveBook() - no double bookings
// handle failed login
// every field of registratio need validation
// TS conditional?

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
  // reservations?: {
  //   current: string[];
  //   history: string[];
  // };
  // wishlist?: string[];
}

interface IUser {
  // profile: IProfile;
  reservations: null | string[];
  history: null | string[];
  wishlist: null | string[];
}

const initialState: IUser = {
  // profile: {} as IProfile,
  reservations: [],
  history: [],
  wishlist: [],
  // profile: {
  //   "id": "gqpkWp0ZwXTjbAb4VzNsA",
  //     "role": "admin",
  //     "email": "melissa.fleming@example.com",
  //     "location": {
  //       "street": "3655 manchester road",
  //       "city": "winchester",
  //       "state": "berkshire",
  //       "postcode": "YB2 8EJ"
  //     },
  //     "username": "goldenkoala410",
  //     "password": "sick",
  //     "first_name": "melissa",
  //     "last_name": "fleming",
  //     "picture": "/data/users/pictures/algolia/women/pragati.png"
  // }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setProfile (state, { payload }) {
    //   if (payload.role === 'user') {
    //     const { reservations, wishlist, ...profile } = payload;
    //     state.profile = profile;
    //   } else {
    //     state.profile = payload;
    //   }
    // },
    // resetUserState () {
    //   return initialState
    // }
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

export const { setUserBooks } = userSlice.actions;

export default userSlice.reducer;
