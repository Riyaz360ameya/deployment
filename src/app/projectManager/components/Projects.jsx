import React, { useState, useEffect, Fragment, useRef } from 'react';
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
import { Dialog, Transition } from '@headlessui/react';
import ConfirmModal from './ConfirmModal';
import axios from 'axios';
import ViewFileModal from './ViewFileModal';
const Projects = ({ loading, setLoading }) => {
    const dispatch = useDispatch()
    const [projectsPerPage] = useState(12); // Adjust the number of projects per page
    const [currentPage, setCurrentPage] = useState(1);
    const cancelButtonRef = useRef(null);
    const pmNewPro = useSelector((state) => state.pmProjects.pmNewProjects)
    const pmOnGoPro = useSelector((state) => state.pmProjects.pmOngoingProjects)
    const pmComPro = useSelector((state) => state.pmProjects.pmCompletedProjects)
    // console.log(pmNewPro, '---------------new-----------pmNewPro')
    // console.log(pmOnGoPro, '--------------ON------------pmOnGoPro')
    // console.log(pmComPro.length, '----------------comp----------pmComPro')

    const [verify, setVerify] = useState(false)
    const [nextTask, setNextTask] = useState(false)
    const [projectId, setProjectId] = useState()
    const [modal, setModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [position, setPosition] = useState("New")
    const [item, setItem] = useState()
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const [filesData, setFilesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // files view states
    const [viewFiles, setviewFiles] = useState(false);
    const [uniqueId, setUniqueId] = useState('')
    const [userDetails, setUserDetails] = useState()
    const [details, setDetails] = useState({})

    const getAllPmProjects = async () => {
        setLoading(true);
        try {
            const { data } = await pmAllProjects()
            console.log(data, "-----------------new")
            dispatch(pmNewProjects(data.PmProjects.newProjects))
            dispatch(pmOngoingProjects(data.PmProjects.onGoingProjects))
            dispatch(pmCompletedProjects(data.PmProjects.completedProjects))
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
            setLoading(false);
        }
    }
    const viewFilesData = ({ uniqueId, userDetails, fileDetails }) => {
        setviewFiles(true);
        setUniqueId(uniqueId)
        setUserDetails(userDetails)
        setDetails(fileDetails)
    }
    const settingAllPmProjects = (position) => {
        if (position === "New") {
            // console.log(position, '----', pmNewPro.length, '................pmNewPro')
            setCurrentPage(1)
            setProjects(pmNewPro)
        } else if (position === "OnGoing") {
            // console.log(position, '----', pmOnGoPro, '................pmOnGoPro')
            setCurrentPage(1)
            setProjects(pmOnGoPro)
        } else if (position === "Completed") {
            // console.log(position, '----', pmComPro.length, '................pmComPro')
            setCurrentPage(1)
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
        // console.log(pmOnGoPro, '---------------------------pmOnGoPro')
    }
    const handleUpdate = async ({ projectId, itemId, index }) => {
        try {

            setVerify(true)
            setProjectId(projectId)
            setItem(itemId)

            // console.log(itemId, '-----------item id')
            // setSelectedItemIndex(index);
            // const { data } = await projectCompleted(projectId)
            // console.log(data.allComProject, '------------------------data.allComProject')
            // dispatch(completePmProject(itemId));
            // dispatch(pmCompletedProjects(data.allComProject))
            // toast.success(data.message)
            // setSelectedItemIndex(null);
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


    // const ViewModal = () => (
    //     <Dialog.Panel
    //         className="relative  transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
    //         ref={cancelButtonRef}
    //     >
    //         <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    //             <div className="sm:flex sm:items-start">
    //                 <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
    //                     <PiChatDotsLight className="h-6 w-6 text-red-600" aria-hidden="true" />
    //                 </div>
    //                 <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
    //                     <h3 as="h3" className="text-base font-semibold leading-6 text-gray-900">
    //                         View Project Details
    //                     </h3>
    //                     <div className="mt-2">
    //                         <p className="text-sm text-gray-500">
    //                             Project details go here...
    //                         </p>
    //                         <ul>
    //                             {
    //                                 filesData.map((files, index) => (
    //                                     <>
    //                                         <div className='flex justify-around'>
    //                                             <li key={index}>{files.fileName}</li>
    //                                             <a
    //                                                 href={`data:application/octet-stream;base64,${files.content}`}
    //                                                 download={files.fileName}
    //                                             >
    //                                                 Download File
    //                                             </a>
    //                                         </div>
    //                                     </>
    //                                 ))
    //                             }
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
    //             <button
    //                 type="button"
    //                 className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
    //                 onClick={() => setviewFiles(false)}
    //             >
    //                 Close
    //             </button>
    //         </div>
    //     </Dialog.Panel>
    // );

    return (
        <>
            {/* <Transition.Root show={viewFiles} as={Fragment} >
                <Dialog as="div" className="flex items-center justify-center fixed inset-0 z-10" onClose={() => setviewFiles(false)}>
                    <ViewModal />
                </Dialog>
            </Transition.Root> */}
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
                                    <th>Organization</th>
                                    <th> Project Name</th>
                                    <th> Project UniqueId</th>
                                    <th>Venture Type</th>
                                    <th>Views/Files</th>
                                    <th>ReachedOn</th>
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

                                                    <td className=''>
                                                        <div className='flex items-center gap-2 ml-5' >
                                                            <p>{item.userId?.organization}</p>
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>
                                                        <p>{item.projectId.projectInfo.projectDetails.projectName}</p>
                                                    </td>
                                                    <td className='text-center'>
                                                        <p>{item.projectId.ProjectUniqId}</p>
                                                    </td>
                                                    <td className='text-center'>{item.projectId.projectInfo.projectDetails.projectType}</td>
                                                    <td className=''>
                                                        <span className='flex items-center gap-2' onClick={() => viewFilesData({ uniqueId: item.projectId.ProjectUniqId, userDetails: item.userId, fileDetails: item })}><PiChatDotsLight /> <button>  views </button></span>
                                                    </td>
                                                    <td className='font-extrabold bg-blue-00'>{dateConverter(item.projectReachedOn)}</td>
                                                    {
                                                        position != "New" && <td>{item.assignedLeadId?.firstName} - <span className='font-extrabold '>{item.assignedLeadId?.designation}</span> </td>
                                                    }
                                                    <td>{item.status}</td>

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
                                                                            <button className='px-3 py-1 text-white bg-blue-600 rounded' onClick={() => handleUpdate({ projectId: item.projectId._id, itemId: item._id, index: i })} >Update</button>

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
                    {verify ? <ConfirmModal projectId={projectId} setfixedVerify={setVerify} itemId={item} setNextTask={setNextTask} /> : ''}
                    {nextTask ? <TaskAssignModal projectId={projectId} setModal={setModal} itemId={item} moveONgoing={moveONgoing} setNextTask={setNextTask} /> : ''}
                    {viewFiles ? <ViewFileModal userDetails={userDetails} uniqueId={uniqueId} setviewFiles={setviewFiles} details={details} /> : ''}
                </div>
            )}
        </>
    );
};
export default Projects;

