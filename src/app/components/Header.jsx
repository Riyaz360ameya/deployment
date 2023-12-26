"use client"
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { BiBell } from 'react-icons/bi';
import { FaAngleDown } from 'react-icons/fa';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
import { useRouter } from 'next/navigation'
// import profileImage from '../../../public/Profile.jpeg'
import axios from 'axios';
// import Image from 'next/image';
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
            console.log(error.message, '------------Header Error')
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

    useEffect(() => {
        userDetails()
    }, [])

    return (
        <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-b-[#D9EAFF] h-14 w-full">
            <div className="hidden md:flex text-2xl cursor-pointer" >
                {menu ?
                    <AiOutlineMenuFold onClick={() => setMenu((prev) => !prev)} />
                    :
                    <AiOutlineMenuUnfold onClick={() => setMenu((prev) => !prev)} />
                }
            </div>
            <div className="hidden md:flex items-center justify-between p-2 px-4 gap-5 bg-gray-100 rounded-md text-2xl">
                <CiSearch />
                <input type="text" className="rounded bg-gray-100 outline-none text-sm w-80" placeholder="Search Projects" />
            </div>
            <div className="hidden md:flex items-center justify-between w-56  mr-5 relative">
                <div className="relative cursor-pointer">
                    <BiBell className=" text-2xl " />
                    <div className="w-3 h-3 bg-red-600 rounded-full absolute top-0 right-0"></div>
                </div>
                <div className='flex items-center gap-3'>
                    {/* <img className="h-10 cursor-pointer" src='/public/Profile.jpeg' alt="" /> */}

                    {/* <img className="h-10 cursor-pointer" src={profileImage} alt="" /> */}
                    {/* <Image src={profileImage} alt="" width={30} height={50} /> */}
                    <p className="text-base">{data.firstName}</p>
                    <FaAngleDown className="text-lg cursor-pointer" onClick={handleDropdown} />
                </div>
                {drop && (
                    <div className="absolute mt-44 right-5 w-36 text-sm text-center bg-white border border-gray-400 rounded-md shadow-md ">
                        <p className="p-2 hover:bg-gray-400 hover:text-white w-full cursor-pointer" onClick={handleDropdown} >Profile</p>
                        <p className="p-2 hover:bg-gray-400 hover:text-white w-full cursor-pointer" onClick={handleDropdown} >All Projects</p>
                        <p className="p-2 hover:bg-gray-400 hover:text-white w-full cursor-pointer" onClick={handleDropdown} >Transactions</p>
                        <p className="p-2 hover:bg-gray-400 hover:text-white w-full cursor-pointer" onClick={onLogout} >Logout</p>
                    </div>
                )}
            </div>
            <div className="md:hidden flex justify-between px-3 w-full items-center">
                <div className="p-2 bg-gray-400 bg-opacity-60 rounded-2xl">
                    <AiOutlineMenuUnfold className="text-white text-xl" onClick={() => setMenu((prev) => !prev)} />
                </div>
                <p className="text-lg">{data.firstName}</p>
                <div className="relative p-2 bg-gray-400 bg-opacity-60 rounded-2xl">
                    <BiBell className="text-white text-xl" />
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></div>
                </div>
            </div>
        </div>
    )
}

export default Header

