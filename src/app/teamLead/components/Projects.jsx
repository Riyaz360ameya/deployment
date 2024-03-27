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
import ViewFilesModal from '@/app/components/common/ViewFilesModal';
import { VscFiles } from "react-icons/vsc";
import { CiSaveDown1 } from "react-icons/ci";
import { IoCloudUploadOutline } from "react-icons/io5";


// import ViewFileModal from './ViewFilesModal';
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

    // Task assign 
    const [workType, setWorkType] = useState()

    const fetchTasks = async () => {
        try {
            const { data } = await getAllTasks()
            console.log(data.LeadTasks.newTasks, '----------------------data.LeadTasks.newTasks')
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
    const handleAssign = ({ id, workType }) => {
        const trueCondition = Object.keys(workType).find(key => workType[key]);
        const trueConditionValue = workType[trueCondition];

        setWorkType(trueCondition)
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
            <div className="rounded-sm border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white sm:px-7.5 xl:pb-1">
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
                <div className="py-2 ">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search" className="block p-3 ps-10  text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search htmlFor items" />
                    </div>
                </div>
                <div className="relative overflow-auto shadow-md sm:rounded-lg mt-5 border">
                    <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    NO:
                                </th>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Project Title
                                </th>
                                <th scope="col" className="text-center">
                                    Importance
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Assigned Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Comments
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Work Type
                                </th>
                                <th scope="col" className="text-center">
                                    Files
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Deadline
                                </th>
                                {
                                    position !== "New Task" && (
                                        <>
                                            <th scope="col" className="px-6 py-3">
                                                Assigned Dev
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Dev Status
                                            </th>
                                        </>
                                    )
                                }
                                {
                                    position === "New Task" &&
                                    <>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                    </>
                                }
                                {
                                    (position !== "Completed") &&
                                    <>
                                        <th scope="col" className="px-6 py-3">
                                            Options
                                        </th>
                                    </>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {leadData.length === 0 ? (
                                <tr className="mt-10 text-center border shadow-xl">
                                    <td colSpan="7" className='text-2xl text-blue-600'>No Tasks</td>
                                </tr>
                            ) : (
                                currentTasks.map((item, i) => (
                                    <tr key={i} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {i + 1}
                                        </td>
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input id={`checkbox-table-search-${i}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor={`checkbox-table-search-${i}`} className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className=" font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item?.projectTitle}
                                        </td>
                                        <td className={`text-center ${item?.importance === "URGENT"?'text-red-500 font-bold':'' }`}>
                                            {item?.importance}
                                        </td>
                                        <td className="text-center">
                                            {dateConverter(item?.assignedDate)}
                                        </td>
                                        <td className=" text-center">
                                            <span className='flex items-center gap-3'><PiChatDotsLight />{item?.instruction}</span>
                                        </td>
                                        <td className="text-center">
                                            {item?.workType?.['8K Render'] ? "8K Render" :
                                                item?.workType?.['Texture And Lightning'] ? "Texture And Lightning" :
                                                    item?.workType?.['White Render'] ? "White Render" :
                                                        "NOT Specified"}
                                        </td>
                                        <td className="px-6 py-4 text-center cursor-pointer">
                                            <span className='flex items-center gap-3' onClick={() => viewFilesData(item.projectId)}><VscFiles />view</span>
                                        </td>
                                        <td className="text-center">
                                            {item?.endDate}
                                        </td>
                                        {position !== "New Task" &&
                                            <td className="px-6 py-4 bg-red-200 rounded text-red-600">
                                                {item?.assignedDeveloperName}
                                            </td>
                                        }

                                        <td className="">
                                            {item?.status}
                                        </td>
                                        <td className='text-center'>
                                            {item?.status === "New Task" ?
                                                item?.workType?.['8K Render'] ?
                                                    <div className='flex items-center justify-center'>
                                                        <button className='bg-green-700 p-2 text-white rounded flex items-center gap-2'>Download <span className='text-2xl'> <CiSaveDown1 /></span></button>
                                                        {/* <button className='bg-yellow-600 p-2 text-white rounded text-2xl'><IoCloudUploadOutline /></button> */}
                                                    </div> :
                                                    <button className='px-3 py-1 text-white bg-blue-600 rounded' onClick={() => handleAssign({ id: item?.projectId, workType: item?.workType })} >
                                                        Assign Task to
                                                    </button>
                                                :
                                                item.status === "Assigned" ?
                                                    <>
                                                        <button className='px-3 text-white bg-blue-600 rounded'>E</button>
                                                        <button className='px-3 ml-2 text-white bg-red-600 rounded'>D</button>
                                                    </>
                                                    :
                                                    position !== "Completed" &&
                                                        item?.status === "Completed" ?
                                                        <button className='px-3 py-1 text-white bg-blue-600 rounded' onClick={() => handleUpdate(item?.projectId)} >
                                                            Update
                                                        </button>
                                                        : ""
                                            }
                                        </td>
                                        {/* <td>
                                            {item?.status === "New Task" ?
                                                <button className='px-3 py-1 text-white bg-blue-600 rounded' onClick={() => handleAssign({ id: item?.projectId, workType: item?.workType })} >
                                                    Assign Task to
                                                </button>
                                                :
                                                item.status === "Assigned" ?
                                                    <>
                                                        <button className='px-3 text-white bg-blue-600 rounded'>E</button>
                                                        <button className='px-3 ml-2 text-white bg-red-600 rounded'>D</button>
                                                    </>
                                                    :
                                                    position !== "Completed" &&
                                                        item?.status === "Completed" ?
                                                        <button className='px-3 py-1 text-white bg-blue-600 rounded' onClick={() => handleUpdate(item?.projectId)} >
                                                            Update
                                                        </button>
                                                        : ""
                                            }
                                        </td> */}
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>

                    {viewFiles ? <ViewFilesModal projectId={projectId} setViewFiles={setViewFiles} /> : ''}

                    {
                        modal ? <TaskAssignModal projectId={projectId} setModal={setModal} onGoingFurther={onGoingFurther} workType={workType} /> : ""
                    }
                    {
                        cModal ? <ConfirmModal projectId={projectId} setCModal={setCModal} /> : ""
                    }
                </div>
                {/* {viewFiles ? <ViewFileModal userDetails={userDetails} uniqueId={uniqueId} setViewFiles={setViewFiles} details={details} /> : ''}

                {
                    modal ? <TaskAssignModal projectId={projectId} setModal={setModal} onGoingFurther={onGoingFurther} /> : ""
                }
                {
                    cModal ? <ConfirmModal projectId={projectId} setCModal={setCModal} /> : ""
                } */}
            </div>
        </>
    );
};
export default Projects