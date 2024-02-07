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
import { BeatLoader } from 'react-spinners';

const Projects = ({ loading, setLoading }) => {
    const dispatch = useDispatch()
    const [projectsPerPage] = useState(12); // Adjust the number of projects per page
    const [currentPage, setCurrentPage] = useState(1);
    const pmNewPro = useSelector((state) => state.pmProjects.pmNewProjects)
    const pmOnGoPro = useSelector((state) => state.pmProjects.pmOngoingProjects)
    const pmComPro = useSelector((state) => state.pmProjects.pmCompletedProjects)
    console.log(pmNewPro.length, '---------------new-----------pmNewPro')
    console.log(pmOnGoPro, '--------------ON------------pmOnGoPro')
    console.log(pmComPro.length, '----------------comp----------pmComPro')

    const [projectId, setProjectId] = useState()
    const [modal, setModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [position, setPosition] = useState("New")
    const [item, setItem] = useState()
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const getAllPmProjects = async () => {
        setLoading(true);
        try {
            const { data } = await pmAllProjects()
            dispatch(pmNewProjects(data.PmProjects.newProjects))
            dispatch(pmOngoingProjects(data.PmProjects.onGoingProjects))
            dispatch(pmCompletedProjects(data.PmProjects.completedProjects))
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
            setLoading(false);
        }
    }
    const settingAllPmProjects = (position) => {
        if (position === "New") {
            console.log(position, '----', pmNewPro.length, '................pmNewPro')
            setProjects(pmNewPro)
        } else if (position === "OnGoing") {
            console.log(position, '----', pmOnGoPro, '................pmOnGoPro')
            setProjects(pmOnGoPro)
        } else if (position === "Completed") {
            console.log(position, '----', pmComPro.length, '................pmComPro')
            setProjects(pmComPro)
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
    }, [pmNewPro, pmOnGoPro, pmComPro]);

    const moveONgoing = () => {
        setPosition('OnGoing')
        console.log(pmOnGoPro, '---------------------------pmOnGoPro')
    }
    const handleUpdate = async ({ projectId, itemId, index }) => {
        try {
            console.log(itemId, '-----------item id')
            setSelectedItemIndex(index);
            const { data } = await projectCompleted(projectId)
            console.log(data.allComProject, '------------------------data.allComProject')
            dispatch(completePmProject(itemId));
            dispatch(pmCompletedProjects(data.allComProject))
            toast.success(data.message)
            setSelectedItemIndex(null);
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.error);
            setSelectedItemIndex(null);
        }
    }
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            {loading ? (
                <div className='flex items-center justify-center h-full'>
                    <div>
                        <InfinitySpin width='200' color='black' />
                    </div>
                </div>
            ) : (
                <div className='w-full h-full p-2 overflow-hidden overflow-x-hidden overflow-y-scroll'>
                    <h1 className='p-2 text-2xl font-bold'>PROJECTS</h1>
                    <div className='flex items-center justify-between '>
                        <div className=''>
                            <div className='flex gap-4 ml-2'>
                                <div onClick={() => setPosition("New")} className={`py-2 px-8  ${position === "New" && "bg-indigo-200"}  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl cursor-pointer`}>
                                    <p>New</p>
                                </div>
                                <div onClick={() => setPosition("OnGoing")} className={`py-2 px-8  ${position === "OnGoing" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl cursor-pointer`}>
                                    <p>OnGoing</p>
                                </div>
                                <div onClick={() => setPosition("Completed")} className={`py-2 px-8  ${position === "Completed" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl cursor-pointer`}>
                                    <p>Completed</p>
                                </div>
                                {/* <div className='px-8 py-2 text-indigo-700 rounded-full shadow-xl hover:bg-indigo-100' onClick={() => handleProject("Pending")}>
                                <p>Pending</p>
                            </div> */}
                            </div>
                        </div>
                        <div className="">
                            {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }).map((_, index) => (
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
                    <div className='mt-4 border shadow'>
                        <table className='w-full p-3 shadow whitespace-nowrap '>
                            <tbody>
                                <tr className='sticky top-0 h-16 text-lg font-bold text-white border rounded shadow-xl border-gray-950 bg-slate-600'>
                                    <th>No</th>
                                    {/* <th>Select</th> */}
                                    <th>Organization</th>
                                    <th>Project Name</th>
                                    <th>Venture Type</th>
                                    <th>Description</th>
                                    <th>ReachedOn</th>
                                    <th>Deadline</th>
                                    {
                                        position != "New" && <th>Assigned Lead</th>
                                    }
                                    <th>Status</th>
                                    {
                                        position == "Completed" && <th>Completed On</th>
                                    }
                                    {
                                        position !== "Completed" && <th>Options</th>
                                    }
                                </tr>
                                {/* <tr className='h-5'></tr> */}
                                {
                                    projects.length === 0 ? (
                                        <tr className="mt-10 text-center border shadow-xl">
                                            <td colSpan="10" className='text-2xl text-blue-600'>No Projects</td>
                                        </tr>
                                    ) :
                                        currentProjects.map((item, i) => {
                                            return (
                                                <tr key={i} className='h-10 mt-10 text-center border shadow-xl hover:cursor-pointer hover:bg-slate-500 hover:text-white'>
                                                    <td className='sticky'>{i + 1}</td>
                                                    {/* <td className=''>
                                                        <div>
                                                            <input type='checkbox' className='scale-150 accent-black' />
                                                        </div>
                                                    </td> */}
                                                    {/* <td className='flex items-center justify-center h-10 text-center '>
                                                        <div className='relative flex items-center justify-center flex-shrink-0 w-5 h-5 bg-gray-200 rounded-sm'>
                                                            <input
                                                                placeholder='checkbox'
                                                                type='checkbox'
                                                                className='absolute w-full h-full opacity-0 cursor-pointer focus:opacity-100 checkbox '
                                                            />
                                                        </div>
                                                    </td> */}
                                                    <td className=''>
                                                        <div className='flex items-center gap-2 ml-5' >
                                                            <p>{item.userId?.organization}</p>
                                                        </div>
                                                    </td>
                                                    <td className=''>
                                                        {/* <p>{item.projectId._id.slice(5, 25)}</p> */}
                                                        <p>{item.projectId.projectInfo.ventureName}</p>
                                                    </td>
                                                    <td className='text-center'>{item.projectId.projectInfo.ventureType}</td>
                                                    <td className=''>
                                                        <span className='flex items-center gap-2'><PiChatDotsLight /> {item.projectId.projectInfo.ventureDescription}</span>
                                                    </td>
                                                    <td className='font-extrabold bg-blue-00'>{dateConverter(item.projectReachedOn)}</td>
                                                    <td className='font-extrabold bg-red-600 '>{item.projectId.projectInfo.estimatedDeliveryDate}</td>
                                                    {
                                                        position != "New" && <td>{item.assignedLeadId?.firstName} - <span className='font-extrabold '>{item.assignedLeadId?.designation}</span> </td>
                                                    }
                                                    <td>{item.status}</td>

                                                    {/* <td>{item.projectId.projectInfo.status}</td> */}
                                                    {
                                                        position == "Completed" && <td className='font-bold bg-green-700'>{dateConverter(item.leadTaskCompletedDate)}</td>
                                                    }
                                                    <td>
                                                        {
                                                            position !== "Completed" ?
                                                                item.payment === "Payment is Done" ?
                                                                    <button className='px-3 py-1 text-white bg-blue-600 rounded' onClick={() => handleAssign({ projectId: item.projectId._id, itemId: item._id })} >Assign Task to</button>
                                                                    :
                                                                    item.status === "Assigned" ?
                                                                        <>
                                                                            <button className='px-3 text-white bg-blue-600 rounded'>E</button>
                                                                            <button className='px-3 ml-2 text-white bg-red-600 rounded'>D</button>
                                                                        </>
                                                                        :
                                                                        item.status === "Completed" ?
                                                                            <button className='px-3 py-1 text-white bg-blue-600 rounded' onClick={() => handleUpdate({ projectId: item.projectId._id, itemId: item._id, index: i })} >{selectedItemIndex === i ? <BeatLoader color='white' /> : 'Update'}</button>

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