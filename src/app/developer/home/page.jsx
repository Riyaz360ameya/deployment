"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Tasks from '../components/Tasks'
import axios from 'axios'
// import _ from 'lodash';
import { devAllTasks } from '../devApis/taskApi'
import { useDispatch, useSelector } from 'react-redux'
import { developerCompletedProjectsStore, developerNewProjectsStore, developerOngoingProjectsStore } from '@/app/redux/developer/developerProSlice'
const page = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    const [menu, setMenu] = useState(true)
    const [newTasks, setNewTasks] = useState([])
    const [onGoing, setOnGoing] = useState([])
    const [completed, setCompleted] = useState([])
    const [Project, setProject] = useState("New Tasks")
    const devTasks = async () => {
        try {
            const { data } = await devAllTasks()
            console.log(data.devTasks, '-----------------dev task back incoming')
            setNewTasks(data.devTasks.newTasks)
            setOnGoing(data.devTasks.onGoingTasks)
            setCompleted(data.devTasks.completedTasks)
            dispatch(developerNewProjectsStore(data.devTasks.newTasks))
            dispatch(developerOngoingProjectsStore(data.devTasks.onGoingTasks))
            dispatch(developerCompletedProjectsStore(data.devTasks.completedTasks))
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    useEffect(() => {
        devTasks()
    }, [Project])
    return (
        <>
            <div className='h-screen flex w-full '>
                <Sidebar setProject={setProject} menu={menu} Project={Project} />
                <div className="flex flex-col flex-1">
                    <Header setLoader={setLoader} menu={menu} setMenu={setMenu} />
                    <Tasks Project={Project} />
                    
                    {/* {
                        Project === "New Tasks" ? <Tasks devTasks={devTasks} Project={Project} />
                            : Project === "Ongoing Tasks" ? <Tasks devTasks={devTasks} Project={Project} />
                                : Project === "Completed" ? <Tasks devTasks={devTasks} Project={Project} />
                                    : ""
                    } */}
                </div>
            </div>
        </>
    )
}
export default page