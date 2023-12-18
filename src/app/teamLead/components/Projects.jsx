import React, { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { FiAlertOctagon } from 'react-icons/fi';
import { PiChatDotsLight } from 'react-icons/pi';
import axios from 'axios';
import TaskAssignModal from './TaskAssignModal';
import { toast } from 'sonner';
import ConfirmModal from './ConfirmModal';
const Projects = () => {
    const [projectId, setProjectId] = useState('')
    const [Lead, setLead] = useState()
    const [modal, setModal] = useState(false);
    const [cModal, setCModal] = useState(false)
    const [newTasks, setNewTasks] = useState([])
    const [onGoing, setOnGoing] = useState([])
    const [completed, setCompleted] = useState([])
    const [data, setData] = useState([])
    const [position, setPosition] = useState("New Task")
    const handleAssign = (id) => {
        setModal(true);
        setProjectId(id)
    };
    const handleData = (name) => {
        if (name === "New Task") {
            setPosition(name)
            setData(newTasks)
        } else if (name === "OnGoing") {
            setPosition(name)
            setData(onGoing)
        } else if (name === "Completed") {
            setPosition(name)
            setData(completed)
        }
    }
    const fetchTasks = async () => {
        try {
            const lead = JSON.parse(localStorage.getItem("TeamLead"));
            const leadId = lead._id
            setLead(leadId)
            const { data } = await axios.post('/api/teamLead/allTasks', { leadId });
            setData(data.LeadTasks.newTasks)
            setNewTasks(data.LeadTasks.newTasks)
            setOnGoing(data.LeadTasks.onGoingTasks)
            setCompleted(data.LeadTasks.completedTasks)
            toast.success(data.message);
        } catch (error) {
            console.error(error, '--------------allTasks error 1122');
            toast.error(error.response.data.error)
        }
    };
    useEffect(() => {
        fetchTasks();
    }, []);
    const handleUpdate = (id) => {
        setCModal(true)
        setProjectId(id)
    }
    return (
        <>
            <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden' >
                <div className=''>
                    <h1 className='text-xl p-2'>Projects</h1>
                    <div className='flex gap-4 ml-2'>
                        <div onClick={() => handleData("New Task")} className={`py-2 px-8  ${position === "New Task" && "bg-indigo-100"}  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl`}>
                            <p className=''>New Task</p>
                        </div>
                        <div onClick={() => handleData("OnGoing")} className={`py-2 px-8  ${position === "OnGoing" && "bg-indigo-100"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl`}>
                            <p>OnGoing</p>
                        </div>
                        <div onClick={() => handleData("Completed")} className={`py-2 px-8  ${position === "Completed" && "bg-indigo-100"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl`}>
                            <p>Completed</p>
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
                                <th>Assigned Date</th>
                                <th>Comments</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                {
                                    (position === "OnGoing" || position === "Completed") &&
                                    <th>Assigned Dev</th>
                                }
                                <th>Options</th>
                            </tr>
                            <tr className='h-5'></tr>
                            {/* <tr className='text-center mt-10 shadow-xl border'>
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
                            </tr> */}
                            {data.map((item, i) => {
                                return (
                                    <tr key={i} className='text-center mt-10 shadow-xl border'>
                                        <td>{i + 1}</td>
                                        <td className='text-center flex justify-center items-center h-10 '>
                                            <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                                <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full " />
                                            </div>
                                        </td>
                                        <td className="">
                                            <div className="flex items-center gap-2  ml-5">
                                                <FaLink color='blue' />
                                                <p className="text-base font-medium  text-gray-700 ">{item.projectTitle}</p>
                                            </div>
                                        </td>
                                        <td className="">
                                            <div className="flex items-center justify-center">
                                                <FiAlertOctagon color='red' />
                                                <p className="text-sm text-gray-600 ml-2">{item.importance}</p>
                                            </div>
                                        </td>
                                        <td className='text-center'>{item.assignedDate}</td>
                                        <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item.instruction}</td>
                                        <td className='bg-red-200 rounded text-red-600'>{item.endDate}</td>
                                        <td>{item.status}</td>
                                        {position !== "New Task" && <td>{item.assignedDeveloperName}</td>}
                                        <td className='flex gap-2 items-center justify-center'>
                                            {
                                                item.status === "New Task" ?
                                                    <>
                                                        <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={() => handleAssign(item.projectId)} >Assign Task to</button>
                                                    </>
                                                    :
                                                    item.status === "Completed" ?
                                                        <>
                                                            <button className='px-3 bg-blue-600 text-white rounded' onClick={() => handleUpdate(item.projectId)}>Update</button>
                                                        </>
                                                        :
                                                        <>
                                                            <button className='px-3 bg-blue-600 text-white rounded'>E</button>
                                                            <button className='px-3 bg-red-600 text-white rounded'>D</button>
                                                        </>
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {
                    modal ? <TaskAssignModal projectId={projectId} setModal={setModal} /> : ""
                }
                {
                    cModal ? <ConfirmModal Lead={Lead} projectId={projectId} setCModal={setCModal} /> : ""
                }
            </div>
        </>
    );
};
export default Projects;