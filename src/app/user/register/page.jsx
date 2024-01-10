"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BeatLoader } from 'react-spinners';

import { toast } from 'sonner';
import { signUpApi } from '../userAPIs/authApis';


function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        organization: ''
    });
    const [errors, setErrors] = useState({}); // To store validation errors
    // Validation functions
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // At least 8 characters, one lowercase, one uppercase, and one number

    const validateInput = () => {
        const newErrors = {};

        if (!user.firstName.match(nameRegex)) {
            newErrors.firstName = 'Please enter a valid first name';

        }
        if (!user.lastName.match(nameRegex)) {
            newErrors.lastName = 'Please enter a valid last name';
        }
        if (!user.organization) {
            newErrors.organization = 'Please enter your organization';
        }
        if (!user.email.match(emailRegex)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!user.password.match(passwordRegex)) {
            newErrors.password = 'Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, and one number';
        }
        if (user.password !== user.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);

        // Check if there are any errors
        return Object.keys(newErrors).length === 0;
    };
    const onRegister = async (e) => {
        e.preventDefault();
        if (validateInput()) {
            try {
                setLoading(true);
                const { data } = await signUpApi(user)
                console.log(data, '-------------------data')
                toast.success(data.message)
                // Proceed with user registration
                router.push("/user/login");
            } catch (error) {
                console.log("Login failed-----------", error);
                toast.error(error.response.data.error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className='h-screen bg-white text-center flex items-center justify-end'>
            <img src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a43592af6b9a40001bda44b_HomeCover.jpg" alt="" className='w-full h-full object-cover' />
            <div className='absolute md:w-[40%] p-5'>
                <div className='border border-gray-400 rounded-md p-5 mr-10 shadow-2xl'>
                    <div className='flex items-center gap-5 justify-center'>
                        <img className='h-16' src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a460b2980557a00017cac78_logonav.png" alt="" />
                        <h1 className='text-2xl font-bold mb-4'>AMEYA360 World</h1>
                    </div>
                    <div className='flex justify-between gap-2'>
                        <div className='text-left text-sm w-1/2'>
                            <label className='font-bold' htmlFor="firstName">First Name</label>
                            <input
                                type='text'
                                className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.firstName ? 'border-red-500' : ''}`}
                                value={user.firstName}
                                id='firstName'
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                required
                            />
                            {errors.firstName && <p className='text-red-500'>{errors.firstName}</p>}
                        </div>
                        <div className='text-left text-sm w-1/2'>
                            <label className='font-bold' htmlFor="lastName">Last Name</label>
                            <input
                                type='text'
                                className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.lastName ? 'border-red-500' : ''}`}
                                id='lastName'
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                required
                            />
                            {errors.lastName && <p className='text-red-500'>{errors.lastName}</p>}
                        </div>
                    </div>

                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="organization">Organization</label>
                        <input
                            type='text'
                            className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.organization ? 'border-red-500' : ''}`}
                            id="organization"
                            value={user.organization}
                            onChange={(e) => setUser({ ...user, organization: e.target.value })}
                            required
                        />
                        {errors.organization && <p className='text-red-500'>{errors.organization}</p>}
                    </div>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="email">Email</label>
                        <input
                            type='text'
                            className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                        />
                        {errors.email && <p className='text-red-500'>{errors.email}</p>}
                    </div>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="password">Password</label>
                        <input
                            type='password'
                            className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.password ? 'border-red-500' : ''}`}
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required
                        />
                        {errors.password && <p className='text-red-500'>{errors.password}</p>}
                    </div>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type='password'
                            className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            required
                        />
                        {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword}</p>}
                    </div>
                    <div>
                        <button className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold' onClick={onRegister}>
                            {loading ? <BeatLoader color='white' /> : "Register"}
                        </button>
                    </div>
                    <div className=' mt-5'>
                        <p className='text-gray-500 underline cursor-pointer'>
                            Already have an account? <Link href='/user/login'><span className='font-bold text-black'>Login</span></Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;




