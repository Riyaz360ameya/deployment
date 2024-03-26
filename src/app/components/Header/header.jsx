import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import Image from "next/image";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropDownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import { PiBellLight, PiChatDotsLight } from "react-icons/pi";
import { usePathname } from "next/navigation";

const Header = (props) => {
    const pathname = usePathname()
    return (
        <header className="top-0 z-999 flex w-full  bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none shadow-lg">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSidebarOpen(!props.sidebarOpen);
                        }}

                        className="z-99999 block  rounded-sm border border-stroke dark:text-white  p-1.5 shadow-sm dark:border-strokedark lg:hidden"
                    >

                        <CiMenuBurger />

                    </button>
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <Image
                        width={32}
                        height={32}
                        src="/ameyaLogo.png"
                        alt="Logo"
                    />

                </div>
                <div>
                    <p className="font-bold p-2 rounded dark:text-white hidden lg:block">{pathname.split('/').pop().toUpperCase()}</p>
                </div>

                {/* <div className="hidden sm:block">
                    <form action="https://formbold.com/s/unique_form_id" method="POST" className="bg-gray-500 p-2 rounded">
                        <div className="relative">
                            <button className="absolute left-0 top-1/2 -translate-y-1/2">
                                <svg
                                    className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                                        fill=""
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                        fill=""
                                    />
                                </svg>
                            </button>

                            <input
                                type="text"
                                placeholder="Type to search..."
                                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                            />
                        </div>
                    </form>
                </div> */}
                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        {/* <!-- Dark Mode Toggler --> */}
                        <DarkModeSwitcher />
                        {/* <!-- Dark Mode Toggler --> */}

                        {/* <!-- Notification Menu Area --> */}
                        <DropdownNotification />
                        {/* <!-- Notification Menu Area --> */}
                        
                        {/* <!-- Chat Notification Area --> */}
                        <DropdownMessage />
                        {/* <!-- Chat Notification Area --> */}
                    </ul>
                    {/* <!-- User Area --> */}
                    <DropdownUser />
                    {/* <!-- User Area --> */}
                </div>

            </div>
        </header>
    );
};

export default Header;


// "use client"
// import React, { useEffect, useState } from 'react'
// import { CiSearch } from 'react-icons/ci';
// import { BiBell } from 'react-icons/bi';
// import { FaAngleDown } from 'react-icons/fa';
// import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';
// import { useRouter } from 'next/navigation'
// import { PiBellLight, PiChatDotsLight } from "react-icons/pi";
// import { RiMenuUnfoldLine, RiMenuFoldLine } from "react-icons/ri";
// // import profileImage from '../../../../public/pmImage.png'
// import { SlUser } from "react-icons/sl";
// import Image from 'next/image';
// import { toast } from 'react-toastify';
// // import { logOut } from '../pmAPIs/authApis';
// import { useDispatch, useSelector } from 'react-redux';
// import { resetPmProject } from '@/app/redux/projectManager/pmProSlice';
// function Header(props) {
//     const dispatch = useDispatch()
//     // const user = useSelector((state) => state.pm.pmDetails)
//     const router = useRouter()
//     const [drop, setDrop] = useState(false)
//     const onLogout = async () => {
//         // try {
//         //     await logOut()
//         //     console.log("Logout success")
//         //     toast.success("Logout successfully!")
//         //     router.push("/projectManager/login")
//         //     dispatch(resetPmProject())
//         // } catch (error) {
//         //     console.log(error.message)
//         // }
//     }
//     const handleDropdown = () => {
//         setDrop((prev) => !prev)
//     }
//     return (
//         <div className="flex items-center justify-between  px-4 py-4 bg-white  h-16 w-full shadow-xl">
//             <div className="hidden md:flex text-2xl cursor-pointer"
//                 onClick={(e) => {
//                     e.stopPropagation();
//                     props.setSidebarOpen(!props.sidebarOpen);
//                 }}
//             ><RiMenuFoldLine/>
//                 {/* {menu ?
//                     <RiMenuFoldLine onClick={() => setMenu((prev) => !prev)} />
//                     :
//                     <RiMenuUnfoldLine onClick={() => setMenu((prev) => !prev)} />
//                 } */}
//             </div>
//             <div className="hidden md:flex items-center justify-between p-2 px-4 gap-5 bg-gray-100 rounded-md text-2xl">
//                 <CiSearch />
//                 <input type="text" className="rounded bg-gray-100 outline-none text-sm w-80" placeholder="Search Projects" />
//             </div>
//             <div className="hidden md:flex items-center  gap-4  mr-5 relative ">
//                 <div className="relative cursor-pointer">
//                     <div className='w-10 h-10 bg-gray-100 flex items-center border border-gray-300 justify-center rounded-full  '>
//                         <PiBellLight className=" text-gray-600 text-2xl " />
//                     </div>
//                     <span className='absolute h-2 w-2 bg-red-500 rounded-full top-0 right-0 flex items-center justify-center'>
//                         <span className=" h-2 w-2 animate-ping rounded-full bg-red-500 opacity-75"></span>
//                     </span>
//                 </div>
//                 <div className="relative cursor-pointer">
//                     <div className='w-10 h-10 bg-gray-100 flex items-center  border border-gray-300 justify-center rounded-full  '>
//                         <PiChatDotsLight className="text-gray-600 text-xl" />
//                     </div>
//                     <span className='absolute h-2 w-2 bg-red-500 rounded-full top-0 right-0 flex items-center justify-center'>
//                         <span className=" h-2 w-2 animate-ping rounded-full bg-red-500 opacity-75"></span>
//                     </span>
//                 </div>
//                 <div className='flex items-center gap-3'>
//                     {/* <div className='text-right'>
//                         <p className="text-base">{user.firstName} {user.lastName}</p>
//                         <p className="text-sm text-gray-500">{user.designation}</p>
//                     </div> */}
//                     <div className=''>
//                         {/* <SlUser className='h-8 w-8 ' /> */}
//                         <Image src='/pmImage.png' className='object-contain rounded-full' alt="" width={50} height={50} />
//                     </div>
//                     <FaAngleDown className="text-lg cursor-pointer" onClick={handleDropdown} />
//                 </div>
//                 {drop && (
//                     <div className="absolute mt-28 right-2 w-36 text-sm text-center bg-white border border-gray-400 rounded-md shadow-md ">
//                         <p className="p-2 hover:bg-gray-400 hover:text-white w-full cursor-pointer" onClick={handleDropdown} >Profile</p>
//                         <p className="p-2 hover:bg-gray-400 hover:text-white w-full cursor-pointer" onClick={onLogout} >Logout</p>
//                     </div>
//                 )}
//             </div>
//             <div className="md:hidden flex justify-between px-3 w-full items-center">
//                 <div className="p-2 bg-gray-400 bg-opacity-60 rounded-2xl">
//                     <AiOutlineMenuUnfold className="text-white text-xl" onClick={() => setMenu((prev) => !prev)} />
//                 </div>
//                 {/* <p className="text-lg">{user.firstName}</p> */}
//                 <div className="relative p-2 bg-gray-400 bg-opacity-60 rounded-2xl">
//                     <BiBell className="text-white text-xl" />
//                     <div className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2"></div>
//                 </div>
//             </div>
//         </div >
//     )
// }
// export default Header