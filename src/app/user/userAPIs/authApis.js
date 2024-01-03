import axios from "axios";


export const logInApi = (formData) => axios.post("/api/users/login", formData);
export const signUpApi = (formData) => axios.post("/api/users/register", formData);

export const otpVerify = (data)=>axios.post('/api/users/otpVerify',data)
