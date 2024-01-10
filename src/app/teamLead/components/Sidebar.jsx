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
import logo from '../../../../public/ameyaLogo.png'
import Image from 'next/image';
const Sidebar = ({ menu, setProject, Projects }) => {
    const [selectedItem, setSelectedItem] = useState(Projects);
    //fetching user details from token
    const [data, setData] = useState("")
    const icons = [
        { icon: <SiTraefikproxy />, name: 'Projects' },
        { icon: <MdDeviceHub />, name: 'Developers' },
        { icon: <SlCalender />, name: 'Calender' },
    ];
    const handleClick = (name) => {
        console.log(name, '...................here')
        setSelectedItem(name)
        setProject(name)
    }
    return (
        <div className={`${menu ? 'w-72' : 'w-24'}  bg-[#2A2A2A] h-screen text-white  md:flex flex-col justify-between `}>
            <div className=" ">
                <div className={` ${menu ? 'flex gap-5' : 'flex flex-col  '} items-center justify-around p-4`}>
                    {
                        menu ?
                            <Image src={logo} alt="Profile Image" width={50} height={50} />
                            : ''
                    }
                    <h1 className='text-lg text-center font-bold '>TEAM LEADS</h1>
                </div>
                <div className='flex flex-col gap-2 p-5'>
                    <p className='text-blue-400'>Menu</p>
                    <div className='ml-2'>
                        {icons.map((item, i) => {
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
                            )
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Sidebar