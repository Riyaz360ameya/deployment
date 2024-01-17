import React, { useState, useEffect } from 'react';
import { FiAlertOctagon } from "react-icons/fi";
import { PiChatDotsLight } from "react-icons/pi";
import { dateConverter } from '@/app/api/helpers/dateConverter';
import { toast } from 'sonner';
import { useDispatch,useSelector } from 'react-redux';
import { completeTask, startTask } from '../devApis/taskApi';
import { developerCompletedProjectsStore, developerOngoingProjectsStore } from '@/app/redux/developer/developerProSlice';
const Tasks = ({ devTasks, task, Project }) => {
    const [dev, setDev] = useState()
    useEffect(() => {
        devTasks()
    }, []);
    const handleStartClick = async (projectId) => {
        try {
            console.log(projectId, '..............Its Started')
            const { data } = await startTask(projectId)
            toast.success(data.message)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.error);
        }
    }
    const handleCompleted = async (projectId) => {
        try {
            console.log(projectId, '...........Its Completed')
            const { data } = await completeTask(projectId);
            dispatch(developerCompletedProjectsStore(data));
            toast.success(data.message)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.error);
        }

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