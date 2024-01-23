import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { changePassOK, confirmOTPs, forgotPassOTP, resendOTP } from '../userAPIs/authApis';
const Forgot = ({ setPassword }) => {
    const [loading, setLoading] = useState(false);
    const [otpVerify, setOtpVerify] = useState(false)
    const [changePass, setChangePass] = useState(false)
    const [pass, setPass] = useState({
        password: '',
        confirmPassword: ''
    })
    const [otp, setOtp] = useState("")
    const [otpEmail, setOtpEmail] = useState("")
    const [errors, setErrors] = useState({});
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // At least 8 characters, one lowercase, one uppercase, and one number
    const handleSentOTP = async (e) => {
        e.preventDefault()
        try {
            if (!otpEmail.match(emailRegex)) {
                return toast.error('Please enter Registered email');
            }
            setLoading(true);
            const response = await forgotPassOTP(otpEmail)
            if (response.data.success) {
                toast.success(response.data.message);
            }
            setLoading(false);
            setOtpVerify(true)
        } catch (error) {
            // setOtpEmail('')
            console.log(error, '----55------error')
            toast.error(error.response.data.error);
            setLoading(false);
        }
    }
    const confirmOTP = async (e) => {
        e.preventDefault()
        try {
            if (otp) {
                setLoading(true);
                const response = await confirmOTPs(otp, otpEmail)
                if (response.data.success) {
                    toast.success(response.data.message);
                }
                setLoading(false);
                setOtpVerify(true)
                setChangePass(true)
            } else {
                toast.error("Please enter OTP");
            }
        } catch (error) {
            setOtp("")
            toast.error(error.response.data.error);
            console.log(error, '-----------error')
            setLoading(false);
        }
    }
    const validatePassword = () => {
        const newErrors = {};
        if (!pass.password.match(passwordRegex)) {
            newErrors.password = 'Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, and one number';
        }
        if (pass.password !== pass.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const handlePassChange = async (e) => {
        e.preventDefault()
        try {
            if (validatePassword()) {
                const response = await changePassOK(otpEmail, pass)
                toast.success(response.data.message);
                setPass({
                    password: '',
                    confirmPassword: '',
                })
                handleForgot()
            }
        } catch (error) {
            console.log(error, '-------------error')
            toast.error(error.response.data.error);
        }
    }
    const handleResentOTP = async (e) => {
        e.preventDefault()
        try {
            setOtp('')
            setLoading(true);
            const response = await resendOTP(otpEmail)
            if (response.data.success) {
                toast.success(response.data.message);
            }
            setLoading(false);
        } catch (error) {
            console.log(error, '----55------error')
            toast.error(error.response.data.error);
            setLoading(false);
        }
    }
    const handleForgot = () => {
        setPassword((prev) => !prev);
        setOtpVerify(false)
        setLoading(false);
        setChangePass(false)
    };
    return (
        <form onSubmit={!otpVerify ? handleSentOTP : !changePass ? confirmOTP : handlePassChange} className='mt-2' >
            {changePass ?
                <>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="email">New Password</label>
                        <input
                            type="password"
                            className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.password ? 'border-red-500' : ''} `}
                            id="email"
                            value={pass.password}
                            onChange={(e) => setPass({ ...pass, password: e.target.value })}
                        />
                        {errors.password && <p className='text-red-500'>{errors.password}</p>}
                    </div>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="email">Confirm New Password</label>
                        <input
                            type="password"
                            className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.confirmPassword ? 'border-red-500' : ''
                                }`}
                            id="email"
                            value={pass.confirmPassword}
                            onChange={(e) => setPass({ ...pass, confirmPassword: e.target.value })}
                        />
                        {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword}</p>}
                    </div>
                </>
                : <div className='text-left text-sm'>
                    <label className='font-bold' htmlFor={!otpVerify ? "email" : "otp"}>{!otpVerify ? "Email" : "OTP"}</label>
                    <input
                        type={!otpVerify ? "email" : "text"}
                        className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md mt-2
                    ${!otpVerify ? "" : "font-extrabold text-center tracking-widest text-lg"} `}
                        name={!otpVerify ? "email" : "otp"}
                        id={!otpVerify ? "email" : "otp"}
                        placeholder={!otpVerify ? "Email" : "OTP"}
                        onChange={(e) => !otpVerify ?
                            setOtpEmail(e.target.value)
                            : setOtp(e.target.value)}
                        value={!otpVerify ? otpEmail : otp}
                        maxLength={otpVerify ? 4 : undefined} // Limit to 4 characters for OTP
                    />
                </div>
            }
            <div className='flex justify-between items-center mt-5 text-sm'>
                <button
                    type='submit'
                    className='bg-gray-900 text-white w-full rounded-md px-2 py-2 text-center font-bold'
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    {loading ? <BeatLoader color='white' /> : !otpVerify ? "Send OTP" : changePass ? "Set New Password" : "Verify OTP"}
                </button>
            </div>
            <div className="flex justify-end mt-2">
                {otpVerify ?
                    (
                        <p className='text-black font-bold underline cursor-pointer text-sm' onClick={handleResentOTP} >
                            Resend OTP
                        </p>
                    )
                    : null}
                <p className='text-black font-bold underline cursor-pointer ml-auto text-sm' onClick={handleForgot}>
                    Cancel
                </p>
            </div>
        </form>
    )
}
export default Forgot