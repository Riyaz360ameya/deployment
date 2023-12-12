import React, { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { FiAlertOctagon } from 'react-icons/fi';
import { PiChatDotsLight } from 'react-icons/pi';
import axios from 'axios';
import TaskAssignModal from './TaskAssignModal';

const Projects = () => {
    const [modal, setModal] = useState(false);
    const [tasks, setTasks] = useState([]);

    const handleAssign = () => {
        setModal(true);
    };
    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('/api/task/projectManagerTask/managerData');
            const details = data.tasks
            setTasks(details)
            console.log(data.tasks, "lead")
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    useEffect(() => {
        fetchTasks();
    }, []);



    return (
        <>
            <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden' >
                <div className=''>
                    <h1 className='text-xl p-2'>Projects</h1>
                    <div className='flex gap-4 ml-2'>
                        <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl">
                            <p>All</p>
                        </div>
                        <div className="py-2 px-8  hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl">
                            <p>Done</p>
                        </div>
                        <div className="py-2 px-8 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl">
                            <p>Pending</p>
                        </div>
                    </div>
                </div>
                <div className='border shadow mt-4'>
                    <table className="w-full whitespace-nowrap shadow p-3 ">
                        <tbody>
                            <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded shadow-xl">
                                <th>No</th>
                                <th>Select</th>
                                <th>Project Tile</th>
                                <th>Importance</th>
                                <th>Assigned To</th>
                                <th>Comments</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                            <tr className='h-5'></tr>
                            <tr className='text-center mt-10 shadow-xl border'>
                                <td>1</td>
                                <td className='text-center flex justify-center items-center h-10 '>
                                    <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                        <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full " />
                                    </div>
                                </td>
                                <td className="">
                                    <div className="flex items-center gap-2 ml-5">
                                        <FaLink color='blue' />
                                        <p className="text-base font-medium  text-gray-700 ">Sandro</p>
                                    </div>
                                </td>
                                <td className="">
                                    <p>5</p>
                                </td>
                                <td colSpan="8" className="text-center">
                                    <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={handleAssign} >Assign Task to</button>
                                </td>
                            </tr>
                            {tasks.map((item, i) => {
                                return (
                                    <tr key={i} className='text-center mt-10 shadow-xl border'>
                                        <td>{i}</td>
                                        <td className='text-center flex justify-center items-center h-10 '>
                                            <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                                <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full " />
                                            </div>
                                        </td>
                                        <td className="">
                                            <div className="flex items-center gap-2  ml-5">
                                                <FaLink color='blue' />
                                                <p className="text-base font-medium  text-gray-700 ">{item.description}</p>
                                            </div>
                                        </td>
                                        <td className="">
                                            <div className="flex items-center justify-center">
                                                <FiAlertOctagon color='red' />
                                                <p className="text-sm text-gray-600 ml-2">{item.importance}</p>
                                            </div>
                                        </td>
                                        <td className='text-center'>{item.team}</td>
                                        <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item.description}</td>
                                        <td className='bg-red-200 rounded text-red-600'>{item.endDate}</td>
                                        <td>50%</td>
                                        <td className='flex gap-2 items-center justify-center'>
                                            <button className='px-3 bg-blue-600 text-white rounded'>E</button>
                                            <button className='px-3 bg-red-600 text-white rounded'>D</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {
                    modal ? <TaskAssignModal setModal={setModal} /> : ""
                }
            </div>
        </>
    );
};

export default Projects;

