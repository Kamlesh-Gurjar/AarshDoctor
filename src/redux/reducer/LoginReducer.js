import { createSlice } from "@reduxjs/toolkit";

const UserData = createSlice({
  name: 'users',
  initialState: {
    userData: null, // This will hold user details including address
    isLogin: false, // To track the login status
    token: null, // Store the user token
  },
  reducers: {
    userLogin: (state, action) => {
       return {
        ...state,
        token: action.payload?.data?.token, // Storing token from response
        userData: {
          ...state.userData, // Keep existing userData
          ...action.payload?.data, // Merge new user data (like OTP data)
          ...action.payload?.userData, // Merge address data
        },
        isLogin: true, // Mark user as logged in
      };
    },
    userLogout: (state) => {
      return {
        ...state,
        token: null,
        userData: null,
        isLogin: false,
      };
    },
  },
});

export const { userLogin, userLogout } = UserData.actions;
export default UserData.reducer;
