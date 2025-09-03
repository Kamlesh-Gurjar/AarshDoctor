import {combineReducers} from '@reduxjs/toolkit';
import userLogin from './reducer/LoginReducer';

import doctorDetailsSlice from './redux_slice/DoctorDetailsSlice';
const rootReducer = combineReducers({
  user: userLogin,
  doctorDetails: doctorDetailsSlice,
});

export default rootReducer;
