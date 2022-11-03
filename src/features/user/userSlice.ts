import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBook } from '../catalogue/catalogueSlice';
 
// NOTES
// Registration is a POST action - only possible with backend
// signUp function is not real-world-correct
// Some state keys, MAYBE are not useful

// LOGIN : send the data and GET simply from .json and related renders
// POST : simulate the irgendwie the process, with renders
  // LOADING-animation, 
  // SUCCESS
  // FAILURE

interface ILogin {
  email: string;
  password: string;
}

interface IuserInfo extends ILogin {
  id: number;
  username: string;
  role: string;
  first_name: string;
  last_name: string;
  location: {
    street: string;
    city: string;
    state: string;
    postcode: number | string;
  };
  picture: string;
  wishlist: IBook[];
}

interface IUser {
  loading: boolean;
  userInfo: IuserInfo;
  token: string;
}

const initialState: IUser = {
  loading: false,
  userInfo: {} as IuserInfo, // ??????? correct ??????? ???????????
  token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout () {
      return initialState;
    },
    addToWishlist (state, action) {
      state.userInfo.wishlist.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {

    });
    builder.addCase(signUp.fulfilled, (state) => {

    });
    builder.addCase(signUp.rejected, (state) => {

    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const signUp = createAsyncThunk(
  'user/signUp',
  async (signUpData: string, { rejectWithValue }) => {
    try {
      const response = await fetch('./data/users/userData.json');
      if (response.status !== 200) {
        return rejectWithValue(`signUp failed - response status: ${response.status}`)
      }
      else {
        const data = await response.json();
        const alreadyExist = data.some((item: IuserInfo) => item.email === signUpData)
        if (alreadyExist) {
          console.log('The email is already been used')
        }
        else {
          console.log(`Successful registration`)
          return data;
        }
      }
    }
    catch (error) {
      console.error(`Catched error - ${error}`)
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: ILogin, { rejectWithValue }) => {
    try {
      const response = await fetch('./data/users/userData.json');
      if (response.status === 200) {
        const data = await response.json();
        const user = data.find((item: IuserInfo) => {
          return item.email === email && item.password === password;
        });
        return user;
      }
      else {
        return rejectWithValue(`login failed - response status: ${response.status}`)
      }
    }
    catch (error) {
      console.error(`Catched error - ${error}`)
    }
  }
)

export const { logout, addToWishlist } = userSlice.actions;

export default userSlice.reducer;