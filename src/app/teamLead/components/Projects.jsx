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
                <div className="max-w-full overflow-x-auto py-4">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div class="pb-4 bg-white dark:bg-gray-900 py-5">
                            <label for="table-search" class="sr-only">Search</label>
                            <div class="relative mb-3">
                                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="text" id="table-search" class=" block pt-2 pb-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                            </div>
                        </div>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="p-4">
                                        <div class="flex items-center">
                                            <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Project Title
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Importance
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Assigned Date
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Comments
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        View Files
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Deadline
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {leadData.length === 0 ? (
                                    <tr className="text-center mt-10 shadow-xl border">
                                        <td colSpan="7" className="text-2xl text-blue-600">No Tasks</td>
                                    </tr>
                                ) : (
                                    leadData.map((item, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 p-4">
                                                <div className="flex items-center">
                                                    <input id={`checkbox-table-search-${index + 1}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor={`checkbox-table-search-${index + 1}`} className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.projectTitle}</td>
                                            <td className="px-6 py-4">{item.importance}</td>
                                            <td className="px-6 py-4">{item.assignedDate}</td>
                                            <td className="px-6 py-4">{item?.instruction}</td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => viewFilesData(item.projectId)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</button>
                                            </td>
                                            <td className="px-6 py-4">{item?.endDate}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {viewFiles ? <ViewFileModal projectId={projectId} /> : ''}
                {
                    modal ? <TaskAssignModal projectId={projectId} setModal={setModal} onGoingFurther={onGoingFurther} /> : ""
                }
                {
                    cModal ? <ConfirmModal projectId={projectId} setCModal={setCModal} /> : ""
                }
            </div>


        </>
    );
};
export default Projects