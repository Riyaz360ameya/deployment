import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { IoMdCloseCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { LuLayoutDashboard } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { MdDeviceHub } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaUserGear } from "react-icons/fa6";
import { SiTraefikproxy } from "react-icons/si";
import { IoKeyOutline } from "react-icons/io5";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { MdCurrencyRupee } from "react-icons/md";
import { MdTune } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdHelpOutline } from "react-icons/md";
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

    const pathname = usePathname();
    const user = useSelector((state) => state.user.userDetails)
    console.log(pathname, '..................pathname')
    const design = user.designation
    console.log(design, '--------------------design')
    const trigger = useRef(null);
    const sidebar = useRef(null);
    let storedSidebarExpanded = "true";
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
    );
    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });
    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ key }) => {
            if (!sidebarOpen || key !== "Escape") return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });
    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        } else {
            document.querySelector("body")?.classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);
    const userMenuItems = [
        // {
        //     title: "",
        //     list: [
        //         {
        //             title: 'Home',
        //             path: '/user/dashboard',
        //             icon: <SiTraefikproxy />,
        //         },]
        // },
        {
            title: "DashBoard",
            list: [
                {
                    title: 'New Project',
                    path: '/user/dashboard/newProject',
                    icon: <SiTraefikproxy />,
                },
                {
                    title: 'Projects Details',
                    path: '/user/dashboard/projects',
                    icon: <SiTraefikproxy />,
                },
                {
                    title: 'Status',
                    path: '/user/dashboard/status',
                    icon: <SiTraefikproxy />,
                },
                {
                    title: 'View',
                    path: '/user/dashboard/view',
                    icon: <SiTraefikproxy />,
                },
                {
                    title: 'Package',
                    path: '/user/dashboard/package',
                    icon: <SiTraefikproxy />,
                },
            ]
        },
    ]
    const devMenuItems = [

        {
            title: "DashBoard",
            list: [
                {
                    title: 'New Tasks',
                    path: '/developer/newTasks',
                    icon: <SiTraefikproxy />,
                },
                {
                    title: 'Ongoing Tasks',
                    path: '/developer/onGoingTasks',
                    icon: <SiTraefikproxy />,
                },
                {
                    title: 'Completed Tasks',
                    path: '/developer/completedTasks',
                    icon: <SiTraefikproxy />,
                },
            ]
        },
    ]
    const PMMenuItems = [
        {
            title: "Pages",
            list: [
                {
                    title: 'Dashboard',
                    path: '/projectManager/dashboard',
                    icon: <LuLayoutDashboard />,
                },
                {
                    title: 'Users',
                    path: '/projectManager/dashboard/users',
                    icon: <FaUsers />,
                },
                {
                    title: 'Projects',
                    path: '/projectManager/dashboard/projects',
                    icon: <SiTraefikproxy />,
                },
                {
                    title: 'Transactions',
                    path: '/projectManager/dashboard/transactions',
                    icon: <FaUserGear />,
                },
            ]
        },
        {
            title: "Analyze",
            gap: true,
            list: [
                {
                    title: 'Revenue',
                    path: '/projectManager/dashboard/revenue',
                    icon: <MdCurrencyRupee />,
                },
                {
                    title: 'Reports',
                    path: '/projectManager/dashboard/reports',
                    icon: <MdTune />,
                },
                {
                    title: 'Team',
                    path: '/projectManager/dashboard/teamLeads',
                    icon: <FaUserGear />,
                },
            ]
        },
        {
            title: "Actions",
            gap: true,
            list: [
                {
                    title: 'Authorization',
                    path: '/projectManager/dashboard/authorization',
                    icon: <IoKeyOutline />,
                },
                {
                    title: 'Settings',
                    path: '/projectManager/dashboard/settings',
                    icon: <MdOutlineSettings />,
                },
                {
                    title: 'Help',
                    path: '/projectManager/dashboard/help',
                    icon: <MdHelpOutline />,
                }
            ]
        }
    ]

    return (
        <aside
            ref={sidebar}
            className={`absolute sidebar-upper left-0 top-0 z-999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between mt-4 gap-2 px-6 py-5.5 lg:py-6.5">
                <Link href="/" passHref>
                    <Image
                        width={60}
                        height={60}
                        src={"/ameyaLogo.png"}
                        alt="Logo"
                        priority
                    />
                </Link>
                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden "
                >
                    <IoMdCloseCircle className="text-white" />
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear h-full">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6 h-full">
                    {/* <!-- Menu Group --> */}
                    <div>
                        <h3 className="text-sm font-semibold text-bodydark2 text-white">
                            MENU
                        </h3>
                        <ul className='pt-2'>
                            {design === "user" ?
                                userMenuItems.map((item, i) => (
                                    <li key={i} className={`${item.gap ? 'mt-4 md:mt-9' : 'mt-0 md:mt-2'}`} >
                                        <p className='text-gray-400 text-sm hidden md:flex'> {item.title}</p>
                                        {
                                            item.list.map((each, i) => (
                                                <Link key={i + each.path} href={each.path} className={`flex items-center gap-x-4 w-full p-3 mt-1 hover:bg-slate-400 rounded-md ${pathname === each.path && 'bg-slate-400'}`}>
                                                    <div className='text-xl text-white'>{each.icon}</div>
                                                    <span className={` origin-left duration-300  text-xs md:text-sm  text-white`}>{each.title}</span>
                                                </Link>
                                            ))
                                        }
                                    </li>
                                ))
                                : design === "Project Manager" ?
                                    PMMenuItems.map((item, i) => (
                                        <li key={i} className={`${item.gap ? 'mt-4 md:mt-9' : 'mt-0 md:mt-2'}`} >
                                            <p className='text-gray-400 text-sm hidden md:flex '> {item.title}</p>
                                            {
                                                item.list.map((each, i) => (
                                                    <Link key={i + each.path} href={each.path} className={`flex items-center gap-x-4 w-full p-3 mt-1 hover:bg-slate-400 rounded-md ${pathname === each.path && 'bg-slate-400'}`}>
                                                        <div className='text-xl text-white'>{each.icon}</div>
                                                        <span className={` origin-left duration-300  text-xs md:text-sm  text-white`}>{each.title}</span>
                                                    </Link>
                                                ))
                                            }
                                        </li>
                                    ))
                                    : devMenuItems.map((item, i) => (
                                        <li key={i} className={`${item.gap ? 'mt-4 md:mt-9' : 'mt-0 md:mt-2'}`} >
                                            <p className='text-gray-400 text-sm hidden md:flex '> {item.title}</p>
                                            {
                                                item.list.map((each, i) => (
                                                    <Link key={i + each.path} href={each.path} className={`flex items-center gap-x-4 w-full p-3 mt-1 hover:bg-slate-400 rounded-md ${pathname === each.path && 'bg-slate-400'}`}>
                                                        <div className='text-xl text-white'>{each.icon}</div>
                                                        <span className={` origin-left duration-300  text-xs md:text-sm  text-white`}>{each.title}</span>
                                                    </Link>
                                                ))
                                            }
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>
                </nav>
                {/* <!-- Sidebar Menu --> */}
                <div className="mx-auto mb-1 mt-5 max-w-60 rounded-sm  bg-boxdark  px-4 py-6 text-center shadow-default bottom-0">
                    <h3 className="mb-1 font-semibold text-white">Blocs by Clove Pro</h3>
                    <p className="mb-4 text-xs text-white">Get Project Management Tool +</p>
                    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Purchase Now</button>
                </div>
            </div>
        </aside>
    )
};
export default Sidebar;


























