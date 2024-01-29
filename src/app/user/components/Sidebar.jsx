import React, { useState, useEffect } from 'react';
import { FaRegPenToSquare, FaIndianRupeeSign, FaStreetView } from 'react-icons/fa6';
import { IoIosListBox } from "react-icons/io";
import { ImStatsDots } from 'react-icons/im';
import { FcOrganization } from 'react-icons/fc';
import { GrProjects } from "react-icons/gr";
import { GoProjectSymlink } from "react-icons/go";
import { useSelector } from 'react-redux';
import logo from '../../../../public/ameyaLogo.png';
import Image from 'next/image';

const Sidebar = ({ menu, setProject, Project }) => {
    const user = useSelector((state) => state.user.userDetails)
    //fetching user details from token
    const [selectedItem, setSelectedItem] = useState(Project);
    const icons = [
        { icon: <FaRegPenToSquare />, name: 'New Project' },
        { icon: <GoProjectSymlink />, name: 'Project Details' },
        { icon: <ImStatsDots />, name: 'Project Status' },
        // { icon: <FaIndianRupeeSign />, name: 'Transactions' },
        { icon: <IoIosListBox />, name: 'Package' },
        { icon: <FaStreetView />, name: 'View' },
    ];

    const handleClick = (name) => {
        setSelectedItem(name);
        setProject(name);
    };

    return (
        <div className={`${menu ? 'w-52' : 'w-24'} bg-black h-screen text-white md:flex flex-col justify-between`}>
            <div className="">
                <div className={` ${menu ? 'flex gap-2' : 'flex flex-col  '} items-center p-4`}>
                    {menu ? <Image src={logo} alt="Profile Image" width={50} height={50} /> : ''}
                    <h1 className='text-lg text-center font-bold '>AMEYA <br />360 </h1>
                </div>
                <div className='flex flex-col gap-2'>
                    {icons.map((item, i) => (
                        <div
                            onClick={() => handleClick(item.name)}
                            key={i}
                            className={`w-full flex items-center px-8 py-3 text-lg md:text-2xl cursor-pointer 
                            ${selectedItem === item.name
                                ? 'bg-white text-black '
                                : 'hover:bg-black hover:bg-opacity-20 '
                            } `}
                        >
                            {item.icon}
                            {menu ? <span className="ml-2 text-sm ">{item.name}</span> : ''}
                        </div>
                    ))}
                </div>
            </div>

            <div className='p-3 bg-gray-800'>
                <div className="flex items-center ml-5 text-xl bottom-0">
                    <FcOrganization />
                    {menu && <span className="ml-2 text-sm font-bold ">{user?.organization}</span>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
