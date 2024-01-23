"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Tasks from '../components/Tasks'
import { devAllTasks } from '../devApis/taskApi'
import { useDispatch } from 'react-redux'
import { developerCompletedProjectsStore, developerNewProjectsStore, developerOngoingProjectsStore } from '@/app/redux/developer/developerProSlice'
const page = () => {
    const dispatch = useDispatch()
    const [menu, setMenu] = useState(true)
    const [Project, setProject] = useState("New Tasks")
    const [loading, setLoading] = useState(false);

    const devTasks = async () => {
        try {
            setLoading(true)
            const { data } = await devAllTasks()
            console.log(data.devTasks, '-----------------dev task back incoming')

            dispatch(developerNewProjectsStore(data.devTasks.newTasks))
            dispatch(developerOngoingProjectsStore(data.devTasks.onGoingTasks))
            dispatch(developerCompletedProjectsStore(data.devTasks.completedTasks))

            setLoading(false)
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
                    <Header menu={menu} setMenu={setMenu} />
                    <Tasks Project={Project} loading={loading} setLoading={setLoading} />
                </div>
            </div>
        </>
    )
}
export default page