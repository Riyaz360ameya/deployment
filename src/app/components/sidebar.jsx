"use client"
import React, { useState, useEffect } from 'react'
import { FaRegPenToSquare, FaIndianRupeeSign, FaStreetView } from 'react-icons/fa6';
import { IoIosListBox } from "react-icons/io";
import { ImStatsDots } from 'react-icons/im';
import { FcOrganization } from 'react-icons/fc';
import { GrProjects } from "react-icons/gr";

import profileImage from '../../../public/Profile.jpeg'
import logo from '../../../public/ameyaLogo.png'
import Image from 'next/image';
import axios from 'axios';

const sidebar = ({ menu, setProject }) => {
    //fetching user details from token
    const [selectedItem, setSelectedItem] = useState("New Project");
    const [data, setData] = useState("")
    const userDetails = async () => {
        const res = await axios.get("/api/users/userdata")
        setData(res.data.data)
    }

    useEffect(() => {
        userDetails()
    }, [])
    const icons = [
        { icon: <FaRegPenToSquare />, name: 'New Project' },
        { icon: <GrProjects />  , name: 'Project Details' },
        { icon: <ImStatsDots />, name: 'Project Status' },
        { icon: <FaIndianRupeeSign />, name: 'Payment' },
        { icon: <IoIosListBox />, name: 'Package' },
        { icon: <FaStreetView />, name: 'View' },
    ];
    const handleClick = (name) => {
        setSelectedItem(name);
        setProject(name)
    }
    return (
        <div className={`${menu ? 'w-52' : 'w-24'}  bg-white h-screen  md:flex flex-col justify-between border-r border-r-[#D9EAFF]`}>
            <div className="">
                <div className={` ${menu ? 'flex gap-2' : 'flex flex-col  '} items-center p-4`}>
                    {
                        menu ?
                            <Image src={logo} alt="Profile Image" width={50} height={50} />
                            : ''
                    }
                    <h1 className='text-lg text-center font-bold '>AMEYA <br />360 </h1>
                </div>
                <div className='flex flex-col gap-2'>
                    {icons.map((item, i) => (
                        <div
                            onClick={() => handleClick(item.name)}
                            key={i}
                            className={`text-black w-full flex items-center px-8 py-3 text-lg md:text-2xl cursor-pointer
                         ${selectedItem === item.name
                                    ? 'bg-black bg-opacity-20 border-l-4 border-black'
                                    : 'hover:bg-black hover:bg-opacity-20 hover:border-l-4 hover:border-black'
                                }`}
                        >
                            {item.icon}
                            {menu ? <span className="ml-2 text-sm text-black">{item.name}</span> : ''}
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className='p-3 bg-[#F5F5F5]'>
                <div className="flex items-center ml-5 text-xl bottom-0">
                    <FcOrganization />
                    {menu ? <span className="ml-2 text-sm font-bold text-black">{data.organisation}</span> : ''}
                </div>
            </div> */}
        </div>
    )
}

export default sidebar