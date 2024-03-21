import React, { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { FiAlertOctagon } from 'react-icons/fi';
import { PiChatDotsLight } from 'react-icons/pi';
import TaskAssignModal from './TaskAssignModal';
import { toast } from 'react-toastify';
import ConfirmModal from './ConfirmModal';
import { dateConverter } from '@/app/api/helpers/dateConverter';
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks } from '../leadAPIs/taskApi';
import { teamLeadCompletedProjectsStore, teamLeadNewProjectsStore, teamLeadOngoingProjectsStore } from '@/app/redux/teamLead/leadProSlice';
import ViewFileModal from './ViewFilesModal';
const Projects = () => {
    const dispatch = useDispatch();
    const leadNewTasks = useSelector((state) => state.leadTasks.teamLeadNewProjects)
    const leadOnGoingTask = useSelector((state) => state.leadTasks.teamLeadOngoingProjects)
    const leadCompletedTasks = useSelector((state) => state.leadTasks.teamLeadCompletedProjects)
    const [projectId, setProjectId] = useState('')
    const [modal, setModal] = useState(false);
    const [cModal, setCModal] = useState(false)
    const [leadData, setLeadData] = useState([])
    const [position, setPosition] = useState("New Task")
    const [viewFiles, setViewFiles] = useState(false);
    const [uniqueId, setUniqueId] = useState('')
    const [userDetails, setUserDetails] = useState()
    const [details, setDetails] = useState({})
    const [tasksPerPage] = useState(10); // Adjust the number of projects per page
    const [currentPage, setCurrentPage] = useState(1);

    const fetchTasks = async () => {
        try {
            const { data } = await getAllTasks()
            dispatch(teamLeadNewProjectsStore(data.LeadTasks.newTasks))
            dispatch(teamLeadOngoingProjectsStore(data.LeadTasks.onGoingTasks))
            dispatch(teamLeadCompletedProjectsStore(data.LeadTasks.completedTasks))
        } catch (error) {
            console.error(error.message);
            toast.error(error)
        }
    };
    const settingLeadData = (position) => {
        if (position === "New Task") {
            setLeadData(leadNewTasks)
        } else if (position === "OnGoing") {
            setLeadData(leadOnGoingTask)
        } else if (position === "Completed") {
            setLeadData(leadCompletedTasks)
        }
    }
    useEffect(() => {
        fetchTasks();
        settingLeadData(position)
    }, []);
    useEffect(() => {
        settingLeadData(position)
        setCurrentPage(1);
    }, [position]);

    // Assigning Task................
    const handleAssign = (id) => {
        setModal(true);
        setProjectId(id)
    };
    // when new task asiigned .........
    useEffect(() => {
        settingLeadData(position)
    }, [leadNewTasks, leadOnGoingTask, leadCompletedTasks]);

    const onGoingFurther = () => {
        setPosition('OnGoing')
    }
    const handleUpdate = (id) => {
        setCModal(true)
        setProjectId(id)
    }
    const viewFilesData = (projectId) => {
        setProjectId(projectId)
        setViewFiles(true);
        // setUniqueId(uniqueId)
        // setUserDetails(userDetails)
        // setDetails(fileDetails)
    }
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = leadData.slice(indexOfFirstTask, indexOfLastTask);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white sm:px-7.5 xl:pb-1">
                <div className=''>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-4 ml-2'>
                            <div onClick={() => setPosition("New Task")} className={`p-2 md:py-2 md:px-8  ${position === "New Task" && "bg-indigo-100"} cursor-pointer  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl`}>
                                <p className=''>New</p>
                            </div>
                            <div onClick={() => setPosition("OnGoing")} className={`p-2 md:py-2 md:px-8  ${position === "OnGoing" && "bg-indigo-100"} cursor-pointer hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl`}>
                                <p className=''>OnGoing</p>
                            </div>
                            <div onClick={() => setPosition("Completed")} className={`p-2 md:py-2 md:px-8  ${position === "Completed" && "bg-indigo-100"} cursor-pointer hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl`}>
                                <p className=''>Completed</p>
                            </div>
                        </div>
                        <div className="">
                            {Array.from({ length: Math.ceil(leadData.length / tasksPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-4 py-2 mx-1 font-extrabold shadow-xl ${currentPage === index + 1 ? 'bg-slate-600 text-white' : 'bg-white text-blue-500'
                                        } border border-blue-500 rounded-md hover:bg-slate-600 hover:text-white`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* <div className='border shadow mt-4'> */}
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full whitespace-nowrap shadow p-3">
                        <tbody>
                            <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded shadow-xl">
                                <th>No</th>
                                <th>Select</th>
                                <th>Project Title</th>
                                <th>Importance</th>
                                <th>Assigned Date</th>
                                <th>Comments</th>
                                <th>View Files</th>
                                <th>Deadline</th>
                                {
                                    position !== "New Task" && (
                                        <>
                                            <th>Assigned Dev</th>
                                            <th>Dev Status</th>
                                        </>
                                    )
                                }
                                {
                                    position === "New Task" &&
                                    <>
                                        <th>Status</th>
                                    </>
                                }
                                {
                                    (position !== "Completed") &&
                                    <>
                                        <th>Options</th>
                                    </>
                                }
                            </tr>
                            <tr className='h-5'></tr>
                            {
                                leadData.length === 0 ? (
                                    <tr className="text-center mt-10 shadow-xl border">
                                        <td colSpan="8" className='text-2xl text-blue-600'>No Tasks</td>
                                    </tr>
                                ) :
                                    currentTasks.map((item, i) => {
                                        return (
                                            <tr key={i} className='text-center mt-10 shadow-xl border'>
                                                <td>{i + 1}</td>
                                                <td className='text-center flex justify-center items-center h-10 '>
                                                    <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                                        <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full " />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-2  ml-5">
                                                        <FaLink color='blue' />
                                                        <p className="text-base font-medium  text-gray-700 ">{item?.projectTitle}</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center">
                                                        <FiAlertOctagon color='red' />
                                                        <p className="text-sm text-gray-600 ml-2">{item?.importance}</p>
                                                    </div>
                                                </td>
                                                <td>{dateConverter(item?.assignedDate)}</td>
                                                <td className='flex items-center justify-center gap-2'>
                                                    <PiChatDotsLight />{item?.instruction}
                                                </td>
                                                <td onClick={() => viewFilesData(item.projectId)}>
                                                    <button>Files</button>
                                                </td>
                                                <td className='bg-red-200 rounded text-red-600'>{item?.endDate}</td>

                                                {position !== "New Task" && <td>{item?.assignedDeveloperName}</td>}
                                                <td>{item?.status}</td>
                                                <td className='flex gap-2 items-center justify-center'>
                                                    {
                                                        item?.status === "New Task" ?
                                                            <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={() => handleAssign(item?.projectId)}>
                                                                Assign Task to
                                                            </button>
                                                            :
                                                            item?.status === "Assigned" ?
                                                                <>
                                                                    <button className='px-3 bg-blue-600 text-white rounded'>E</button>
                                                                    <button className='px-3 bg-red-600 text-white rounded'>D</button>
                                                                </>
                                                                :
                                                                position !== "Completed" &&
                                                                    item?.status === "Completed" ?
                                                                    <button className='px-3 bg-blue-600 text-white rounded' onClick={() => handleUpdate(item?.projectId)}>Update</button>
                                                                    : ""
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })}
                        </tbody>
                    </table>

                </div>
                {viewFiles ? <ViewFileModal projectId={projectId}  /> : ''}

                {
                    modal ? <TaskAssignModal projectId={projectId} setModal={setModal} onGoingFurther={onGoingFurther} /> : ""
                }
                {
                    cModal ? <ConfirmModal projectId={projectId} setCModal={setCModal} /> : ""
                }
            </div>

            {/* <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden' >
                <div className=''>
                    <h1 className='text-xl p-2'>Projects</h1>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-4 ml-2'>
                            <div onClick={() => setPosition("New Task")} className={`py-2 px-8  ${position === "New Task" && "bg-indigo-100"} cursor-pointer  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl`}>
                                <p className=''>New Task</p>
                            </div>
                            <div onClick={() => setPosition("OnGoing")} className={`py-2 px-8  ${position === "OnGoing" && "bg-indigo-100"} cursor-pointer hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl`}>
                                <p>OnGoing</p>
                            </div>
                            <div onClick={() => setPosition("Completed")} className={`py-2 px-8  ${position === "Completed" && "bg-indigo-100"} cursor-pointer hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl`}>
                                <p>Completed</p>
                            </div>
                        </div>
                        <div className="">
                            {Array.from({ length: Math.ceil(leadData.length / tasksPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-4 py-2 mx-1 font-extrabold shadow-xl ${currentPage === index + 1 ? 'bg-slate-600 text-white' : 'bg-white text-blue-500'
                                        } border border-blue-500 rounded-md hover:bg-slate-600 hover:text-white`}
                                >
                                    {index + 1}
                                </button>
                            ))}
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
                                <th>Views Files</th>
                                <th>Deadline</th>
                                {
                                    position !== "New Task" && (
                                        <>
                                            <th>Assigned Dev</th>
                                            <th>Dev Status</th>
                                        </>
                                    )
                                }
                                {
                                    position === "New Task" &&
                                    <>
                                        <th>status</th>
                                    </>
                                }
                                {
                                    (position !== "Completed") &&
                                    <>
                                        <th>Options</th>
                                    </>
                                }
                            </tr>
                            <tr className='h-5'></tr>
                            {
                                leadData.length === 0 ? (
                                    <tr className="text-center mt-10 shadow-xl border">
                                        <td colSpan="8" className='text-2xl text-blue-600'>No Tasks</td>
                                    </tr>
                                ) :
                                    currentTasks.map((item, i) => {
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
                                                        <p className="text-base font-medium  text-gray-700 ">{item?.projectTitle}</p>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="flex items-center justify-center">
                                                        <FiAlertOctagon color='red' />
                                                        <p className="text-sm text-gray-600 ml-2">{item?.importance}</p>
                                                    </div>
                                                </td>
                                                <td className='text-center'>{dateConverter(item?.assignedDate)}</td>
                                                <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item?.instruction}</td>
                                                <td className=''onClick={() => viewFilesData({ uniqueId: item.projectId.ProjectUniqId, userDetails: item.userId, fileDetails: item })}><button>Files</button></td>
                                                <td className='bg-red-200 rounded text-red-600'>{item?.endDate}</td>

                                                {position !== "New Task" && <td>{item?.assignedDeveloperName}</td>}
                                                <td>{item?.status}</td>
                                                <td className='flex gap-2 items-center justify-center'>
                                                    {
                                                        item?.status === "New Task" ?

                                                            <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={() => handleAssign(item?.projectId)} >
                                                                Assign Task to
                                                            </button>
                                                            :
                                                            item?.status === "Assigned" ?
                                                                <>
                                                                    <button className='px-3 bg-blue-600 text-white rounded'>E</button>
                                                                    <button className='px-3 bg-red-600 text-white rounded'>D</button>
                                                                </>
                                                                :
                                                                position !== "Completed" &&
                                                                    item?.status === "Completed" ?
                                                                    <button className='px-3 bg-blue-600 text-white rounded' onClick={() => handleUpdate(item?.projectId)}>Update</button>
                                                                    : ""
                                                    }
                                                </td>

                                            </tr>
                                        )
                                    })}
                        </tbody>
                    </table>
                </div>
                {viewFiles ? <ViewFileModal userDetails={userDetails} uniqueId={uniqueId} setViewFiles={setViewFiles} details={details} /> : ''}

                {
                    modal ? <TaskAssignModal projectId={projectId} setModal={setModal} onGoingFurther={onGoingFurther} /> : ""
                }
                {
                    cModal ? <ConfirmModal projectId={projectId} setCModal={setCModal} /> : ""
                }
            </div> */}
        </>
    );
};
export default Projects