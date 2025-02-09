"use client"
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { BiBell } from 'react-icons/bi';
import { FaAngleDown } from 'react-icons/fa';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { useRouter } from 'next/navigation'
import { PiBellLight, PiChatDotsLight } from "react-icons/pi";
import { RiMenuUnfoldLine, RiMenuFoldLine } from "react-icons/ri";
import { SlUser } from "react-icons/sl";
import profileImage from '../../../../public/leadImage.png'
import Image from 'next/image';
import { toast } from 'react-toastify';
import { logOut } from '../leadAPIs/authApi';
import { useSelector } from 'react-redux';
function Header({ setMenu, menu }) {

    const user = useSelector((state) => state.lead.leadDetails);
    const router = useRouter()
    const [drop, setDrop] = useState(false)
    const onLogout = async () => {
        try {
            await logOut()
            console.log("Logout success")
            toast.success("Logout successfully!")
            router.push("/teamLead/login")
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleDropdown = () => {
        setDrop((prev) => !prev)
    }
    //fetching user details from token

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
                        <p className="text-base">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-500">{user.designation}</p>
                    </div>
                    <div className=''>
                        {/* <SlUser className='h-8 w-8 ' /> */}
                        <Image src={profileImage} className='object-contain rounded-full' alt="" width={50} height={50} />
                    </div>
                    <FaAngleDown className="text-lg cursor-pointer" onClick={handleDropdown} />
                </div>
                {drop && (
                    <div className="absolute mt-28 right-2 w-36 text-sm text-center bg-white border border-gray-400 rounded-md shadow-md ">
                        <p className="p-2 hover:bg-gray-400 hover:text-white w-full cursor-pointer" onClick={handleDropdown} >Profile</p>
                        <p className="p-2 hover:bg-gray-400 hover:text-white w-full cursor-pointer" onClick={onLogout} >Logout</p>
                    </div>
                )}
            </div>
            <div className="md:hidden flex justify-between px-3 w-full items-center">
                <div className="p-2 bg-gray-400 bg-opacity-60 rounded-2xl">
                    <AiOutlineMenuUnfold className="text-white text-xl" onClick={() => setMenu((prev) => !prev)} />
                </div>
                <p className="text-lg">{user.firstName}</p>
                <div className="relative p-2 bg-gray-400 bg-opacity-60 rounded-2xl">
                    <BiBell className="text-white text-xl" />
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></div>
                </div>
            </div>
        </div>
    )
}
export default Header