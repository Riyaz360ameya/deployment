"use client"
import React, { useState } from 'react'
import Dashboard from '../components/Dashboard'
import Projects from '../components/Projects'
import Leads from '../components/Leads'
import Developers from '../components/Developers'
import Charts from '../components/Charts'
import Calender from '../components/Calender'
import Clients from '../components/Clients'
import Authorization from '../components/Authorization'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
const page = () => {
    const [loader, setLoader] = useState(false)
    const [menu, setMenu] = useState(true)
    const [Project, setProject] = useState("Projects")
    return (
        <>
            <div className='h-screen flex w-full '>
                <Sidebar setProject={setProject} menu={menu} />
                <div className="flex flex-col flex-1">
                    <Header setLoader={setLoader} menu={menu} setMenu={setMenu} />
                    {

                        Project === "Projects" ? <Projects />
                            // : Project === "Team Leads" ? <Leads />
                                : Project === "Developers" ? <Developers />
                                    : Project === "Calender" ? <Calender />
                                        // : Project === "Clients" ? <Clients />
                                        //     : Project === "Charts" ? <Charts />
                                                // : Project === "Authorization" ? <Authorization />
                                                    : ""
                    }
                </div>
            </div>
        </>
    )
}
export default page