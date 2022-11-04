import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBook } from '../catalogue/catalogueSlice';
 
// NOTES
// reserveBook() - no double bookings
// initialState userInfo doubts
// Registration is a POST action - how to simulate?

interface ILogin {
  email: string;
  password: string;
}

interface IUserInfo extends ILogin {
  id: number;
  reservations: {
    current: IBook[];
    toValidate: IBook[];
  };
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
  userInfo: IUserInfo;
}

const initialState: IUser = {
  loading: false,
  userInfo: {} as IUserInfo
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout () {
      return initialState;
    },
    reserveBook (state, action) {
      console.log(`${action.payload.title} need validation from Admin`);
      state.userInfo.reservations.toValidate.push(action.payload);
    },
    addToWishlist (state, action) {
    }
  },
  extraReducers: (builder) => {
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

// export const signUp = createAsyncThunk(
//   'user/signUp',
//   async (signUpData: string, { rejectWithValue }) => {
//     try {
//       const response = await fetch('./data/users/userData.json');
//       if (response.status !== 200) {
//         return rejectWithValue(`signUp failed - response status: ${response.status}`)
//       }
//       else {
//         const data = await response.json();
//         const alreadyExist = data.some((item: IUserInfo) => item.email === signUpData)
//         if (alreadyExist) {
//           console.log('The email is already been used')
//         }
//         else {
//           console.log(`Successful registration`)
//           return data;
//         }
//       }
//     }
//     catch (error) {
//       console.error(`Catched error - ${error}`)
//     }
//   }
// );

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: ILogin, { rejectWithValue }) => {
    try {
      const response = await fetch('./data/users/userData.json');
      if (response.status === 200) {
        const data = await response.json();
        const user = data.find((item: IUserInfo) => {
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

export const { reserveBook, logout, addToWishlist } = userSlice.actions;

export default userSlice.reducer;