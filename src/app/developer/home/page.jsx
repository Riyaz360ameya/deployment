"use client"
import React, { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Tasks from '../components/Tasks'
import axios from 'axios'
const page = () => {
    const [loader, setLoader] = useState(false)
    const [menu, setMenu] = useState(true)
    const [newTasks, setNewTasks] = useState([])
    const [onGoing, setOnGoing] = useState([])
    const [completed, setCompleted] = useState([])
    const [Project, setProject] = useState("New Task")
    const userDetails = async () => {
        try {
            const dev = localStorage.getItem("Dev")
            const devData = JSON.parse(dev)
            const devId = devData._id
            console.log(devId, '************devData')
            const { data } = await axios.post("/api/developer/allTasks", { devId });
            setNewTasks(data.devTasks.newTasks)
            setOnGoing(data.devTasks.onGoingTasks)
            setCompleted(data.devTasks.completedTasks)
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    return (
        <>
            <div className='h-screen flex w-full '>
                <Sidebar setProject={setProject} menu={menu} Project={Project} />
                <div className="flex flex-col flex-1">
                    <Header setLoader={setLoader} menu={menu} setMenu={setMenu} />
                    {
                        Project === "New Task" ? <Tasks userDetails={userDetails} task={newTasks} Project={Project} />
                            : Project === "Ongoing Tasks" ? <Tasks userDetails={userDetails} task={onGoing} Project={Project} />
                                : Project === "Completed" ? <Tasks userDetails={userDetails} task={completed} Project={Project} />
                                    : ""
                    }
                </div>
            </div>
        </>
    )
}
export default page