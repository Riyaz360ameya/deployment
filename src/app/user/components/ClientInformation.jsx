import React, { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { PiChatDotsLight } from 'react-icons/pi';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import Badge from './Badge';
import { userProjects } from '../userAPIs/projectApis';
function ClientInformation() {
    const [projectId, setProjectId] = useState()
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [newPro, setNewPro] = useState([])
    const [onGoing, setOnGoing] = useState([])
    const [completed, setCompleted] = useState([])
    const [position, setPosition] = useState("New")
    const [projects, setProjects] = useState([]);
    const [modal, setModal] = useState(false);
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const { data } = await userProjects()
            const NewProjects = data.projectsInformation.NewProjects;
            setNewPro(NewProjects)
            const onGoingProjects = data.projectsInformation.onGoingProjects;
            setOnGoing(onGoingProjects)
            const completedProjects = data.projectsInformation.completedProjects;
            setCompleted(completedProjects)
            setProjects(NewProjects)
            //showing badges afer 24 hours 
            // const updatedTasks = details.map((project) => {
            //     const isNew = new Date(project.date) > new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
            //     return { ...project, isNew };
            // });

            // setTasks(NewProjects);
            // console.log(updatedTasks, 'projectdata');
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
            setLoading(false);
        }
    };
    const handleData = (name) => {
        setPosition(name)
        console.log(projects, '-----------------projects')
        name === "New" ? setProjects(newPro)
            : name === "OnGoing" ? setProjects(onGoing)
                : name === "Completed" ? setProjects(completed)
                    : "";
    };

    useEffect(() => {
        fetchTasks();
    }, []);
    return (
        <>
            {loading ? (
                <div className='h-full flex items-center justify-center'>
                    <div>
                        <InfinitySpin width='200' color='black' />
                    </div>
                </div>
            ) : (
                <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden'>
                    <div>
                        <h1 className='text-xl p-2 flex justify-center items-center shadow-lg bg-gray-200'>Your Projects Details</h1>
                        <div className='flex gap-4 ml-2 py-4'>
                            <div onClick={() => handleData("New")} className={`py-2 px-8  ${position === "New" && "bg-indigo-200"}  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl cursor-pointer`}>
                                <p>New</p>
                            </div>
                            <div onClick={() => handleData("OnGoing")} className={`py-2 px-8  ${position === "OnGoing" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl cursor-pointer`}>
                                <p>OnGoing</p>
                            </div>
                            <div onClick={() => handleData("Completed")} className={`py-2 px-8  ${position === "Completed" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl cursor-pointer`}>
                                <p>Completed</p>
                            </div>
                        </div>
                    </div>
                    <div className='border shadow mt-4'>
                        <table className='w-full whitespace-nowrap shadow p-3 '>
                            <tbody>
                                <tr tabIndex='0' className='focus:outline-none h-16 border border-gray-100 rounded shadow-xl'>
                                    <th>No</th>
                                    <th>Builder Name</th>
                                    <th>Project No</th>
                                    <th>Venture Type</th>
                                    <th>Description</th>
                                    <th>Deadline</th>
                                </tr>
                                <tr className='h-5'></tr>
                                {
                                    projects.length === 0 ? (
                                        <tr className="text-center mt-10 shadow-xl border">
                                            <td colSpan="10" className='text-2xl text-blue-600'>No Projects</td>
                                        </tr>
                                    ) :
                                        projects.map((item, i) => {
                                            return (
                                                <tr key={i} className='text-center mt-10 shadow-xl border'>
                                                    <td>{i + 1}</td>
                                                    <td className=''>
                                                        <div className='flex items-center gap-2 ml-5' >
                                                            {item.isNew && <Badge label='New' color='bg-green-500 text-white' />}
                                                            <FaLink color='blue' />
                                                            <p>{item.ProjectId.projectInfo.ventureName}</p>
                                                        </div>
                                                    </td>
                                                    <td className=''>{item.ProjectId.userId.slice(0, 8)}</td>
                                                    <td className='text-center'>{item.ProjectId.projectInfo.ventureType}</td>
                                                    <td className='flex items-center justify-center gap-2'>
                                                        <PiChatDotsLight />
                                                        {item.ProjectId.projectInfo.ventureDescription}
                                                    </td>
                                                    <td className='bg-red-200 rounded text-red-600'>{item.ProjectId.projectInfo.estimatedDeliveryDate}</td>
                                                </tr>
                                            );
                                        })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default ClientInformation
