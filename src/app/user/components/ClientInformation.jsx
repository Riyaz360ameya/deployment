import React, { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { PiChatDotsLight } from 'react-icons/pi';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import Badge from '../projectManager/components/Badge';
function ClientInformation() {
    const [projectId, setProjectId] = useState()
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [modal, setModal] = useState(false);
    const fetchTasks = async () => {
        console.log(tasks)
        setLoading(true);
        try {
            const { data } = await axios.get('/api/projectManager/projectDetails');
            const details = data.projectData[0].Details;
            //showing badges afer 24 hours 
            const updatedTasks = details.map((project) => {
                const isNew = new Date(project.date) > new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
                return { ...project, isNew };
            });

            setTasks(updatedTasks);
            console.log(updatedTasks, 'projectdata');
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
            setLoading(false);
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
                        <h1 className='text-xl p-2 flex justify-center items-center shadow-lg bg-gray-200'>Your Projects Details</h1>
                        <div className='flex gap-4 ml-2 py-4'>
                            <div className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>All</p>
                            </div>
                            <div className='py-2 px-8  hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>previous</p>
                            </div>
                            <div className='py-2 px-8 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>onGoing</p>
                            </div>
                            <div className='py-2 px-8 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
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
                                {tasks.map((item, i) => {
                                    return (
                                        <tr key={i} className='text-center mt-10 shadow-xl border'>
                                            <td>{i + 1}</td>
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
