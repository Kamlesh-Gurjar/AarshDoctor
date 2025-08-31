import {combineReducers} from '@reduxjs/toolkit';
import userLogin from './reducer/LoginReducer';
// import AllDoctorslice from './reducer/AllDoctorSlice';
// import WishlistSlice from './reducer/WishlistSlice.';
import doctorDetailsSlice from './redux_slice/DoctorDetailsSlice';
const rootReducer = combineReducers({
  user: userLogin,
  doctorDetails: doctorDetailsSlice,

  // doctors: AllDoctorslice,
  // wishlist: WishlistSlice,
});

export default rootReducer;
