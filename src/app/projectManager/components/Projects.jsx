import React, { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { PiChatDotsLight } from 'react-icons/pi';
import TaskAssignModal from './TaskAssignModal';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import Badge from './Badge';
import { dateConverter } from '@/app/api/helpers/dateConverter';
import { toast } from 'sonner';

const Projects = ({ loading, setLoading }) => {
    const [projectId, setProjectId] = useState()
    const [projects, setProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([])
    const [newPro, setNewPro] = useState([])
    const [onGoingProjects, setOnGoingProjects] = useState([])
    const [completed, setCompleted] = useState([])
    const [position, setPosition] = useState("New")
    const [modal, setModal] = useState(false);
    const [proManagerId, setProManagerId] = useState()

    const fetchProjects = async () => {
        try {
            const PM = JSON.parse(localStorage.getItem("PM"))
            const proManagerId = PM._id
            setProManagerId(proManagerId)
            const { data } = await axios.post('/api/projectManager/allProjects', { proManagerId });
            setNewPro(data.PmProjects.newProjects)
            setAllProjects(data.projectData)
            setOnGoingProjects(data.PmProjects.onGoingProjects)
            setCompleted(data.PmProjects.completedProjects)
            console.log(data.PmProjects.completedProjects, '-------------data.PmProjects.completedProjects')
            setProjects(data.PmProjects.newProjects)
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
        fetchProjects();
        setLoading(false);
    }, []);
    const handleAssign = (id) => {
        setModal(true);
        setProjectId(id)
    };
    const handleData = (name) => {
        setPosition(name)
        name === "All" ? setProjects(allProjects)
            : name === "New" ? setProjects(newPro)
                : name === "OnGoing" ? setProjects(onGoingProjects)
                    : name === "Completed" ? setProjects(completed)
                        : "";
    };
    const handleUpdate = async (projectId) => {
        try {
            const { data } = await axios.post('/api/projectManager/complete', { projectId, proManagerId })
            toast.success(data.message)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.error);
        }
    }
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
                        <h1 className='text-2xl font-bold p-2'>PROJECTS</h1>
                        <div className='flex gap-4 ml-2'>
                            {/* <div className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl' onClick={() => handleProject("All")}>
                                <p>All</p>
                            </div> */}
                            <div onClick={() => handleData("New")} className={`py-2 px-8  ${position === "New" && "bg-indigo-200"}  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl`}>
                                <p>New</p>
                            </div>
                            <div onClick={() => handleData("OnGoing")} className={`py-2 px-8  ${position === "OnGoing" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl`}>
                                <p>OnGoing</p>
                            </div>
                            <div onClick={() => handleData("Completed")} className={`py-2 px-8  ${position === "Completed" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl`}>
                                <p>Completed</p>
                            </div>

                            {/* <div className='py-2 px-8 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl' onClick={() => handleProject("Pending")}>
                                <p>Pending</p>
                            </div> */}
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
                                    <th>ReachedOn</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    {
                                        position == "Completed" && <th>Completed On</th>
                                    }
                                    {
                                        position !== "Completed" && <th>Options</th>
                                    }
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
                                                            <p>{item.projectId.projectInfo.ventureName}</p>
                                                        </div>
                                                    </td>
                                                    <td className=''>
                                                        <p>{item.projectId._id.slice(14, 23)}</p>
                                                    </td>
                                                    <td className='text-center'>{item.projectId.projectInfo.ventureType}</td>
                                                    <td className='flex items-center justify-center gap-2'>
                                                        <PiChatDotsLight />
                                                        {item.projectId.projectInfo.ventureDescription}
                                                    </td>
                                                    <td className=' rounded text-blue-600'>{dateConverter(item.projectReachedOn)}</td>
                                                    <td className='bg-red-200 rounded text-red-600'>{item.projectId.projectInfo.estimatedDeliveryDate}</td>
                                                    <td>{item.status}</td>
                                                    {/* <td>{item.projectId.projectInfo.status}</td> */}
                                                    {
                                                        position == "Completed" && <td className='font-bold text-green-700'>{dateConverter(item.leadTaskCompletedDate)}</td>
                                                    }
                                                    <td>
                                                        {
                                                            position !== "Completed" ?
                                                                item.payment === "Payment is Done" ?
                                                                    <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={() => handleAssign(item.projectId._id)} >Assign Task to</button>
                                                                    :
                                                                    item.status === "Assigned" ?
                                                                        <>
                                                                            <button className='px-3 bg-blue-600 text-white rounded'>E</button>
                                                                            <button className='px-3 ml-2 bg-red-600 text-white rounded'>D</button>
                                                                        </>
                                                                        :
                                                                        item.status === "Completed" ?
                                                                            <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={() => handleUpdate(item.projectId._id)} >Update</button>
                                                                            : <p className='text-red-600'>
                                                                                Not Payed
                                                                            </p>
                                                                : ''
                                                        }
                                                    </td>
                                                </tr>
                                            )
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
