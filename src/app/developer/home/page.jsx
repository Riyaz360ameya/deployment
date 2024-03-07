"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Tasks from '../components/Tasks'
import { devAllTasks, verifierTasks } from '../devApis/taskApi'
import { useDispatch, useSelector } from 'react-redux'
import { developerCompletedProjectsStore, developerNewProjectsStore, developerOngoingProjectsStore } from '@/app/redux/developer/developerProSlice'
import { toast } from 'react-toastify'
const page = () => {
    const user = useSelector((state) => state.developer.developerDetails)
    console.log(user.designation, '----------dev details')
    const dispatch = useDispatch()
    const [designation, setDesignation] = useState(user.designation)
    const [menu, setMenu] = useState(true)
    const [Project, setProject] = useState("New Tasks")
    const [loading, setLoading] = useState(false);

    const devTasks = async () => {
        try {
            setLoading(true)
            // const { data } = await devAllTasks()
            const { data } = await (designation === "File Verifier" ? verifierTasks() : devAllTasks());
            // console.log(data.devTasks, '-----------------dev task back incoming')

            dispatch(developerNewProjectsStore(data.devTasks.newTasks))
            dispatch(developerOngoingProjectsStore(data.devTasks.onGoingTasks))
            dispatch(developerCompletedProjectsStore(data.devTasks.completedTasks))

            setLoading(false)
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setLoading(false)
            toast.error(error.response.data.error)
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
                    <Tasks Project={Project} loading={loading} setLoading={setLoading} designation={designation} />
                </div>
            </div>
        </>
    )
}
export default page