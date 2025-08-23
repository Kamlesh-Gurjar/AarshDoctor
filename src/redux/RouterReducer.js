import {combineReducers} from '@reduxjs/toolkit';
import userLogin from './reducer/LoginReducer';
import AllDoctorslice from './reducer/AllDoctorSlice';
import WishlistSlice from './reducer/WishlistSlice.';
const rootReducer = combineReducers({
  user: userLogin,
  doctors: AllDoctorslice,
  wishlist: WishlistSlice,
});

export default rootReducer;
