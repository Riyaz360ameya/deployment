"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { signUpApi } from '../userAPIs/authApis';
import { useFormik } from 'formik';
import { signUpSchema } from '@/app/schemas/authSchema';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';



function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        organization: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const initialValues = formValues
    const validationSchema = signUpSchema
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, action) => {
            setLoading(true)
            try {
                console.log(values, '-----------------signUp values')
                const { data } = await signUpApi(values)
                console.log(data, '------------------')
                router.push("/user/login");
            } catch (error) {
                toast.error(error.response.data.message)
                console.log(error, 'Login failed');
            }
            action.resetForm();
            console.log('before reset')
            setLoading(false)
        }
    })
    const showHiddenPassword = () => {
        setVisiblePassword(!visiblePassword);
    }
    return (
        <div className='h-screen bg-white text-center flex items-center justify-end'>
            <img src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a43592af6b9a40001bda44b_HomeCover.jpg" alt="" className='w-full h-full object-cover' />
            <div className='absolute md:w-[40%] p-5'>
                <div className='border border-gray-400 rounded-md p-5 mr-10 shadow-2xl'>
                    <div className='flex items-center gap-5 justify-center'>
                        <img className='h-16' src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a460b2980557a00017cac78_logonav.png" alt="" />
                        <h1 className='text-2xl font-bold mb-4'>AMEYA360 World</h1>
                    </div>
                    <form onSubmit={handleSubmit} id='loginForm'>
                        <div className='flex justify-between gap-2'>
                            <div className='text-left text-sm w-1/2'>
                                <label className='font-bold' htmlFor="email">First Name</label>
                                <input
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    type="text"
                                    className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.firstName ? 'border-red-500' : ''}`}

                                    id="firstName"
                                />
                                {errors.firstName && touched.firstName ? (
                                    <p className="text-red-600 text-start text-sm">{errors.firstName}</p>
                                ) : null}
                            </div>
                            <div className='text-left text-sm w-1/2'>
                                <label className='font-bold' htmlFor="email">Last Name</label>
                                <input
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    type="text"
                                    className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.lastName ? 'border-red-500' : ''
                                        }`}
                                    id="lastName"
                                />
                                {errors.lastName && touched.lastName ? (
                                    <p className="text-red-600 text-start text-sm">{errors.lastName}</p>
                                ) : null}
                            </div>
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="organization">Organization</label>
                            <input
                                value={values.organization}
                                onChange={handleChange}
                                onBlur={handleBlur}

                                type="text"
                                className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.organization ? 'border-red-500' : ''
                                    }`}
                                id="organization"
                            />
                        </div>
                        {errors.organization && touched.organization ? (
                            <p className="text-red-600 text-start text-sm">{errors.organization}</p>
                        ) : null}
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
                        <div className='text-left text-sm relative'>
                            <label className='font-bold' htmlFor="password">Confirm Password</label>
                            <div className='relative'>
                                <input
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    type={visiblePassword ? "text" : "password"}
                                    className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.confirmPassword ? 'border-red-500' : ''
                                        }`}
                                    id="confirmPassword"
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
                            </div >
                        </div>
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <p className="text-red-600 text-start text-sm">{errors.confirmPassword}</p>
                        ) : null}
                        <div>
                            <button type='submit' className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold' aria-label="Login Button">
                                {loading ? <BeatLoader color='white' /> : 'Register'}
                            </button>
                        </div>
                        <div className=' mt-5'>
                            <p className='text-gray-500 underline cursor-pointer'>
                                Already have an account? <Link href='/user/login'><span className='font-bold text-black'>Login</span></Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;




