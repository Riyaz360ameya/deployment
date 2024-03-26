import React, { useState, useEffect } from 'react';
import { FiAlertOctagon } from "react-icons/fi";
import { PiChatDotsLight } from "react-icons/pi";
import { dateConverter } from '@/app/api/helpers/dateConverter';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { completeTask, startTask } from '../devApis/taskApi';
import { developerCompletedProjectsStore, developerOngoingProjectsStore, developerNewProjectsStore } from '@/app/redux/developer/developerProSlice';
import { InfinitySpin } from 'react-loader-spinner';
import ViewFileModal from './ViewFileModal';

const Tasks = ({ Project, loading, setLoading, designation }) => {
    console.log(designation, '---------------designation 5555')
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState([])

    // Modal settings

    const [openModal, setOpenModal] = useState(false)
    const [dataFiles, setDataFiles] = useState({})

    const [tasksPerPage] = useState(12); // Adjust the number of projects per page
    const [currentPage, setCurrentPage] = useState(1);

    const devNewTasks = useSelector((state) => state.developerTaskUpdates.developerNewTasks.reverse());
    console.log(devNewTasks, '-----------new task-------------')
    const devOnGoTasks = useSelector((state) => state.developerTaskUpdates.developerOngoingTasks.reverse());
    const devCompTasks = useSelector((state) => state.developerTaskUpdates.developerCompletedTasks.reverse());
    const newTasks = useSelector((state) => state.developerTaskUpdates.developerNewTasks);
    const setProjects = (Project) => {
        if (Project === 'New Tasks') {
            setTasks(devNewTasks);
        } else if (Project === 'Ongoing Tasks') {
            setTasks(devOnGoTasks);
        } else if (Project === 'Completed') {
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
            console.log(projectId, '.............. project Started');
            const { data } = await startTask(projectId);
            console.log(data, '-------------all info--------')
            const updatedDev = data?.upDatedDev;
            if (updatedDev) {
                const ongoingWork = updatedDev.onGoingTasks;
                console.log(ongoingWork, 'ongoingWork----------');
                // Update ongoing tasks in the Redux store
                dispatch(developerOngoingProjectsStore(ongoingWork));

                const updatedNewTasks = devNewTasks.filter(task => task.projectId !== projectId);
                dispatch(developerNewProjectsStore(updatedNewTasks));
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
            console.log(projectId, '...........Its Completed')
            const { data } = await completeTask(projectId);
            console.log(data.upDatedDev.completedTasks, 'completed project in developer')
            const developerCompletedTask = data.upDatedDev.completedTasks;
            console.log(developerCompletedTask, '------------developerCompletedTask completed-----------------')

            const updatedOngoingTasks = devOnGoTasks.filter(task => task.projectId !== projectId);
            dispatch(developerOngoingProjectsStore(updatedOngoingTasks));

            dispatch(developerCompletedProjectsStore([...devCompTasks, ...developerCompletedTask]));

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
        setOpenModal(true)
        setDataFiles(data)
    }
    return (
        <>
            {/* {loading ? (
                <div className='h-full flex items-center justify-center'>
                    <div>
                        <InfinitySpin width='200' color='black' />
                    </div>
                </div>
            ) : (

                <div className='p-2 h-full overflow-hidden w-full overflow-x-hidden'>
                    <div className="flex  justify-end">
                        {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map((_, index) => (
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
                    <div className='border shadow mt-4'>
                        <table className="w-full whitespace-nowrap shadow p-3">
                            <tbody>
                                <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded shadow-xl">

                                    <th>No</th>
                                    <th>Project ID</th>

                                    {
                                        designation === "File Verifier" ?
                                            <th>User Name</th>
                                            :
                                            <>
                                                <th>Importance</th>
                                                <th>description</th>
                                            </>
                                    }
                                    <th>Assigned Date</th>
                                    {
                                        Project !== "New Tasks" && designation !== "File Verifier" && <th>Dev Started</th>
                                    }
                                    {
                                        designation !== "File Verifier" && <th>Deadline</th>
                                    }

                                    {
                                        Project === "Completed" && <th>Completed Date</th>
                                    }
                                    {
                                        Project !== "Completed" &&
                                        <th>Task Option</th>
                                    }
                                </tr>
                                <tr className='h-5'></tr>
                                {
                                    tasks.length === 0 ? (
                                        <tr className="text-center mt-10 shadow-xl border">
                                            <td colSpan="8" className='text-2xl text-blue-600'>No Tasks</td>
                                        </tr>
                                    ) : (
                                        currentTasks.map((item, i) => (
                                            <tr className='text-center mt-10 shadow-xl border h-10' key={item._id}>
                                                <td>{i + 1}</td>
                                                <td className="">
                                                    <p>{item.projectId.ProjectUniqId
}</p>
                                                </td>
                                                {
                                                    designation === "File Verifier" ? <td>{item.userId.firstName}</td>
                                                        : <>
                                                            <td className="">
                                                                <div className="flex items-center justify-center">
                                                                    <FiAlertOctagon color='red' />
                                                                    <p className="text-sm text-gray-600 ml-2">{item.importance}</p>
                                                                </div>
                                                            </td>
                                                            <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item.description}</td>
                                                        </>
                                                }
                                                <td className='b rounded text-green-600 font-bold'>
                                                    {dateConverter(item.assignedDate)}
                                                </td>
                                                {
                                                    designation !== "File Verifier" && <td className='b rounded text-blue-600 font-bold'>{item.startDate}</td>
                                                }
                                                {
                                                    designation !== "File Verifier" && Project !== "New Tasks" && <td> {dateConverter(item.devStartedDate)}</td>
                                                }
                                                {
                                                    designation !== "File Verifier" && Project === "Completed" && <td className='text-green-600 font-bold'>{dateConverter(item.devCompletedDate)}</td>
                                                }
                                                {
                                                    Project === "Completed" && <td className='b rounded text-blue-600 font-bold'>
                                                        {dateConverter(item.endDate)}
                                                    </td>

                                                }

                                               
                                                {
                                                    Project !== "Completed" &&
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                if (Project === "New Tasks") {
                                                                    if (designation === "File Verifier") {
                                                                        handleViewAllData(item)
                                                                    } else {
                                                                        handleStartClick(item.projectId);
                                                                    }
                                                                } else if (Project === "Ongoing Tasks") {
                                                                    handleCompleted(item.projectId);
                                                                }
                                                            }}
                                                            className='bg-green-800 text-white px-4 py-1 rounded'
                                                        >
                                                            {designation === "File Verifier" ? "View" : Project === "New Tasks" ? "Start" : Project === "Ongoing Tasks" ? "Set Completed" : ''}
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
            )}
            {openModal ? <ViewFileModal data={dataFiles} setOpenModal={setOpenModal} /> : ''} */}

            <>
                {loading ? (
                    <div className='h-full flex items-center justify-center'>
                        <div>
                            <InfinitySpin width='200' color='black' />
                        </div>
                    </div>
                ) : (
                    <div className='p-2 h-full overflow-hidden w-full overflow-x-hidden'>
                        <div className="flex justify-end">
                            {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map((_, index) => (
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
                        <div className='border shadow mt-4'>
                            <table className="w-full whitespace-nowrap shadow p-3">
                                <tbody>
                                    <tr className="bg-gray-50 dark:bg-gray-700">
                                        <th>No</th>
                                        <th>Project ID</th>
                                        {designation === "File Verifier" ? <th>User Name</th> : <><th>Importance</th><th>Description</th></>}
                                        <th>Assigned Date</th>
                                        {designation !== "File Verifier" && <th>Dev Started</th>}
                                        {designation !== "File Verifier" && <th>Deadline</th>}
                                        {Project === "Completed" && <th>Completed Date</th>}
                                        {Project !== "Completed" && <th>Task Option</th>}
                                    </tr>
                                    {tasks.length === 0 ? (
                                        <tr className="text-center mt-10 shadow-xl border">
                                            <td colSpan="8" className='text-2xl text-blue-600'>No Tasks</td>
                                        </tr>
                                    ) : (
                                        currentTasks.map((item, i) => (
                                            <tr className='text-center mt-10 shadow-xl border h-10' key={item._id}>
                                                <td>{i + 1}</td>
                                                <td className="">
                                                    <p>{item.projectId.ProjectUniqId}</p>
                                                </td>
                                                {designation === "File Verifier" ? <td>{item.userId.firstName}</td> :
                                                    <>
                                                        <td className="">
                                                            <div className="flex items-center justify-center">
                                                                <FiAlertOctagon color='red' />
                                                                <p className="text-sm text-gray-600 ml-2">{item.importance}</p>
                                                            </div>
                                                        </td>
                                                        <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item.description}</td>
                                                    </>}
                                                <td className='b rounded text-green-600 font-bold'>{dateConverter(item.assignedDate)}</td>
                                                {designation !== "File Verifier" && <td className='b rounded text-blue-600 font-bold'>{item.startDate}</td>}
                                                {designation !== "File Verifier" && Project !== "New Tasks" && <td> {dateConverter(item.devStartedDate)}</td>}
                                                {designation !== "File Verifier" && Project === "Completed" && <td className='text-green-600 font-bold'>{dateConverter(item.devCompletedDate)}</td>}
                                                {Project === "Completed" && <td className='b rounded text-blue-600 font-bold'>{dateConverter(item.endDate)}</td>}
                                                {Project !== "Completed" &&
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                if (Project === "New Tasks") {
                                                                    if (designation === "File Verifier") {
                                                                        handleViewAllData(item)
                                                                    } else {
                                                                        handleStartClick(item.projectId);
                                                                    }
                                                                } else if (Project === "Ongoing Tasks") {
                                                                    handleCompleted(item.projectId);
                                                                }
                                                            }}
                                                            className='bg-green-800 text-white px-4 py-1 rounded'
                                                        >
                                                            {designation === "File Verifier" ? "View" : Project === "New Tasks" ? "Start" : Project === "Ongoing Tasks" ? "Set Completed" : ''}
                                                        </button>
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
                {openModal ? <ViewFileModal data={dataFiles} setOpenModal={setOpenModal} /> : ''}
            </>

        </>
    );
};
export default Tasks;