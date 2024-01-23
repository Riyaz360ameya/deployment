import React, { useState, useEffect } from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { MdDeviceHub } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaUserGear } from "react-icons/fa6";
import { SiTraefikproxy } from "react-icons/si";
import { IoKeyOutline } from "react-icons/io5";
import logo from '../../../../public/ameyaLogo.png';
import Image from 'next/image';

const Sidebar = ({ menu, setProject, Project, setLoading }) => {
    const [selectedItem, setSelectedItem] = useState(Project);
    const [sidebarWidth, setSidebarWidth] = useState(menu ? 'w-72' : 'w-24');

    const icons = [
        { icon: <LuLayoutDashboard />, name: 'Dashboard' },
        { icon: <SiTraefikproxy />, name: 'Projects' },
        { icon: <FaUserGear />, name: 'Team Leads' },
        { icon: <MdDeviceHub />, name: 'Developers' },
        { icon: <SlCalender />, name: 'Calender' },
        { icon: <FaRegBuilding />, name: 'Builders' },
        { icon: <IoStatsChartSharp />, name: 'Charts' },
    ];

    const handleClick = (name) => {
        setProject(name);
        setSelectedItem(name);
        setLoading(true);
    };

    useEffect(() => {
        setSidebarWidth(menu ? 'w-60' : 'w-24');
    }, [menu]);

    return (
        <div className={`${sidebarWidth} bg-[#2A2A2A] text-white flex flex-col`}>
            <div className={` ${menu ? 'flex gap-5' : 'flex flex-col  '} items-center justify-around p-4`}>
                {menu ? <Image src={logo} alt="Profile Image" width={50} height={50} /> : ''}
                <h1 className='text-lg text-center font-bold '>PROJECT MANAGER</h1>
            </div>
            <div className='flex flex-col justify-between p-5 h-full'>
                <div>
                    <p className='text-blue-400'>Menu</p>
                    <div className='ml-2'>
                        {icons.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => handleClick(item.name)}
                                className={`flex gap-2 mt-2 items-center ${menu ? "" : "justify-center"}  text-base  p-2 cursor-pointer  rounded duration-300 ease-in-out
                            ${selectedItem === item.name && "bg-slate-600"}
                            hover:bg-slate-600`} >
                                <p className='flex items-center gap-2'>{item.icon}
                                    {menu && <span className=" ">{item.name}</span>}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className=''>
                    <p className='text-blue-400'>Others</p>
                    <div className='ml-2'>
                        <div
                            onClick={() => handleClick("Authorization")}
                            className={`flex gap-2 mt-2 items-center ${menu ? "" : "justify-center"}  text-base  p-2 cursor-pointer  rounded duration-300 ease-in-out
                            ${selectedItem === "Authorization" && "bg-slate-600"}
                            hover:bg-slate-600`} >
                            <p className='flex items-center gap-2'><IoKeyOutline />
                                {menu && <span className=" ">Authorization</span>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Sidebar;
