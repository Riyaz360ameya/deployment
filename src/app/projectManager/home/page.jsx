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
import { useSelector } from 'react-redux'
const page = () => {
    const [menu, setMenu] = useState(true)
    const [Project, setProject] = useState("Projects")
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.pm.pmDetails)
    // console.log(user, '...................pm')
    return (
        <>
            <div className='h-screen flex w-full '>
                <Sidebar setLoading={setLoading} Project={Project} setProject={setProject} menu={menu} />
                <div className="flex flex-col flex-1">
                    <Header menu={menu} setMenu={setMenu} />
                    {
                        Project === "Dashboard" ? <Dashboard loading={loading} setLoading={setLoading} />
                            : Project === "Projects" ? <Projects loading={loading} setLoading={setLoading} />
                                : Project === "Team Leads" ? <Leads loading={loading} setLoading={setLoading} />
                                    : Project === "Developers" ? <Developers loading={loading} setLoading={setLoading} />
                                        : Project === "Calender" ? <Calender loading={loading} setLoading={setLoading} />
                                            : Project === "Clients" ? <Clients loading={loading} setLoading={setLoading} />
                                                : Project === "Charts" ? <Charts loading={loading} setLoading={setLoading} />
                                                    : Project === "Authorization" ? <Authorization loading={loading} setLoading={setLoading} />
                                                        : ""
                    }
                </div>
            </div>
        </>
    )
}
export default page
