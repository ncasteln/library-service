import { createAsyncThunk, createSlice, Dispatch, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserBooks, setUserBooks } from "../user/userBooksSlice";

// NOTES
// The userId's place is the place for token?
// handle failed login

interface IError {
  errorMessage: string;
}

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

export interface IAdminProfile {
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

interface IUserProfile extends IAdminProfile, IUserBooks {};

type Profile = IUserProfile | IAdminProfile;

interface IAuthState {
  isAuth: boolean;
  profile: Profile;
  error: string | null;
}

const initialState: IAuthState = {
  isAuth: false,
  profile: {} as Profile,
  error: null
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
      state.profile = payload;
      state.isAuth = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      if (typeof payload === 'string') {
        state.error = payload;
      }
    });
    builder.addCase(registration.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.profile = payload;
    })
  },
});

export const login = createAsyncThunk<
  Profile,
  { 
    email: string;
    password: string;
  },
  {
    rejectValue: string;
    dispatch: Dispatch;
  }
>(
  'auth/login',
  async ({ email, password }: {
    email: string;
    password: string;
  }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`http://localhost:5000/users?email=${email}&password=${password}`);
      if (response.data.length === 0) {
        return rejectWithValue(`Login failed - no match`)
      }
      if (response.data[0].role === 'user') {
        const { reservations, wishlist, ...profile } = response.data[0];
        dispatch(setUserBooks({ reservations, wishlist }));
        return profile;
      }
      else {
        return response.data[0];
      }
    }
    catch (error) {
      return rejectWithValue(`Login failed`)
    }
  }
);

export const registration = createAsyncThunk(
  'user/registration',
  async (formData: IRegistration) => {
    try {
      const newUser: IAdminProfile = {
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