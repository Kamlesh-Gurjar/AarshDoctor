import {AppConstant} from './AppConstant';

export const ApiRoutes = {
  login: AppConstant.BASEURL + '/api/auth/login',
  forgotPassword: AppConstant.BASEURL + '/api/auth/forget-password',
  varifyForgetOtp: AppConstant.BASEURL + '/api/auth/verify-forget-otp',
  createForgetPassword:
    AppConstant.BASEURL + '/api/auth/create-forget-password',
  getDoctorDetails: AppConstant.BASEURL + '/api/doctor/get-doctor-detail',
  getAllAppointments:
    AppConstant.BASEURL + '/api/appointment/get-all-appointment',
  getAppointmentDetail:
    AppConstant.BASEURL + 'api/appointment/get-appointment-detail',
};
