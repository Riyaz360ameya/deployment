"use client"
import React, { useState, useEffect } from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { MdDeviceHub } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaUserGear } from "react-icons/fa6";
import { SiTraefikproxy } from "react-icons/si";
import { IoKeyOutline } from "react-icons/io5";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
// import profileImage from '../../../../public/profile3.JPG'
// import logo from '../../../../public/ameyaLogo.png'
import Image from 'next/image';
import axios from 'axios';
const Sidebar = ({ menu, setProject }) => {
    //fetching user details from token
    const [data, setData] = useState("")
    const icons = [
        { icon: <SiTraefikproxy />, name: 'New Task' },
        { icon: <FaUserGear />, name: 'Ongoing Tasks' },
        { icon: <VscWorkspaceTrusted />, name: 'Completed' },
    ];
    const handleClick = (name) => {
        console.log(name, '-------------name')
        setProject(name)
    }
    return (
        <div className={`w-${menu ? '72' : '24'} bg-[#2A2A2A] h-screen text-white md:flex flex-col justify-between p-2`}>
            <div className='flex flex-col jus items-center justify-between gap-4 p-4'>
                <div className='flex items-center justify-center'>
                    {/* <Image
                        src={profileImage}
                        alt="Profile Image"
                        className='rounded-full'
                        width={menu ? 200 : 100}
                        height={menu ? 200 : 100}
                    /> */}
                </div>
                <div>
                    <h1 className={`text-${menu ? '2xl' : 'md'} text-center font-bold`}>James Bond</h1>
                    <h1 className={`text-${menu ? 'lg' : 'sm'} text-center font-bold text-gray-500`}>Developer</h1>
                </div>
            </div>
            <div className='flex flex-col gap-2 p-5  '>
                <p className='text-blue-400'>Menu</p>
                <div className='ml-2'>
                    {icons.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => handleClick(item.name)}
                            className={`flex gap-2 mt-2 items-center ${menu ? "" : "justify-center"} text-lg p-2 cursor-pointer rounded duration-300 ease-in-out   ${i === 0 && "bg-slate-600"}   hover:bg-slate-600`} >
                            <p className='flex items-center gap-2'>{item.icon}{menu && <span className=" ">{item.name}</span>}</p>
                        </div>
                    ))}
                </div>
                <div className='ml-2'>
                    <div
                        className={`flex gap-2 mt-2 items-center ${menu ? "" : "justify-center"} text-lg p-2 cursor-pointer rounded duration-300 ease-in-out  hover:bg-slate-600`} >
                        <p className='flex items-center gap-2'><MdLogout />{menu && <span className=" ">Logout</span>}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Sidebar