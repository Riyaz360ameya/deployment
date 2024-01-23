import React, { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { PiChatDotsLight } from 'react-icons/pi';
import TaskAssignModal from './TaskAssignModal';
import { InfinitySpin } from 'react-loader-spinner';
import Badge from './Badge';
import { dateConverter } from '@/app/api/helpers/dateConverter';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { pmAllProjects, projectCompleted } from '../pmAPIs/projectApis';
import { completePmProject, pmCompletedProjects, pmNewProjects, pmOngoingProjects } from '@/app/redux/projectManager/pmProSlice';

const Projects = ({ loading, setLoading }) => {
    const pmNewPro = useSelector((state) => state.pmProjects.pmNewProjects)
    const pmOnGoPro = useSelector((state) => state.pmProjects.pmOngoingProjects)
    const pmComPro = useSelector((state) => state.pmProjects.pmCompletedProjects)
    console.log(pmNewPro.length, '---------------new-----------pmNewPro')
    console.log(pmOnGoPro, '--------------ON------------pmOnGoPro')
    console.log(pmComPro.length, '----------------comp----------pmComPro')
    const dispatch = useDispatch()
    // setting store values in a state
    const [pmNew, setPmNew] = useState(pmNewPro)
    const [pmOn, setPmOn] = useState(pmOnGoPro)
    const [pmCom, setPmCom] = useState(pmComPro)

    const [projectId, setProjectId] = useState()
    const [modal, setModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [position, setPosition] = useState("New")
    const [item, setItem] = useState()

    const getAllPmProjects = async () => {
        setLoading(true);
        try {
            const { data } = await pmAllProjects()
            dispatch(pmNewProjects(data.PmProjects.newProjects))
            setPmNew(data.PmProjects.newProjects)
            dispatch(pmOngoingProjects(data.PmProjects.onGoingProjects))
            setPmOn(data.PmProjects.onGoingProjects)
            dispatch(pmCompletedProjects(data.PmProjects.completedProjects))
            setPmCom(data.PmProjects.completedProjects)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
            setLoading(false);
        }
    }
    const settingAllPmProjects = (position) => {
        if (position === "New") {
            console.log(position, '----', pmNewPro.length, '................pmNewPro')
            setProjects(pmNew)
        } else if (position === "OnGoing") {
            console.log(position, '----', pmOnGoPro, '................pmOnGoPro')
            setProjects(pmOnGoPro)
        } else if (position === "Completed") {
            console.log(position, '----', pmComPro.length, '................pmComPro')
            setProjects(pmCom)
        }
    }
    useEffect(() => {
        getAllPmProjects()
        settingAllPmProjects(position)
    }, [])
    useEffect(() => {
        settingAllPmProjects(position)
    }, [position])

    // Assigning New Task to Lead............
    const handleAssign = ({ projectId, itemId }) => {
        setModal(true);
        setProjectId(projectId)
        setItem(itemId)
    };
    // when a new task is assigned...................
    useEffect(() => {
        settingAllPmProjects(position)
    }, [pmNewPro, pmOnGoPro]);

    // When update on each store data
    useEffect(() => {
        setPmNew(pmNewPro)
        setPmOn(pmOnGoPro)
        setPmCom(pmComPro)
    }, [pmNewPro, pmOnGoPro, pmComPro])

    const moveONgoing = () => {
        setPosition('OnGoing')
        console.log(pmOnGoPro, '---------------------------pmOnGoPro')
    }
    const handleUpdate = async ({ projectId, itemId }) => {
        try {
            const { data } = await projectCompleted(projectId)
            // dispatch(completePmProject(itemId));
            // dispatch(pmCompletedProjects(data.upDatedPmPro))
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
                            {/* <div onClick={() => handleData("New")} className={`py-2 px-8  ${position === "New" && "bg-indigo-200"}  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl cursor-pointer`}>
                                <p>New</p>
                            </div> */}
                            <div onClick={() => setPosition("New")} className={`py-2 px-8  ${position === "New" && "bg-indigo-200"}  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl cursor-pointer`}>
                                <p>New</p>
                            </div>
                            <div onClick={() => setPosition("OnGoing")} className={`py-2 px-8  ${position === "OnGoing" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl cursor-pointer`}>
                                <p>OnGoing</p>
                            </div>
                            <div onClick={() => setPosition("Completed")} className={`py-2 px-8  ${position === "Completed" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl cursor-pointer`}>
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
                                <tr className='h-16 border border-gray-950 text-white font-bold text-lg rounded shadow-xl sticky top-0 bg-gray-500 z-10'>
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
                                                            {/* {item.isNew && <Badge label='New' color='bg-green-500 text-white' />}
                                                    <FaLink color='blue' /> */}
                                                            <p>{item.userId?.organization}</p>
                                                        </div>
                                                    </td>
                                                    <td className=''>
                                                        <p>{item.projectId._id}</p>
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
                                                                    <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={() => handleAssign({ projectId: item.projectId._id, itemId: item._id })} >Assign Task to</button>
                                                                    :
                                                                    item.status === "Assigned" ?
                                                                        <>
                                                                            <button className='px-3 bg-blue-600 text-white rounded'>E</button>
                                                                            <button className='px-3 ml-2 bg-red-600 text-white rounded'>D</button>
                                                                        </>
                                                                        :
                                                                        item.status === "Completed" ?
                                                                            <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={() => handleUpdate({ projectId: item.projectId._id, itemId: item._id })} >Update</button>
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
                    {modal ? <TaskAssignModal projectId={projectId} setModal={setModal} itemId={item} moveONgoing={moveONgoing} /> : ''}
                </div>
            )}
        </>
    );
};
export default Projects;
// import React, { useState, useEffect } from 'react';
// import { FaLink } from 'react-icons/fa6';
// import { PiChatDotsLight } from 'react-icons/pi';
// import TaskAssignModal from './TaskAssignModal';
// import { InfinitySpin } from 'react-loader-spinner';
// import Badge from './Badge';
// import { dateConverter } from '@/app/api/helpers/dateConverter';
// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux'
// import { pmAllProjects } from '../pmAPIs/projectApis';
// import { leadTaskAssign, pmCompletedProjects, pmNewProjects, pmOngoingProjects } from '@/app/redux/projectManager/pmProSlice';

// const Projects = ({ loading, setLoading, getAllPmProjects }) => {
//     const dispatch = useDispatch()
//     const [projectId, setProjectId] = useState()
//     const [position, setPosition] = useState("New")
//     const [item, setItem] = useState()
//     const [modal, setModal] = useState(false);
//     const pmNewPro = useSelector((state) => state.pmProjects.pmNewProjects)
//     const pmOnGoPro = useSelector((state) => state.pmProjects.pmOngoingProjects)
//     const pmComPro = useSelector((state) => state.pmProjects.pmCompletedProjects)
//     const [projects, setProjects] = useState([]);
//     const handleData = (position) => {
//         // setPosition(name)
//         // position === "New" ? setProjects(pmNewPro)
//         //     : position === "OnGoing" ? setProjects(pmOnGoPro)
//         //         : position === "Completed" ? setProjects(pmComPro)
//         //             : "";
//         if (position === "New") {
//             setProjects(pmNewPro);
//             console.log(pmNewPro, '------store----1--------pmNewPro');
//         } else if (position === "OnGoing") {
//             setProjects(pmOnGoPro);
//             console.log(pmOnGoPro, '------store----2--------pmOnGoPro');
//         } else if (position === "Completed") {
//             setProjects(pmComPro);
//             console.log(pmComPro, '------store----3--------pmComPro');
//         }
//     };

//     useEffect(() => {
//         handleData(position)
//         console.log('........position changed.........')
//     }, [position]);
//     // useEffect(() => {
//     //     setProjects(pmComPro)
//     //     setPosition("Completed")
//     //     console.log('........pmComPro.........its calling')
//     // }, [pmComPro]);
//     useEffect(() => {
//         setProjects(pmOnGoPro)
//         setPosition("OnGoing")
//         console.log('........pmOnGoPro.........its calling')
//     }, [pmOnGoPro]);
//     useEffect(() => {
//         setProjects(pmNewPro)
//         setPosition("New")
//         console.log('........pmNewPro.........its calling')
//     }, [pmNewPro]);

//     // const handleAssign = ({ projectId, itemId }) => {
//     //     setModal(true);
//     //     setProjectId(projectId)
//     //     setItem(itemId)
//     // };

//     // const moveONgoing = () => {
//     //     setPosition('OnGoing')
//     //     setProjects(pmOnGoPro)
//     // }
//     const handleUpdate = async (projectId) => {
//         // try {
//         //     const { data } = await projectCompleted(projectId)
//         //     toast.success(data.message)
//         // } catch (error) {
//         //     console.log(error.message)
//         //     toast.error(error.response.data.error);
//         // }
//     }
//     return (
//         <>
//             {loading ? (
//                 <div className='h-full flex items-center justify-center'>
//                     <div>
//                         <InfinitySpin width='200' color='black' />
//                     </div>
//                 </div>
//             ) : (
//                 <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden'>
//                     <div>
//                         <h1 className='text-2xl font-bold p-2'>PROJECTS</h1>
//                         <div className='flex gap-4 ml-2'>
//                             {/* <div onClick={() => handleData("New")} className={`py-2 px-8  ${position === "New" && "bg-indigo-200"}  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl cursor-pointer`}>
//                                 <p>New</p>
//                             </div> */}
//                             <div onClick={() => setPosition("New")} className={`py-2 px-8  ${position === "New" && "bg-indigo-200"}  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl cursor-pointer`}>
//                                 <p>New</p>
//                             </div>
//                             <div onClick={() => setPosition("OnGoing")} className={`py-2 px-8  ${position === "OnGoing" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl cursor-pointer`}>
//                                 <p>OnGoing</p>
//                             </div>
//                             <div onClick={() => setPosition("Completed")} className={`py-2 px-8  ${position === "Completed" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl cursor-pointer`}>
//                                 <p>Completed</p>
//                             </div>
//                             {/* <div className='py-2 px-8 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl' onClick={() => handleProject("Pending")}>
//                                 <p>Pending</p>
//                             </div> */}
//                         </div>
//                     </div>
//                     <div className='border shadow mt-4'>
//                         <table className='w-full whitespace-nowrap shadow p-3 '>
//                             <tbody>
//                                 <tr tabIndex='0' className='focus:outline-none h-16 border border-gray-100 rounded shadow-xl'>
//                                     <th>No</th>
//                                     <th>Select</th>
//                                     <th>Builder Name</th>
//                                     <th>Project No</th>
//                                     <th>Venture Name</th>
//                                     <th>Description</th>
//                                     <th>ReachedOn</th>
//                                     <th>Deadline</th>
//                                     <th>Status</th>
//                                     {
//                                         position == "Completed" && <th>Completed On</th>
//                                     }
//                                     {
//                                         position !== "Completed" && <th>Options</th>
//                                     }
//                                 </tr>
//                                 <tr className='h-5'></tr>
//                                 {
//                                     projects.length === 0 ? (
//                                         <tr className="text-center mt-10 shadow-xl border">
//                                             <td colSpan="10" className='text-2xl text-blue-600'>No Projects</td>
//                                         </tr>
//                                     ) :
//                                         projects.map((item, i) => {
//                                             return (
//                                                 <tr key={i} className='text-center mt-10 shadow-xl border'>
//                                                     <td>{i + 1}</td>
//                                                     <td className='text-center flex justify-center items-center h-10 '>
//                                                         <div className='bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative'>
//                                                             <input
//                                                                 placeholder='checkbox'
//                                                                 type='checkbox'
//                                                                 className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full '
//                                                             />
//                                                         </div>
//                                                     </td>
//                                                     <td className=''>
//                                                         <div className='flex items-center gap-2 ml-5' >
//                                                             {/* {item.isNew && <Badge label='New' color='bg-green-500 text-white' />}
//                                                     <FaLink color='blue' /> */}
//                                                             <p>{item.userId?.organization}</p>
//                                                         </div>
//                                                     </td>
//                                                     <td className=''>
//                                                         <p>{item.projectId._id.slice(14, 23)}</p>
//                                                     </td>
//                                                     <td className='text-center'>{item.projectId.projectInfo.ventureName}</td>
//                                                     <td className='flex items-center justify-center gap-2'>
//                                                         <PiChatDotsLight />
//                                                         {item.projectId.projectInfo.ventureDescription}
//                                                     </td>
//                                                     <td className=' rounded text-blue-600'>{dateConverter(item.projectReachedOn)}</td>
//                                                     <td className='bg-red-200 rounded text-red-600'>{item.projectId.projectInfo.estimatedDeliveryDate}</td>
//                                                     <td>{item.status}</td>
//                                                     {/* <td>{item.projectId.projectInfo.status}</td> */}
//                                                     {
//                                                         position == "Completed" && <td className='font-bold text-green-700'>{dateConverter(item.leadTaskCompletedDate)}</td>
//                                                     }
//                                                     <td>
//                                                         {
//                                                             position !== "Completed" ?
//                                                                 item.payment === "Payment is Done" ?
//                                                                     <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={() => handleAssign({ projectId: item.projectId._id, itemId: item._id })} >Assign Task to</button>
//                                                                     :
//                                                                     item.status === "Assigned" ?
//                                                                         <>
//                                                                             <button className='px-3 bg-blue-600 text-white rounded'>E</button>
//                                                                             <button className='px-3 ml-2 bg-red-600 text-white rounded'>D</button>
//                                                                         </>
//                                                                         :
//                                                                         item.status === "Completed" ?
//                                                                             <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={() => handleUpdate(item.projectId._id)} >Update</button>
//                                                                             : <p className='text-red-600'>
//                                                                                 Not Payed
//                                                                             </p>
//                                                                 : ''
//                                                         }
//                                                     </td>
//                                                 </tr>
//                                             )
//                                         })}
//                             </tbody>
//                         </table>
//                     </div>
//                     {modal ? <TaskAssignModal projectId={projectId} setModal={setModal} item={item} /> : ''}
//                 </div>
//             )}
//         </>
//     );
// };

// export default Projects;
