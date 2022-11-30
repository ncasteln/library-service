import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserBooks } from "../user/userSlice";

// NOTES
// The userId's place is the place for token?
// handle failed login

export interface IRegistration {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
}

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

interface IAuthState {
  isAuth: boolean;
  profile: IProfile;
  error: string;
}

const initialState: IAuthState = {
  isAuth: false,
  profile: {} as IProfile,
  error: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout () {
      return initialState;
    }
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      if (payload.reservations) {
        const { reservations, wishlist, ...profile } = payload;
        state.profile = profile;
      } else {
        state.profile = payload;
      }
      state.isAuth = true;
    });
    builder.addCase(registration.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.profile = payload;
    })
  },
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: {
    email: string;
    password: string;
  }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);
        if (response.data[0].role === 'user') {
          const { reservations, wishlist } = response.data[0];
          dispatch(setUserBooks({ reservations, wishlist }))
        }
        return response.data[0];
      }
    catch (error) {
      return rejectWithValue(`Login failed`)
    }
  }
);

export const registration = createAsyncThunk(
  'user/registration',
  async (formData: IRegistration, thunkAPI) => {
    try {
      const newUser: IProfile = {
        ...formData,
        id: nanoid(),
        // reservations: {
        //   current: [],
        //   history: [],
        // },
        role: 'user',
        location: {
          street: '',
          city: '',
          state: '',
          postcode: ''
        },
        picture: ''
      }
      const response = await axios.post(`http://localhost:5000/users`, newUser);
      return response.data;
    }
    catch (error) {
      console.error(`Registration error - ${error}`)
    }
  }
);

export const { logout } = authSlice.actions;

export default authSlice.reducer;