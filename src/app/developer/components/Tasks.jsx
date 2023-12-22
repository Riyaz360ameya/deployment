import React, { useState, useEffect } from 'react';
import { FiAlertOctagon } from "react-icons/fi";
import { PiChatDotsLight } from "react-icons/pi";
import { MdFileDownload } from "react-icons/md";
import axios from 'axios';
import { dateConverter } from '@/app/api/helpers/dateConverter';
const Tasks = ({ devTasks, task, Project }) => {
    const [dev, setDev] = useState()
    useEffect(() => {
        devTasks()
        devDetails()
    }, []);
    const devDetails = () => {
        const devDetails = JSON.parse(localStorage.getItem("Dev"))
        setDev(devDetails)
        const developerId = devDetails._id
        console.log(developerId, '----------devDetails')
    }
    const handleStartClick = async (projectId) => {
        console.log(projectId, 'Its Started')
        const developerId = dev._id
        console.log(developerId, '----------devDetails')
        const data = await axios.post('/api/developer/startTask', { projectId, developerId })
    }
    const handleCompleted = async (projectId) => {
        console.log(projectId, 'Its Completed')
        const developerId = dev._id
        const data = await axios.post('/api/developer/complete', { projectId, developerId })
    }


    return (
        <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden'>
            <div className='border shadow mt-4'>
                <table className="w-full whitespace-nowrap shadow p-3">
                    <tbody>
                        <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded shadow-xl">
                            <th>No</th>
                            <th>Project Title</th>
                            <th>Importance</th>
                            <th>description</th>
                            <th>Assigned Date</th>
                            <th>Start Date</th>
                            {
                                Project !== "New Tasks" && <th>Dev Started</th>
                            }

                            <th>Deadline</th>
                            {
                                Project === "Completed" && <th>Completed Date</th>
                            }
                            {
                                Project !== "Completed" &&
                                <th>Task Option</th>
                            }
                        </tr>
                        <tr className='h-5'></tr>
                        {
                            task.length === 0 ? (
                                <tr className="text-center mt-10 shadow-xl border">
                                    <td colSpan="8" className='text-2xl text-blue-600'>No Tasks</td>
                                </tr>
                            ) : (
                                task.map((item, i) => (
                                    <tr className='text-center mt-10 shadow-xl border' key={item._id}>
                                        <td>{i + 1}</td>
                                        <td className="">
                                            <p>{item.projectTitle}</p>
                                        </td>
                                        <td className="">
                                            <div className="flex items-center justify-center">
                                                <FiAlertOctagon color='red' />
                                                <p className="text-sm text-gray-600 ml-2">{item.importance}</p>
                                            </div>
                                        </td>
                                        <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item.description}</td>
                                        <td className='b rounded text-green-600'>
                                            {dateConverter(item.assignedDate)}
                                        </td>
                                        <td className='b rounded text-blue-600 font-bold'>{item.startDate}</td>
                                        {
                                            Project !== "New Tasks" && <td> {dateConverter(item.devStartedDate)}</td>
                                        }
                                        <td className='bg-red-200  rounded text-red-600 font-bold'>{item.endDate}</td>
                                        {
                                            Project === "Completed" && <td className='text-green-600 font-bold'>{dateConverter(item.devCompletedDate)}</td>
                                        }
                                        {
                                            Project !== "Completed" &&
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        if (Project === "New Tasks") {
                                                            handleStartClick(item.projectId);
                                                        } else if (Project === "Ongoing Tasks") {
                                                            handleCompleted(item.projectId);
                                                        }
                                                    }}
                                                    className='bg-green-800 text-white px-4 py-1 rounded'
                                                >
                                                    {Project === "New Tasks" ? "Start" : Project === "Ongoing Tasks" ? "Set Completed" : ''}
                                                </button>
                                            </td>
                                        }
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Tasks;