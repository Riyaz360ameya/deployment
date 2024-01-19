import React, { useState, useEffect } from 'react';
import { FiAlertOctagon } from "react-icons/fi";
import { PiChatDotsLight } from "react-icons/pi";
import { dateConverter } from '@/app/api/helpers/dateConverter';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { completeTask, startTask } from '../devApis/taskApi';
import { developerCompletedProjectsStore, developerOngoingProjectsStore } from '@/app/redux/developer/developerProSlice';
const Tasks = ({ Project }) => {
    const [tasks, setTasks] = useState([])
    const dispatch = useDispatch();
    const devNewTasks = useSelector((state) => state.devloperTaskUpdates.developerNewTasks);
    const devOnGoTasks = useSelector((state) => state.devloperTaskUpdates.developerOngoingTasks);
    console.log(devOnGoTasks,'--------devOnGoTasks-----------')
    const devCompTasks = useSelector((state) => state.devloperTaskUpdates.developerCompletedTasks);
    console.log(devCompTasks,'----devCompTasks-----------------')
    const setProjects = (Project) => {
        console.log(Project, '-------------------------Project');
        if (Project === 'New Tasks') {
            setTasks(devNewTasks);
        } else if (Project === 'Ongoing Tasks') {
            console.log(devOnGoTasks, '-------------------------devOnGoTasks');
            setTasks(devOnGoTasks);
        } else if (Project === 'Completed') {
            setTasks(devCompTasks);
        }
    };

    useEffect(() => {
        setProjects(Project);
    }, [Project, devNewTasks, devOnGoTasks, devCompTasks]);



    console.log(tasks, '-----------------------tasks');
    const handleStartClick = async (projectId) => {
        try {
            console.log(projectId, '.............. project Started');
            const { data }  = await startTask(projectId);
            console.log(data, '-------------all info--------')
            const updatedDev = data?.upDatedDev;
            if (updatedDev) {
                const ongoingWork = updatedDev.onGoingTasks;
                console.log(ongoingWork, 'ongoingWork----------');
                dispatch(developerOngoingProjectsStore(ongoingWork));
                toast.success(data.message);
                // onGoingFurthur()
            } else {
                toast.error("Unexpected response format from startTask API");
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.error || "An error occurred");
        }
    };

    // const handleCompleted = async (projectId) => {
    //     try {
    //         console.log(projectId, '...........Its Completed')
    //         const { data } = await completeTask(projectId);
    //         console.log(data.upDatedDev.completedTasks, 'completed project in developer')
    //         const developerCompletedTask = data.upDatedDev.completedTasks
    //         console.log(developerCompletedTask,'------------developerCompletedTask completed-----------------')
    //         dispatch(developerCompletedProjectsStore(developerCompletedTask));
           
    //          toast.success(data.message)
    //     } catch (error) {
    //         console.log(error.message)
    //         toast.error(error);
    //     }
    // }
    const handleCompleted = async (projectId) => {
        try {
            console.log(projectId, '...........Its Completed')
            const { data } = await completeTask(projectId);
            console.log(data.upDatedDev.completedTasks, 'completed project in developer')
            const developerCompletedTask = data.upDatedDev.completedTasks;
            console.log(developerCompletedTask, '------------developerCompletedTask completed-----------------')
            
            const updatedOngoingTasks = devOnGoTasks.filter(task => task.projectId !== projectId);
            dispatch(developerOngoingProjectsStore(updatedOngoingTasks));
    
            dispatch(developerCompletedProjectsStore([...devCompTasks, ...developerCompletedTask]));
    
            toast.success(data.message);
        } catch (error) {
            console.log(error.message);
            toast.error(error);
        }
    }
           

    return (
        <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden'>
            <div className='border shadow mt-4'>
                <table className="w-full whitespace-nowrap shadow p-3">
                    <tbody>
                        <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded shadow-xl">
                            <th>No</th>
                            <th>Project Title</th>
                            <th>Importance</th>
                            <th>description</th>
                            <th>Assigned Date</th>
                            <th>Start Date</th>
                            {
                                Project !== "New Tasks" && <th>Dev Started</th>
                            }

                            <th>Deadline</th>
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
                                tasks.map((item, i) => (
                                    <tr className='text-center mt-10 shadow-xl border' key={item._id}>
                                        <td>{i + 1}</td>
                                        <td className="">
                                            <p>{item.projectTitle}</p>
                                        </td>
                                        <td className="">
                                            <div className="flex items-center justify-center">
                                                <FiAlertOctagon color='red' />
                                                <p className="text-sm text-gray-600 ml-2">{item.importance}</p>
                                            </div>
                                        </td>
                                        <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item.description}</td>
                                        <td className='b rounded text-green-600'>
                                            {dateConverter(item.assignedDate)}
                                        </td>
                                        <td className='b rounded text-blue-600 font-bold'>{item.startDate}</td>
                                        {
                                            Project !== "New Tasks" && <td> {dateConverter(item.devStartedDate)}</td>
                                        }
                                        <td className='bg-red-200  rounded text-red-600 font-bold'>{item.endDate}</td>
                                        {
                                            Project === "Completed" && <td className='text-green-600 font-bold'>{dateConverter(item.devCompletedDate)}</td>
                                        }
                                        {
                                            Project !== "Completed" &&
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        if (Project === "New Tasks") {
                                                            handleStartClick(item.projectId);
                                                        } else if (Project === "Ongoing Tasks") {
                                                            handleCompleted(item.projectId);
                                                        }
                                                    }}
                                                    className='bg-green-800 text-white px-4 py-1 rounded'
                                                >
                                                    {Project === "New Tasks" ? "Start" : Project === "Ongoing Tasks" ? "Set Completed" : ''}
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
    );
};
export default Tasks;
// --------------------------------
// import React, { useState, useEffect } from 'react';
// import { FiAlertOctagon } from "react-icons/fi";
// import { PiChatDotsLight } from "react-icons/pi";
// import { dateConverter } from '@/app/api/helpers/dateConverter';
// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux';
// import { completeTask, startTask } from '../devApis/taskApi';
// import { developerCompletedProjectsStore, developerOngoingProjectsStore } from '@/app/redux/developer/developerProSlice';
// const Tasks = ({ Project }) => {
//     const [tasks, setTasks] = useState([])
//     const dispatch = useDispatch();
//     const devNewTasks = useSelector((state) => state.devloperTaskUpdates.developerNewTasks);
//     const devOnGoTasks = useSelector((state) => state.devloperTaskUpdates.developerOngoingTasks);
//     console.log(devOnGoTasks,'--------devOnGoTasks-----------')
//     const devCompTasks = useSelector((state) => state.devloperTaskUpdates.developerCompletedTasks);
//     console.log(devCompTasks,'----devCompTasks-----------------')
//     const setProjects = (Project) => {
//         console.log(Project, '-------------------------Project');
//         if (Project === 'New Tasks') {
//             setTasks(devNewTasks);
//         } else if (Project === 'Ongoing Tasks') {
//             console.log(devOnGoTasks, '-------------------------devOnGoTasks');
//             setTasks(devOnGoTasks);
//         } else if (Project === 'Completed') {
//             setTasks(devCompTasks);
//         }
//     };

//     useEffect(() => {
//         setProjects(Project);
//     }, [Project, devNewTasks, devOnGoTasks, devCompTasks]);



//     console.log(tasks, '-----------------------tasks');
//     const handleStartClick = async (projectId) => {
//         try {
//             console.log(projectId, '.............. project Started');
//             const { data }  = await startTask(projectId);
//             console.log(data, '-------------all info--------')
//             const updatedDev = data?.upDatedDev;
//             if (updatedDev) {
//                 const ongoingWork = updatedDev.onGoingTasks;
//                 console.log(ongoingWork, 'ongoingWork----------');
//                 dispatch(developerOngoingProjectsStore(ongoingWork));
//                 toast.success(data.message);
//                 // onGoingFurthur()
//             } else {
//                 toast.error("Unexpected response format from startTask API");
//             }
//         } catch (error) {
//             console.log(error.message);
//             toast.error(error.response?.data?.error || "An error occurred");
//         }
//     };

//     // const handleCompleted = async (projectId) => {
//     //     try {
//     //         console.log(projectId, '...........Its Completed')
//     //         const { data } = await completeTask(projectId);
//     //         console.log(data.upDatedDev.completedTasks, 'completed project in developer')
//     //         const developerCompletedTask = data.upDatedDev.completedTasks
//     //         console.log(developerCompletedTask,'------------developerCompletedTask-----------------')
//     //         dispatch(developerCompletedProjectsStore(developerCompletedTask));
//     //         toast.success(data.message)
//     //     } catch (error) {
//     //         console.log(error.message)
//     //         toast.error(error);
//     //     }
//     // }

//     return (
//         <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden'>
//             <div className='border shadow mt-4'>
//                 <table className="w-full whitespace-nowrap shadow p-3">
//                     <tbody>
//                         <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded shadow-xl">
//                             <th>No</th>
//                             <th>Project Title</th>
//                             <th>Importance</th>
//                             <th>description</th>
//                             <th>Assigned Date</th>
//                             <th>Start Date</th>
//                             {
//                                 Project !== "New Tasks" && <th>Dev Started</th>
//                             }

//                             <th>Deadline</th>
//                             {
//                                 Project === "Completed" && <th>Completed Date</th>
//                             }
//                             {
//                                 Project !== "Completed" &&
//                                 <th>Task Option</th>
//                             }
//                         </tr>
//                         <tr className='h-5'></tr>
//                         {
//                             tasks.length === 0 ? (
//                                 <tr className="text-center mt-10 shadow-xl border">
//                                     <td colSpan="8" className='text-2xl text-blue-600'>No Tasks</td>
//                                 </tr>
//                             ) : (
//                                 tasks.map((item, i) => (
//                                     <tr className='text-center mt-10 shadow-xl border' key={item._id}>
//                                         <td>{i + 1}</td>
//                                         <td className="">
//                                             <p>{item.projectTitle}</p>
//                                         </td>
//                                         <td className="">
//                                             <div className="flex items-center justify-center">
//                                                 <FiAlertOctagon color='red' />
//                                                 <p className="text-sm text-gray-600 ml-2">{item.importance}</p>
//                                             </div>
//                                         </td>
//                                         <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item.description}</td>
//                                         <td className='b rounded text-green-600'>
//                                             {dateConverter(item.assignedDate)}
//                                         </td>
//                                         <td className='b rounded text-blue-600 font-bold'>{item.startDate}</td>
//                                         {
//                                             Project !== "New Tasks" && <td> {dateConverter(item.devStartedDate)}</td>
//                                         }
//                                         <td className='bg-red-200  rounded text-red-600 font-bold'>{item.endDate}</td>
//                                         {
//                                             Project === "Completed" && <td className='text-green-600 font-bold'>{dateConverter(item.devCompletedDate)}</td>
//                                         }
//                                         {
//                                             Project !== "Completed" &&
//                                             <td>
//                                                 <button
//                                                     onClick={() => {
//                                                         if (Project === "New Tasks") {
//                                                             handleStartClick(item.projectId);
//                                                         } else if (Project === "Ongoing Tasks") {
//                                                             handleCompleted(item.projectId);
//                                                         }
//                                                     }}
//                                                     className='bg-green-800 text-white px-4 py-1 rounded'
//                                                 >
//                                                     {Project === "New Tasks" ? "Start" : Project === "Ongoing Tasks" ? "Set Completed" : ''}
//                                                 </button>
//                                             </td>
//                                         }
//                                     </tr>
//                                 ))
//                             )
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
// export default Tasks;