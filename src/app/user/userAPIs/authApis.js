import axios from "axios";

const API = axios.create({ baseURL: "/api/users" })

export const logInApi = (formData) => API.post("/login", formData);
export const signUpApi = (formData) => API.post("/register", formData);
export const getAllOrg = ()=>API.get('/organization')

// export const otpVerify = (data)=>API.post('/users/otpVerify',data)
export const forgotPassOTP = (otpEmail) => API.post('/forgotPass', { otpEmail })
export const resendOTP = (otpEmail) => API.post('/forgotPass', { otpEmail })
export const confirmOTPs = ( otp, otpEmail) => API.post('/forgotPass/checkOtp', { otp, otpEmail })
export const changePassOK = ( otpEmail, pass) => API.post('/forgotPass/changePass', { otpEmail, pass })
