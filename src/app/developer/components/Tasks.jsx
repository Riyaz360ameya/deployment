import React, { useState, useEffect } from 'react';
import { FiAlertOctagon } from "react-icons/fi";
import { PiChatDotsLight } from "react-icons/pi";
import { dateConverter } from '@/app/api/helpers/dateConverter';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { completeTask, startTask } from '../devApis/taskApi';
import { developerCompletedTasks, developerOngoingTasks, developerNewTasks } from '@/app/redux/developer/developerProSlice';
import { InfinitySpin } from 'react-loader-spinner';
// import ViewFileModal from './ViewFileModal';
import { usePathname } from 'next/navigation';
import ViewFilesModal from '@/app/components/common/ViewFilesModal';

const Tasks = () => {
    const [loading, setLoading] = useState(false)
    const [projectId, setProjectId] = useState()
    const [ViewFiles, setViewFiles] = useState(false)
    const user = useSelector((state) => state.user.userDetails);
    const designation = user.designation
    // console.log(designation, '---------------designation 5555')

    // location of tasks
    const pathname = usePathname()
    const Project = pathname.split('/').pop()
    // console.log(Project, '-------------Project')

    const dispatch = useDispatch();
    const [tasks, setTasks] = useState([])

    // Modal settings

    const [openModal, setOpenModal] = useState(false)
    const [dataFiles, setDataFiles] = useState({})

    const [tasksPerPage] = useState(12); // Adjust the number of projects per page
    const [currentPage, setCurrentPage] = useState(1);

    const devNewTasks = useSelector((state) => state.developerTasks.developerNewTasks);
    // console.log(devNewTasks, '-----------new task-------------')
    const devOnGoTasks = useSelector((state) => state.developerTasks.developerOngoingTasks);
    const devCompTasks = useSelector((state) => state.developerTasks.developerCompletedTasks);
    const newTasks = useSelector((state) => state.developerTasks.developerNewTasks);
    const setProjects = (Project) => {
        if (Project === 'newTasks') {
            setTasks(devNewTasks);
        } else if (Project === 'onGoingTasks') {
            setTasks(devOnGoTasks);
        } else if (Project === 'completedTasks') {
            setTasks(devCompTasks);
        }
    };
    useEffect(() => {
        setProjects(Project);
        setCurrentPage(1)
    }, [Project]);

    useEffect(() => {
        setProjects(Project);
    }, [devCompTasks]);
    useEffect(() => {
        setProjects(Project);
    }, [devOnGoTasks]);
    useEffect(() => {
        setProjects(Project);
    }, [devNewTasks]);

    const handleStartClick = async (projectId) => {
        try {
            setLoading(true);
            // console.log(projectId, '.............. project Started');
            const { data } = await startTask(projectId);
            // console.log(data, '-------------all info--------')
            const updatedDev = data?.upDatedDev;
            if (updatedDev) {
                const ongoingWork = updatedDev.onGoingTasks;
                // console.log(ongoingWork, 'ongoingWork----------');
                // Update ongoing tasks in the Redux store
                dispatch(developerOngoingTasks(ongoingWork));

                const updatedNewTasks = devNewTasks.filter(task => task.projectId !== projectId);
                dispatch(developerNewTasks(updatedNewTasks));
                toast.success(data.message);
                setLoading(false);
            } else {
                toast.error("Unexpected response format from startTask API");
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.error || "An error occurred");
            setLoading(false);
        }
    };
    const handleCompleted = async (projectId) => {
        try {
            setLoading(true);
            // console.log(projectId, '...........Its Completed')
            const { data } = await completeTask(projectId);
            // console.log(data.upDatedDev.completedTasks, 'completed project in developer')
            const developerCompletedTask = data.upDatedDev.completedTasks;
            // console.log(developerCompletedTask, '------------developerCompletedTask completed-----------------')

            const updatedOngoingTasks = devOnGoTasks.filter(task => task.projectId !== projectId);
            dispatch(developerOngoingTasks(updatedOngoingTasks));

            dispatch(developerCompletedTasks([...devCompTasks, ...developerCompletedTask]));

            toast.success(data.message);
            setLoading(false);

        } catch (error) {
            console.log(error.message);
            toast.error(error);
            setLoading(false);
        }
    }

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleViewAllData = (data) => {
        // console.log(data, '--------------------------data')
        setProjectId(data.projectId._id)
        setViewFiles(true)
        // setOpenModal(true)
        // setDataFiles(data)
    }
    return (
        <>
            <>
                {loading ? (
                    <div className='h-full flex items-center justify-center'>
                        <div>
                            <InfinitySpin width='200' color='black' />
                        </div>
                    </div>
                ) : (
                    <div className='p-2 h-full overflow-hidden w-full overflow-x-hidden'>
                        <div className='md:flex justify-between items-center'>
                            <div className="py-2">
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
                            <div className="flex justify-end">
                                {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map((_, index) => (
                                    <div key={index}>
                                        <button
                                            onClick={() => paginate(index + 1)}
                                            className={`px-4 py-2 font-extrabold shadow-xl ${currentPage === index + 1 ? 'bg-slate-600 text-white' : 'bg-white text-blue-500'
                                                } border border-blue-500 rounded-md hover:bg-slate-600 hover:text-white`}
                                        >
                                            {index + 1}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative overflow-auto shadow-md sm:rounded-lg mt-5 border">
                            <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center ">
                                            NO:
                                        </th>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-2 py-3">
                                            Project ID
                                        </th>
                                        {designation === "File Verifier" ?
                                            <th scope="col" className="px-2 py-3">User Name</th>
                                            :
                                            <>
                                                <th scope="col" className="px-6 py-3 text-center">Importance</th>
                                                <th scope="col" className="px-6 py-3 ">Description</th>
                                            </>
                                        }

                                        {designation !== "File Verifier" && <th scope="col" className="px-6 py-3 text-center">Assigned Date</th>}
                                        {designation === "File Verifier" && <th scope="col" className="px-6 py-3 text-center">Assigned Date</th>}
                                        {designation !== "File Verifier" && <th scope="col" className="px-6 py-3 text-center">Start Date</th>}
                                        {designation !== "File Verifier" && Project !== "newTasks" && <th scope="col" className="px-6 py-3 text-center ">Dev Started</th>}
                                        {designation !== "File Verifier" && <th scope="col" className="px-6 py-3 text-center">Deadline</th>}
                                        {Project === "completedTasks" && <th scope="col" className="px-6 py-3 text-center">Completed Date</th>}
                                        {Project !== "completedTasks" && <th scope="col" className="px-6 py-3 text-center">Task Option</th>}
                                    </tr>
                                </thead>
                                <tbody>

                                    {tasks.length === 0 ? (
                                        <tr className="text-center mt-10 shadow-xl border">
                                            <td colSpan="10" className='text-2xl text-blue-600'>No Tasks</td>
                                        </tr>
                                    ) : (
                                        currentTasks.map((item, i) => (
                                            <tr key={i} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                                <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {i + 1}
                                                </td>
                                                <td className="w-4 p-4">
                                                    <div className="flex items-center">
                                                        <input id={`checkbox-table-search-${i}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor={`checkbox-table-search-${i}`} className="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <td className='text-start'>{item.projectId.ProjectUniqId}</td>
                                                {designation === "File Verifier" ? <td className='px-2 '>{item.userId.firstName} {item.userId.lastName}</td> :
                                                    <>
                                                        <td className=" px-4">
                                                            <div className="flex items-center justify-start">
                                                                <FiAlertOctagon color='red' />
                                                                <p className="text-sm  ml-2">{item.importance}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 text-center cursor-pointer">
                                                            <span className='flex items-center gap-3'><PiChatDotsLight />{item.description}</span>
                                                        </td>
                                                    </>}
                                                <td className='text-green-600 font-bold px-2 text-center'>{dateConverter(item.assignedDate)}</td>
                                                {designation !== "File Verifier" && <td className=' text-blue-600 font-bold text-center'>{item.startDate}</td>}
                                                {designation !== "File Verifier" && <td className=' text-red-600 font-bold text-center'>{item.endDate}</td>}
                                                {designation !== "File Verifier" && Project !== "newTasks" && <td className='text-green-600 font-bold px-2 text-center'> {dateConverter(item.devStartedDate)}</td>}
                                                {designation !== "File Verifier" && Project === "completedTasks" && <td className='text-green-600 font-bold'>{dateConverter(item.devCompletedDate)}</td>}
                                                {Project === "completedTasks" && <td className='text-blue-600 font-bold text-center'>{dateConverter(item.endDate)}</td>}
                                                {Project !== "completedTasks" &&
                                                    <td className='text-center items-center'>
                                                        <div>
                                                            <button
                                                                onClick={() => {
                                                                    if (Project === "newTasks") {
                                                                        if (designation === "File Verifier") {
                                                                            handleViewAllData(item)
                                                                        } else {
                                                                            handleStartClick(item.projectId);
                                                                        }
                                                                    } else if (Project === "onGoingTasks") {
                                                                        handleCompleted(item.projectId);
                                                                    }
                                                                }}
                                                                className='bg-green-800 text-white px-4 py-1 rounded'
                                                            >
                                                                {designation === "File Verifier" ? "View" : Project === "newTasks" ? "Start" : Project === "onGoingTasks" ? "Set Completed" : ''}
                                                            </button>
                                                        </div>
                                                    </td>
                                                }
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {ViewFiles ? <ViewFilesModal setViewFiles={setViewFiles} projectId={projectId} /> : ''}
            </>

        </>
    );
};
export default Tasks;