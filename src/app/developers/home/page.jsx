"use client"
import React, { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Tasks from '../components/Tasks'
import Ongoing from '../components/Ongoing'
import Completed from '../components/Completed'
const page = () => {
    const [loader, setLoader] = useState(false)
    const [menu, setMenu] = useState(true)
    const [Project, setProject] = useState("New Task")
    return (
        <>
            <div className='h-screen flex w-full '>
                <Sidebar setProject={setProject} menu={menu} />
                <div className="flex flex-col flex-1">
                    <Header setLoader={setLoader} menu={menu} setMenu={setMenu} />
                    {
                        Project === "New Task" ? <Tasks />
                            : Project === "Ongoing Tasks" ? <Ongoing />
                                : Project === "Completed" ? <Completed />
                                    : ""
                    }
                </div>
            </div>
        </>
    )
}
export default page