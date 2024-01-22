"use client"
import React, { useEffect, useState } from 'react'
import Projects from '../components/Projects'
import Developers from '../components/Developers'
import Calender from '../components/Calender'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
const page = () => {
    const [loader, setLoader] = useState(false)
    const [menu, setMenu] = useState(true)

    const [Project, setProject] = useState("Projects")
    
    return (
        <>
            <div className='h-screen flex w-full '>
                <Sidebar setProject={setProject} menu={menu} Projects={Project} />
                <div className="flex flex-col flex-1">
                    <Header setLoader={setLoader} menu={menu} setMenu={setMenu} />
                    {
                        Project === "Projects" ? <Projects  />
                            : Project === "Developers" ? <Developers />
                                : Project === "Calender" ? <Calender />
                                    : ""
                    }
                </div>
            </div>
        </>
    )
}
export default page