import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setProfile } from "../user/userSlice";

// NOTES
// The userId's place is the place for token?

interface IAuthState {
  isAuth: boolean;
  userId: null | string;
}

const initialState: IAuthState = {
  // isAuth: false,
  // userId: null,
  isAuth: true,
  userId: "2u0b2CGrt_XrT6nNIGKqw"
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
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true;
      state.userId = action.payload;
    });
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
      if (response.status === 200) {
        dispatch(setProfile(response.data[0]))
        return response.data[0].id;
      }
      return rejectWithValue(`login failed - response status ${response.status}`)
    }
    catch (error) {
      console.error(`Login error - ${error}`)
    }
  }
);

export const { logout } = authSlice.actions;

export default authSlice.reducer;