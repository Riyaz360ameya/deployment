import React from 'react'
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { BeatLoader } from 'react-spinners';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import { toast } from 'react-toastify';
import { addDev, addTeamLead } from '../pmAPIs/taskApis';
const Authorization = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [post, setPost] = useState("Team Lead")
    const addRoles = ["WHITE RENDERING", "TEXTURE & LIGHTNING", "8K RENDERS", "PREVIEW", "LIGHTNING", "ANIMATION", "SHORT DIVISION", "FINAL RENDERS"]
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        designation: '',
        roles: []
    });
    const resetUser = () => {
        setUser({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            designation: '',
            roles: []
        })
    }
    const [errors, setErrors] = useState({}); // To store validation errors
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
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
        if (!user.designation) {
            newErrors.position = 'Please enter designation';
        }
        if (!user.roles) {
            newErrors.position = 'Please select roles';
        }
        if (!user.email.match(emailRegex)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!user.password.match(passwordRegex)) {
            newErrors.password = 'Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, and one number';
        }
        setErrors(newErrors);
        // Check if there are any errors
        return Object.keys(newErrors).length === 0;
    };
    const onRegister = async (e) => {
        e.preventDefault();
        if (validateInput()) {
        try {
            // setLoading(true);
            console.log(user, '---------------all input of the new lead or dev')
            const { data } = await (post === "Team Lead" ? addTeamLead(user) : addDev(user));
            console.log(data, '----------data')
            toast.success(data.message)
            resetUser()
        } catch (error) {
            console.log("register failed", error);
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
        }
    };
    const handlePost = (name) => {
        console.log(name, '-------name')
        setPost(name)
        resetUser()
    }
    return (
        <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden' >
            <div className='flex items-center justify-around'>
                <div className='border bg-orange-700 text-white p-5 rounded cursor-pointer' onClick={() => handlePost('Team Lead')}>
                    <div className='flex items-center justify-between gap-3' >
                        <FaPlus />
                        Team Lead
                    </div>
                </div>
                <div className='border bg-blue-700 text-white p-5 rounded cursor-pointer' onClick={() => handlePost('Developer')} >
                    <div className='flex items-center justify-between gap-3'>
                        <FaPlus />
                        Developer
                    </div>
                </div>
            </div>
            <div className='flex flex-col  items-center mt-5'>
                <form onSubmit={onRegister} className='w-1/2'>
                    <h1 className='text-lg font-bold'>{post === "Team Lead" ? "Team Lead Details" : "Developer Details"}</h1>
                    <div className='flex justify-between gap-2 mt-2'>
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
                        <label className='font-bold' htmlFor="designation">Designation</label>
                        <input
                            type='text'
                            className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.designation ? 'border-red-500' : ''}`}
                            id="designation"
                            value={user.designation}
                            onChange={(e) => setUser({ ...user, designation: e.target.value })}
                            required
                        />
                        {errors.designation && <p className='text-red-500'>{errors.designation}</p>}
                    </div>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="roles">Choose roles <span className='text-slate-500'>( ctrl + any of below )</span></label>
                        <select
                            name='roles'
                            id='roles'
                            value={user.roles}
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            onChange={(e) => setUser({ ...user, roles: Array.from(e.target.selectedOptions, option => option.value) })}
                            multiple  // Enable multiple selection
                            required
                        >
                            {
                                addRoles.map((item, i) => (
                                    <option key={i} value={item} className="uppercase">
                                        {item}
                                    </option>
                                ))
                            }

                        </select>
                        {errors.roles && <p className='text-red-500'>{errors.roles}</p>}
                    </div>

                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="roles">Roles</label>
                        <input
                            type='text'
                            className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.roles ? 'border-red-500' : ''}`}
                            value={user.roles}
                            readOnly
                        />
                        {errors.roles && <p className='text-red-500'>{errors.roles}</p>}
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
                    <div className='text-left text-sm relative'>
                        <label className='font-bold' htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md ${errors.password ? 'border-red-500' : ''}`}
                                id="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                required
                            />
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                            </div>
                        </div>
                        {errors.password && <p className='text-red-500'>{errors.password}</p>}
                    </div>
                    <div>
                        <button type='submit' className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold'>
                            {loading ? <BeatLoader color='white' /> : post === "Team Lead" ? "Add New TEAM LEAD" : "Add New Developer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Authorization