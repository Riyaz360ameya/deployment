import React, { useState, useEffect } from 'react';
import { FiAlertOctagon } from "react-icons/fi";
import { PiChatDotsLight } from "react-icons/pi";
import { MdFileDownload } from "react-icons/md";
const Tasks = ({ userDetails, task, Project }) => {
    useEffect(() => {
        userDetails();
    }, []);
    const handleStartClick = () => {
        console.log('Its Started')
    }
    const handleCompleted = () => {
        console.log('Its Completed')
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
                            <th>Comments</th>
                            <th>Deadline</th>
                            {
                                Project !== "Completed" &&
                                <th>Task Option</th>
                            }
                        </tr>
                        <tr className='h-5'></tr>
                        {
                            task.length === 0 ? (
                                <tr className="text-center mt-10 shadow-xl border">
                                    <td colSpan="6" className='text-2xl text-blue-600'>No Tasks</td>
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
                                                <p className="text-sm text-gray-600 ml-2">Urgent</p>
                                            </div>
                                        </td>
                                        <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item.description}</td>
                                        <td className='bg-red-200 rounded text-red-600'>{item.endDate}</td>
                                        {
                                            Project !== "Completed" &&
                                            <td>
                                                <button
                                                    onClick={Project === "New Task" ? handleStartClick :
                                                        Project === "Ongoing Tasks" ? handleCompleted : ''
                                                    }
                                                    className='bg-green-800 text-white px-4 py-1 rounded'
                                                >
                                                    Start
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