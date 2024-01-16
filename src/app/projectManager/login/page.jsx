"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { BeatLoader } from 'react-spinners';
import { Toaster, toast } from 'sonner';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import { useDispatch,useSelector } from 'react-redux'
import { pmLogInApi } from '../pmAPIs/authApis'

function page() {
    // const projectManagerLoginData = useSelector(selectProjectmanagerLogin);
    const router = useRouter();
    const [password, setPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const showHiddenPassword = () => {
        setVisiblePassword(!visiblePassword)
    }
    const managerLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await pmLogInApi(user)
            dispatch(setProjectManagerLoginData(data));
            // dispatch(setProjectManagerLoginData(response.data));
            console.log(data, '.............data')
            toast.success(data.message)
            localStorage.setItem("PM", JSON.stringify(data.User))
            localStorage.setItem("token", JSON.stringify(data.token))
            router.push("/projectManager/home")
            setLoading(false)
        } catch (error) {
            toast.error(error);
            console.log(error)
            setLoading(false)
        }
    }
    const managerHandleForgot = () => {

    }
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
                        <>
                            <div className='text-left text-sm'>
                                <label className='font-bold' htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md 
                                `}
                                    id="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </div>
                            <div className='text-left text-sm'>
                                <label className='font-bold' htmlFor="password">Password</label>
                                <div className="relative">
                                    <input
                                        type={visiblePassword ? "text" : "password"}
                                        className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md 
                                `}
                                        id="password"
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                                        onClick={showHiddenPassword}
                                    >
                                        {visiblePassword ? <IoIosEye /> : <IoIosEyeOff />}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold' onClick={managerLogin}>
                                    {loading ? <BeatLoader color='white' /> : 'Login'}
                                </button>
                            </div>
                            <div className=' mt-5 text-sm'>
                                <p className='text-black underline font-bold cursor-pointer' onClick={managerHandleForgot}>
                                    Forgot Password
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