import React, { useState, useEffect, useRef } from 'react';

import TaskAssignModal from './TaskAssignModal';
import { InfinitySpin } from 'react-loader-spinner';
import { dateConverter } from '@/app/api/helpers/dateConverter';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { pmAllProjects, projectCompleted } from '../pmAPIs/projectApis';
import { completePmProject, pmCompletedProjects, pmNewProjects, pmOngoingProjects } from '@/app/redux/projectManager/pmProSlice';
import ConfirmModal from './ConfirmModal';
import ViewFilesModal from '@/app/components/common/ViewFilesModal';
import { VscFiles } from "react-icons/vsc";

const Projects = () => {
    const dispatch = useDispatch()
    const [projectsPerPage] = useState(8); 
    const [currentPage, setCurrentPage] = useState(1);
    const pmNewPro = useSelector((state) => state.pmProjects.pmNewProjects)
    const pmOnGoPro = useSelector((state) => state.pmProjects.pmOngoingProjects)
    const pmComPro = useSelector((state) => state.pmProjects.pmCompletedProjects)

    const [loading, setLoading] = useState(false)
    const [verify, setVerify] = useState(false)
    const [nextTask, setNextTask] = useState(false)
    const [projectId, setProjectId] = useState()
    const [modal, setModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [position, setPosition] = useState("New")
    const [item, setItem] = useState()
    // const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const [viewFiles, setViewFiles] = useState(false);
    const getAllPmProjects = async () => {
        setLoading(true);
        try {
            const { data } = await pmAllProjects()
            dispatch(pmNewProjects(data.PmProjects.newProjects.reverse()))
            console.log(data.PmProjects.newProjects, '-------------------newProjects')
            console.log(data.PmProjects.onGoingProjects, '--------------------data.----------onGoingProjects')
            dispatch(pmOngoingProjects(data.PmProjects.onGoingProjects.reverse()))
            dispatch(pmCompletedProjects(data.PmProjects.completedProjects.reverse()))
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
            setLoading(false);
        }
    }
    const viewFilesData = (id) => {
        setProjectId(id)
        setViewFiles(true);
    }

    const settingAllPmProjects = (position) => {
        if (position === "New") {
            setCurrentPage(1)
            setProjects(pmNewPro)
        } else if (position === "OnGoing") {
            setCurrentPage(1)
            setProjects(pmOnGoPro)
        } else if (position === "Completed") {
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

    useEffect(() => {
        settingAllPmProjects(position)
    }, [pmNewPro, pmOnGoPro, pmComPro]);

    const handleAssign = ({ projectId, itemId }) => {
        setModal(true);
        setProjectId(projectId)
        setItem(itemId)
    };

    const moveONgoing = () => {
        setPosition('OnGoing')
    }

    const handleUpdate = async ({ projectId, itemId, index }) => {
        try {
            setVerify(true)
            setProjectId(projectId)
            setItem(itemId)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.error);
            // setSelectedItemIndex(null);
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
                <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white sm:px-7.5 xl:pb-1">
                    <div className='md:flex items-center justify-between '>
                        <div className=''>
                            <div className='flex gap-4 ml-2'>
                                <div onClick={() => setPosition("New")} className={`p-2 md:py-2 md:px-8  ${position === "New" && "bg-indigo-200"}  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl cursor-pointer`}>
                                    <p>New</p>
                                </div>
                                <div onClick={() => setPosition("OnGoing")} className={`p-2 md:py-2 md:px-8  ${position === "OnGoing" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl cursor-pointer`}>
                                    <p>OnGoing</p>
                                </div>
                                <div onClick={() => setPosition("Completed")} className={`p-2 md:py-2 md:px-8  ${position === "Completed" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl cursor-pointer`}>
                                    <p>Completed</p>
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-end">
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
                    <div className="relative overflow-auto shadow-md sm:rounded-lg mt-5 border">
                        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                        Organization
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Project Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Project Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Venture
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Files View
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Reached On
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Options
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length === 0 ? (
                                    <tr className="mt-10 text-center border shadow-xl">
                                        <td colSpan="7" className='text-2xl text-blue-600'>No Projects</td>
                                    </tr>
                                ) : (
                                    currentProjects.map((item, i) => (
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
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.userId?.organization}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.projectId.projectInfo.projectDetails.projectName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.projectId.ProjectUniqId}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.projectId.projectInfo.projectDetails.projectType}
                                            </td>
                                            <td className="px-6 py-4 text-center cursor-pointer">
                                                <span className='flex items-center gap-3' onClick={() => viewFilesData(item.projectId._id)}><VscFiles />view</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {dateConverter(item.projectReachedOn)}
                                            </td>
                                            <td>{item.status}</td>
                                            {
                                                position == "Completed" && <td className='font-bold bg-green-700'>{dateConverter(item.leadTaskCompletedDate)}</td>
                                            }
                                            {item.projectVerified ?
                                                <td className=' text-center'>
                                                    {
                                                        position !== "Completed" ?
                                                            item.payment === "Payment is Done" && position !== "OnGoing" ?
                                                                <button className='px-3 py-1 text-white bg-blue-600 rounded' onClick={() => handleAssign({ projectId: item.projectId._id, itemId: item._id })} >Assign Task to</button>
                                                                :
                                                                item.status === "Assigned" ?
                                                                    <>
                                                                        <button className='px-3 text-white bg-blue-600 rounded'>E</button>
                                                                        <button className='px-3 ml-2 text-white bg-red-600 rounded'>D</button>
                                                                    </>
                                                                    :
                                                                    item.status === "Completed" ? <button className='px-3 py-1 text-white bg-blue-600 rounded' onClick={() => handleUpdate({ projectId: item.projectId._id, itemId: item._id, index: i })} >Update</button>

                                                                        : <p className='text-red-600'>
                                                                            Not Payed
                                                                        </p>
                                                            : ''
                                                    }
                                                </td> : <td className='text-red-500 font-bold'>"Not verified"</td>
                                            }
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {modal ? <TaskAssignModal projectId={projectId} setModal={setModal} itemId={item} moveONgoing={moveONgoing} /> : ''}
                    {verify ? <ConfirmModal projectId={projectId} setfixedVerify={setVerify} itemId={item} setNextTask={setNextTask} /> : ''}
                    {nextTask ? <TaskAssignModal projectId={projectId} setModal={setModal} itemId={item} moveONgoing={moveONgoing} setNextTask={setNextTask} /> : ''}
                    {viewFiles ? <ViewFilesModal projectId={projectId} setViewFiles={setViewFiles} /> : ''}
                </div>
            )}
        </>
    );
};

export default Projects;
