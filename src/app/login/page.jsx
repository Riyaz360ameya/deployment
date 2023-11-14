"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const notify = () => toast("Login successful!");

    const [errors, setErrors] = useState({});

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const validateInput = () => {
        const newErrors = {};

        if (!user.email.match(emailRegex)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!user.password) {
            newErrors.password = 'Please enter your password';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const onLogin = async (e) => {
        e.preventDefault()
        if (validateInput()) {
            try {
                setLoading(true);
                const response = await axios.post("/api/users/login", user);
                notify()
                console.log("Login successful");
                router.push("/client");
            } catch (error) {
                console.log("Login failed", error.message);
                toast.error('Login failed. Please check your credentials.');

            } finally {
                setLoading(false);
            }
        } else {
            toast.error('Please correct the form errors.');
        }
    };

    const handleForgot = () => {
        setPassword((prev) => !prev);
    };

    return (
        <>
            <ToastContainer autoClose={2000} />
            <div className='h-screen bg-black text-center flex items-center justify-end'>

                <img
                    src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a43592af6b9a40001bda44b_HomeCover.jpg"
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
                            <h1 className='text-2xl font-bold mb-4'>AMEYA360 World</h1>
                        </div>
                        {!password ? (
                            <>
                                <div className='text-left text-sm'>
                                    <label className='font-bold' htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.email ? 'border-red-500' : ''
                                            }`}
                                        id="email"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                    {errors.email && <p className='text-red-500'>{errors.email}</p>}
                                </div>
                                <div className='text-left text-sm'>
                                    <label className='font-bold' htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.password ? 'border-red-500' : ''
                                            }`}
                                        id="password"
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    />
                                    {errors.password && <p className='text-red-500'>{errors.password}</p>}
                                </div>
                                <div>
                                    <button className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold' onClick={onLogin}>
                                        {loading ? <BeatLoader color='white' /> : 'Login'}
                                    </button>
                                </div>
                                <div className=' mt-5 text-sm'>
                                    <p className='text-gray-500 underline cursor-pointer' onClick={handleForgot}>
                                        Forgot Password
                                    </p>
                                </div>
                                <div className=' mt-5 text-sm'>
                                    <p className='text-gray-500 underline cursor-pointer'>
                                        Need a new Account? <Link href='/register'><span className='font-bold cursor-pointer text-black'>Register</span></Link>
                                    </p>
                                </div>
                            </>
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
                                    <p className='text-black font-bold underline cursor-pointer' onClick={handleForgot}>
                                        Cancel
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div></>
    );
}

export default Page;


















