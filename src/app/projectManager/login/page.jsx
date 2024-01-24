"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { pmLogInApi } from '../pmAPIs/authApis'
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import { accessToken, pmDetails } from '@/app/redux/projectManager/pmSlice'
import { useFormik } from 'formik';
import { loginSchema } from '@/app/schemas/authSchema';

function page() {
    const dispatch = useDispatch()
    const router = useRouter();
    const [password, setPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    //formik
    const formValues = {
        email: '',
        password: '',
    };
    const initialValues = formValues
    const validationSchema = loginSchema

    const showHiddenPassword = () => {
        setVisiblePassword(!visiblePassword)
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, action) => {
            setLoading(true)
            try {
                console.log(values,'formik')
                const { data } = await pmLogInApi(values)
                dispatch(pmDetails(data.user));
                dispatch(accessToken(data.token));
                toast.success(data.message)
                router.push("/projectManager/home")
                setLoading(false)
            } catch (error) {
                toast.error(error.response.data.error)
                console.log(error)
                setLoading(false)
            }
        }
    })
    return (
        <div className='h-screen bg-black text-center flex items-center justify-end'>
            <img
                src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a436d5b115b2f0001334968_AffordableHousing.jpg"
                alt=""
                className='w-full h-full object-cover'
            />
            <div className='absolute md:w-[40%] p-5'>
                <div className='border border-gray-400 rounded-md p-5 mr-10'>
                    <div className='flex items-center gap-5 justify-center'>
                        <img
                            className='h-16'
                            src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a460b2980557a00017cac78_logonav.png"
                            alt=""
                        />
                        <h1 className='text-2xl font-bold mb-4'>Project Manager</h1>
                    </div>
                    {!password ? (
                        <form onSubmit={handleSubmit} id='signUpForm'>
                            <div className='text-left text-sm'>
                                <label className='font-bold' htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md 
                                `}
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {errors.email && touched.email ? (
                                    <p className="text-red-600 text-start text-sm">{errors.email}</p>
                                ) : null}
                            <div className='text-left text-sm'>
                                <label className='font-bold' htmlFor="password">Password</label>
                                <div className="relative">
                                    <input
                                        type={visiblePassword ? "text" : "password"}
                                        className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md 
                                `}
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                     <div
                                            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                                            onClick={showHiddenPassword}
                                        >
                                            {visiblePassword ?
                                                <IoIosEye />
                                                : <IoIosEyeOff />
                                            }
                                        </div>
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                                        onClick={showHiddenPassword}
                                    >
                                        {visiblePassword ? <IoIosEye /> : <IoIosEyeOff />}
                                    </div>
                                </div>
                            </div>
                            {errors.password && touched.password ? (
                                    <p className="text-red-600 text-start text-sm">{errors.password}</p>
                                ) : null}
                            <div>
                                <button type='submit' className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold' >
                                    {loading ? <BeatLoader color='white' /> : 'Login'}
                                </button>
                            </div>
                            <div className=' mt-5 text-sm'>
                                <p className='text-black underline font-bold cursor-pointer' >
                                    Forgot Password
                                </p>
                            </div>

                        </form>
                    ) : (
                        <>
                            <div className='text-left text-sm'>
                                <label className='font-bold' htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                    name="email"
                                    id="email"
                                />
                            </div>
                            <div className='flex justify-between mt-5 text-sm'>
                                <p className='text-black font-bold underline cursor-pointer'>Resend OTP</p>
                                <p className='text-black font-bold underline cursor-pointer' >
                                    Cancel
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
export default page