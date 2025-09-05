import {AppConstant} from './AppConstant';

export const ApiRoutes = {
  login: AppConstant.BASEURL + '/api/auth/login', //complete
  forgotPassword: AppConstant.BASEURL + '/api/auth/forget-password', //complete
  varifyForgetOtp: AppConstant.BASEURL + '/api/auth/verify-forget-otp', //complete
  createForgetPassword:
    AppConstant.BASEURL + '/api/auth/create-forget-password', //complete
  getDoctorDetails: AppConstant.BASEURL + '/api/doctor/get-doctor-detail', //complete
  getAllAppointments:
    AppConstant.BASEURL + '/api/appointment/get-all-appointment', //complete

  getAllLatestAppointments:
    AppConstant.BASEURL + '/api/appointment/get-all-latest-appointment', //complete
  getAppointmentDetail:
    AppConstant.BASEURL + '/api/appointment/get-appointment-detail',
  getAllOfflineSlotes:
    AppConstant.BASEURL + '/api/doctor/get-all-doctor-clinic-slot', //complete
  getAllOnlineSlotes:
    AppConstant.BASEURL + '/api/doctor/get-doctor-online-slot', //complete

  addDoctorBankDetail:
    AppConstant.BASEURL + '/api/doctor/add-doctor-Bank-detail', //complete
  getAllDoctorMonthsSlot:
    AppConstant.BASEURL + '/api/doctor/get-doctor-months-slot', //complete
  getAllDoctorOnlineMonthSlot:
    AppConstant.BASEURL + '/api/doctor/get-doctor-online-months-slot', //complete

  getLabsName: AppConstant.BASEURL + '/api/lab/get-lab-names', //complete

  rescheduleAppointment:
    AppConstant.BASEURL + '/api/doctor/reschedule-appointment', //complete

  addDoctorClinicSlot:
    AppConstant.BASEURL + '/api/doctor/add-doctor-clinic-slot',

  getDoctorAllClinic: AppConstant.BASEURL + '/api/doctor/get-doctor-all-clinic',

  getPurchasedSubscriptionPlan:
    AppConstant.BASEURL + '/api/package/get-purchased-subscription-plan', //complete

  addBasicProfile: AppConstant.BASEURL + '/api/doctor/add-doctor-basic-detail',

  addDoctorDocument: AppConstant.BASEURL + '/api/doctor/add-doctor-document',

  pauseSlot: AppConstant.BASEURL + '/api/doctor/pause-slot', //complete

  deleteDoctorClinic: AppConstant.BASEURL + '/api/doctor/delete-doctor-clinic', //complete

  addDoctorClinicDetail:
    AppConstant.BASEURL + '/api/doctor/add-doctor-clinic-detail',

  updateDoctorClinicDetail:
    AppConstant.BASEURL + '/api/doctor/update-doctor-clinic',

    updateFcmToken:AppConstant.BASEURL+"",

    getAllNotification:AppConstant.BASEURL+"/api/admin/get-all-notification"
};
