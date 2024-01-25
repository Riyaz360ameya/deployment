"use client"
import React, { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import { loginSchema } from '@/app/schemas/authSchema';
import { devLogInApi } from '../devApis/authApi'
import { accessToken, developerDetails } from '@/app/redux/developer/developerSlice'

function page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const formValues = {
        email: '',
        password: '',
    };
    const initialValues = formValues
    const validationSchema = loginSchema

    const showHiddenPassword = () => {
        setVisiblePassword(!visiblePassword);
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, action) => {
            try {
                setLoading(true)
                const { data } = await devLogInApi(values);
                dispatch(developerDetails(data.user))
                dispatch(accessToken(data.token));
                toast.success(data.message)
                router.push("/developer/home")
                setLoading(false)
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.error)
                setLoading(false)
            }
        }
    })
  
    return (
        <div className='h-screen bg-black text-center flex items-center justify-end'>
            <img
                src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a436d6080557a000178b2a6_Exterior002-p-1080.jpeg"
                alt=""
                className='w-full h-full object-cover'
            />
            <div className='absolute md:w-[40%] p-5'>
                <div className='border border-gray-400 rounded-md p-5 mr-5'>
                    <div className='flex items-center gap-5 justify-center'>
                        <img
                            className='h-16'
                            src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a460b2980557a00017cac78_logonav.png"
                            alt=""
                        />
                        <h1 className='text-2xl font-bold mb-4'>Developer </h1>
                    </div>
                  <form onSubmit={handleSubmit} id='signUpForm'>
                  <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="email">Email</label>
                        <input
                            type="text"
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
                                    <IoIosEye /> :
                                    <IoIosEyeOff />
                                }
                            </div>
                        </div>
                    </div>
                    {errors.password && touched.password ? (
                                    <p className="text-red-600 text-start text-sm">{errors.password}</p>
                                ) : null}
                    <div>
                        <button className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold'>
                            {loading ? <BeatLoader color='white' /> : 'Login'}
                        </button>
                    </div>
                    <div className=' mt-5 text-sm'>
                        <p className='text-black underline font-bold cursor-pointer' >
                            Forgot Password
                        </p>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    )
}
export default page