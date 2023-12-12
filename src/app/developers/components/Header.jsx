"use client"
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { BiBell } from 'react-icons/bi';
import { FaAngleDown } from 'react-icons/fa';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { useRouter } from 'next/navigation'
import { PiBellLight, PiChatDotsLight } from "react-icons/pi";
import { RiMenuUnfoldLine, RiMenuFoldLine } from "react-icons/ri";
// import profileImage from '../../../../public/profile3.JPG'
// import logo from '../../../../public/ameyaLogo.png'
import axios from 'axios';
import Image from 'next/image';
import { Toaster, toast } from 'sonner';
function Header({ setMenu, menu }) {
    const [data, setData] = useState({})
    const router = useRouter()
    const [drop, setDrop] = useState(false)
    const onLogout = async () => {
        try {
            await axios.get("/api/users/logout")
            console.log("Logout success")
            toast.success("Logout successfully!")
            router.push("/login")
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleDropdown = () => {
        setDrop((prev) => !prev)
    }
    //fetching user details from token
    const userDetails = () => {
        const res = localStorage.getItem('user')
        const user = JSON.parse(res);
        setData(user)
    }
    return (
        <div className="flex items-center justify-between  px-4 py-4 bg-white  h-16 w-full shadow-xl">
            <div className="hidden md:flex text-2xl cursor-pointer" >
                {menu ?
                    <RiMenuFoldLine onClick={() => setMenu((prev) => !prev)} />
                    :
                    <RiMenuUnfoldLine onClick={() => setMenu((prev) => !prev)} />
                }
            </div>
            <div className="hidden md:flex items-center justify-between p-2 px-4 gap-5 bg-gray-100 rounded-md text-2xl">
                <CiSearch />
                <input type="text" className="rounded bg-gray-100 outline-none text-sm w-80" placeholder="Search Projects" />
            </div>
            <div className="hidden md:flex items-center  gap-4  mr-5 relative ">
                <div className="relative cursor-pointer">
                    <div className='w-10 h-10 bg-gray-100 flex items-center border border-gray-300 justify-center rounded-full  '>
                        <PiBellLight className=" text-gray-600 text-2xl " />
                    </div>
                    <span className='absolute h-2 w-2 bg-red-500 rounded-full top-0 right-0 flex items-center justify-center'>
                        <span className=" h-2 w-2 animate-ping rounded-full bg-red-500 opacity-75"></span>
                    </span>
                </div>
                <div className="relative cursor-pointer">
                    <div className='w-10 h-10 bg-gray-100 flex items-center  border border-gray-300 justify-center rounded-full  '>
                        <PiChatDotsLight className="text-gray-600 text-xl" />
                    </div>
                    <span className='absolute h-2 w-2 bg-red-500 rounded-full top-0 right-0 flex items-center justify-center'>
                        <span className=" h-2 w-2 animate-ping rounded-full bg-red-500 opacity-75"></span>
                    </span>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='text-right'>
                        <p className="text-base">Ameya360</p>
                        <p className="text-sm text-gray-500">Interior</p>
                    </div>
                    <div className='h-12 w-12 '>
                        {/* <Image src={logo} className='object-contain rounded-full' alt="" width={100} height={100} /> */}
                    </div>
                </div>
            </div>
            <div className="md:hidden flex justify-between px-3 w-full items-center">
                <div className="p-2 bg-gray-400 bg-opacity-60 rounded-2xl">
                    <AiOutlineMenuUnfold className="text-white text-xl" onClick={() => setMenu((prev) => !prev)} />
                </div>
                <p className="text-lg">firstName</p>
                <div className="relative p-2 bg-gray-400 bg-opacity-60 rounded-2xl">
                    <PiBellLight className="text-white text-xl" />
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></div>
                </div>
            </div>
        </div>
    )
}
export default Header