// doctorDetailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state is an empty object (can hold any doctor details dynamically)
const initialState = {};

const doctorDetailsSlice = createSlice({
  name: 'doctorDetails',
  initialState,
  reducers: {
    // Replaces the entire state with the new object
    setDoctorDetails: (state, action) => {
      return { ...action.payload };
    },
    // Merges/updates only the provided fields without removing existing ones
    updateDoctorDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    // Clears all doctor details (resets to empty object)
    clearDoctorDetails: () => {
      return {};
    },
  },
});

// Export actions
export const { setDoctorDetails, updateDoctorDetails, clearDoctorDetails } =
  doctorDetailsSlice.actions;

// Export reducer
export default doctorDetailsSlice.reducer;
