"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Forgot from '../components/Forgot';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import { logInApi } from '../userAPIs/authApis';
import { accessToken, userDetails } from '@/app/redux/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { loginSchema } from '@/app/schemas/authSchema';
function Page() {
    const router = useRouter();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false)

    const showHiddenPassword = () => {
        setVisiblePassword(!visiblePassword);
    }
    // const [formValues, setFormValues] = useState({
    //     email: '',
    //     password: '',
    // });
    const formValues = {
        email: '',
        password: '',
    };
    const initialValues = formValues
    const validationSchema = loginSchema
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, action) => {
            setLoading(true)
            try {
                const { data } = await logInApi(values)
                toast.success(data.message)
                dispatch(userDetails(data.user));
                dispatch(accessToken(data.token));
                router.push("/user/dashboard");
            } catch (error) {
                console.log(error.response.data.error, '-----------LoginForm failed');
                toast.error(error.response.data.error)
            }
            action.resetForm();
            setLoading(false)
        }
    })
    const handleForgot = () => {
        setPassword((prev) => !prev);
        setLoading(false);
    };
    return (
        <>
            <div className='h-screen bg-black text-center flex items-center justify-end'>
                <img
                    // src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a43592af6b9a40001bda44b_HomeCover.jpg"
                    src="/images/qweas.jpg"
                    alt=""
                    className='w-full h-full object-cover'
                />
                <div className='absolute md:w-[40%] p-5'>
                    <div className='border border-gray-400 rounded-md p-5 mr-10'>
                        <div className='flex items-center gap-5 justify-center'>
                            <img
                                className='h-16 rounded-full'
                                src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a460b2980557a00017cac78_logonav.png"
                                alt=""
                            />
                            <h1 className='text-2xl font-bold mb-4'>AMEYA360 World</h1>
                        </div>
                        {!password ? (
                            <form onSubmit={handleSubmit} id='signUpForm'>
                                <div className='text-left text-sm'>
                                    <label className='font-bold' htmlFor="email">Email</label>
                                    <input
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="email"
                                        className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.email ? 'border-red-500' : ''
                                            }`}
                                        id="email"
                                    />
                                </div>
                                {errors.email && touched.email ? (
                                    <p className="text-red-600 text-start text-sm">{errors.email}</p>
                                ) : null}
                                <div className='text-left text-sm relative'>
                                    <label className='font-bold' htmlFor="password">Password</label>
                                    <div className='relative'>
                                        <input
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                            type={visiblePassword ? "text" : "password"}
                                            className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.password ? 'border-red-500' : ''
                                                }`}
                                            id="password"
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
                                    </div>
                                </div>
                                {errors.password && touched.password ? (
                                    <p className="text-red-600 text-start text-sm">{errors.password}</p>
                                ) : null}

                                <div>
                                    <button type='submit' className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold' aria-label="Login Button">
                                        {loading ? <BeatLoader color='white' /> : 'Login'}
                                    </button>
                                </div>
                                <div className=' mt-5 text-sm'>
                                    <p className='text-white  cursor-pointer' onClick={handleForgot}>
                                        Forgot Password
                                    </p>
                                </div>
                                <div className=' mt-5'>
                                    <p className=' text-gray-300 cursor-pointer'>
                                        Need a new Account? <Link href='/user/register'><span className='font-bold cursor-pointer text-white'>Register</span></Link>
                                    </p>
                                </div>
                            </form>
                        ) : (
                            <Forgot setPassword={setPassword} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Page;













