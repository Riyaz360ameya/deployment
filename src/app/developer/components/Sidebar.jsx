"use client"
import React, { useState } from 'react'
import { FaUserGear } from "react-icons/fa6";
import { SiTraefikproxy } from "react-icons/si";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import profileImage from '../../../../public/devImag.png'
import Image from 'next/image';
import { logOut } from '../devApis/authApi';
import { resetDev } from '@/app/redux/developer/developerSlice';
import { resetDevTasks } from '@/app/redux/developer/developerProSlice';
import { useRouter } from 'next/navigation'
const Sidebar = ({ menu, setProject, Project }) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const user = useSelector((state) => state.developer.developerDetails)
    console.log(user.designation, '----------dev details')
    const design = user.designation
    const [selectedItem, setSelectedItem] = useState(Project);
    //fetching user details from token
    const icons = [
        { icon: <SiTraefikproxy />, name: 'New Tasks' },
        { icon: <FaUserGear />, name: 'Ongoing Tasks' },
        { icon: <VscWorkspaceTrusted />, name: 'Completed' },
    ];
    const handleClick = (name) => {
        console.log(name, '-------------name')
        setProject(name)
        setSelectedItem(name)
    }
    const handleLogout = async () => {
        console.log('its log outing')
        await logOut()
        dispatch(resetDevTasks())
        dispatch(resetDev())
        toast.success("Logout success")
        router.push("/developer/login")
    }
    return (
        <div className={`w-${menu ? '72' : '24'} bg-[#2A2A2A] h-screen text-white md:flex flex-col justify-between p-2`}>
            <div className='flex flex-col jus items-center justify-between gap-4 p-4'>
                <div className='flex items-center justify-center'>
                    <Image
                        src={profileImage}
                        alt="Profile Image"
                        className='rounded-full'
                        width={menu ? 200 : 100}
                        height={menu ? 200 : 100}
                    />
                </div>
                <div>
                    <h1 className={`text-${menu ? '2xl' : 'md'} text-center font-bold`}>{user?.firstName} {user?.lastName}</h1>
                    <h1 className={`text-${menu ? 'lg' : 'sm'} text-center font-bold text-gray-500`}>Developer</h1>
                </div>
            </div>
            <div className='flex flex-col gap-2 p-5  '>
                <p className='text-blue-400'>Menu</p>
                <div className='ml-2'>
                    {icons.map((item, i) => {
                        if (design === "File Verifier") {
                            if (i % 2 === 0) {
                                return (
                                    <div key={i}
                                        onClick={() => handleClick(item.name)}
                                        className={`flex gap-2 mt-2 items-center ${menu ? "" : "justify-center"}  text-base  p-2 cursor-pointer  rounded duration-300 ease-in-out
                                        ${selectedItem === item.name && "bg-slate-600"}
                                        hover:bg-slate-600`} >
                                        <p className='flex items-center gap-2'>{item.icon}
                                            {menu && <span className=" ">{item.name}</span>}
                                        </p>
                                    </div>
                                );
                            }
                        } else {
                            return (
                                <div key={i}
                                    onClick={() => handleClick(item.name)}
                                    className={`flex gap-2 mt-2 items-center ${menu ? "" : "justify-center"}  text-base  p-2 cursor-pointer  rounded duration-300 ease-in-out
                                    ${selectedItem === item.name && "bg-slate-600"}
                                    hover:bg-slate-600`} >
                                    <p className='flex items-center gap-2'>{item.icon}
                                        {menu && <span className=" ">{item.name}</span>}
                                    </p>
                                </div>
                            );
                        }
                    })}
                </div>
                <div className='ml-2'>
                    <div
                        className={`flex gap-2 mt-2 items-center ${menu ? "" : "justify-center"} text-base p-2 cursor-pointer rounded duration-300 ease-in-out  hover:bg-slate-600`} >
                        <p className='flex items-center gap-2'><MdLogout />{menu && <span className=" " onClick={handleLogout}>Logout</span>}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Sidebar