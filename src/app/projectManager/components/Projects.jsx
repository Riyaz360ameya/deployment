import React, { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { PiChatDotsLight } from 'react-icons/pi';
import TaskAssignModal from './TaskAssignModal';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import Badge from './Badge'; 

const Projects = ({ loading, setLoading }) => {
    const [projectId, setProjectId] = useState()
    const [tasks, setTasks] = useState([]);
    const [modal, setModal] = useState(false);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('/api/projectManager/projectDetails');
            const details = data.projectData[0].Details;

            const updatedTasks = details.map((project) => {
                const isNew = new Date(project.date) > new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
                return { ...project, isNew };
            });

            setTasks(updatedTasks);
            console.log(updatedTasks, 'projectdata');
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        }
    };

    useEffect(() => {
        fetchTasks();
        setLoading(false);
    }, []);

    const handleAssign = (id) => {
        setModal(true);
        setProjectId(id)
    };

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
                        <h1 className='text-xl p-2'>Projects</h1>
                        <div className='flex gap-4 ml-2'>
                            <div className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>All</p>
                            </div>
                            <div className='py-2 px-8  hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>Done</p>
                            </div>
                            <div className='py-2 px-8 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className='border shadow mt-4'>
                        <table className='w-full whitespace-nowrap shadow p-3 '>
                            <tbody>
                                <tr tabIndex='0' className='focus:outline-none h-16 border border-gray-100 rounded shadow-xl'>
                                    <th>No</th>
                                    <th>Select</th>
                                    <th>Builder Name</th>
                                    <th>Project No</th>
                                    <th>Venture Type</th>
                                    <th>Description</th>
                                    <th>Deadline</th>
                                    <th>Work</th>
                                    <th>Status</th>
                                    <th>Options</th>
                                </tr>
                                <tr className='h-5'></tr>
                                {tasks.map((item, i) => {
                                    return (
                                        <tr key={i} className='text-center mt-10 shadow-xl border'>
                                            <td>{i + 1}</td>
                                            <td className='text-center flex justify-center items-center h-10 '>
                                                <div className='bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative'>
                                                    <input
                                                        placeholder='checkbox'
                                                        type='checkbox'
                                                        className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full '
                                                    />
                                                </div>
                                            </td>
                                            <td className=''>
                                                <div className='flex items-center gap-2 ml-5' >
                                                    {item.isNew && <Badge label='New' color='bg-green-500 text-white' />}
                                                    <FaLink color='blue' />
                                                    <p>{item.ventureName}</p>
                                                </div>
                                            </td>
                                            <td className=''>
                                                <p>55</p>
                                            </td>
                                            <td className='text-center'>{item.ventureType}</td>
                                            <td className='flex items-center justify-center gap-2'>
                                                <PiChatDotsLight />
                                                {item.ventureDescription}
                                            </td>
                                            <td className='bg-red-200 rounded text-red-600'>{item.estimatedDelivaryDate}</td>
                                            <td>assigned</td>
                                            <td>{item.status}</td>
                                            <td className='flex gap-2 items-center justify-center'>
                                                {
                                                    item.status === "New Task" ?
                                                        <>
                                                            <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={() => handleAssign(item._id)} >Assign Task to</button>
                                                        </>
                                                        :
                                                        <>
                                                            <button className='px-3 bg-blue-600 text-white rounded'>E</button>
                                                            <button className='px-3 bg-red-600 text-white rounded'>D</button>
                                                        </>
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {modal ? <TaskAssignModal projectId={projectId} setModal={setModal} /> : ''}
                </div>
            )}
        </>
    );
};

export default Projects;
