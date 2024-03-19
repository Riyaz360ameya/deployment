"use client"
import React, { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { PiChatDotsLight } from 'react-icons/pi';
import { InfinitySpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdCut } from "react-icons/io";
import { userCompletedProjects, userNewProjects, userOngoingProjects } from '@/app/redux/users/userProSlice';
import DataView from '../../components/DataView';
import { userProjects } from '../../userAPIs/projectApis';

function Projects() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState("New");
    const [projects, setProjects] = useState([]);
    const [allData, setAllData] = useState();
    const [view, setView] = useState(false);

    const [projectsPerPage] = useState(12); // Adjust the number of projects per page
    const [currentPage, setCurrentPage] = useState(1);

    const userNewPro = useSelector((state) => state.userProjects.userNewProjects);
    const userOnGoPro = useSelector((state) => state.userProjects.userOngoingProjects);
    const userCompPro = useSelector((state) => state.userProjects.userCompletedProjects);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const { data } = await userProjects();
            console.log(data,'-----------user project------------')
            const NewProjects = data.projectsInformation.NewProjects;
            dispatch(userNewProjects(NewProjects));
            const onGoingProjects = data.projectsInformation.onGoingProjects;
            dispatch(userOngoingProjects(onGoingProjects));
            const completedProjects = data.projectsInformation.completedProjects;
            dispatch(userCompletedProjects(completedProjects));
            handleData("New");
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        handleData("New");
    }, [userNewPro, userOnGoPro, userCompPro]);

    const handleData = (name) => {
        setPosition(name);
        name === "New" ? setProjects(userNewPro)
            : name === "OnGoing" ? setProjects(userOnGoPro)
                : name === "Completed" ? setProjects(userCompPro)
                    : "";
    };

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleShowData = (data) => {
        setView(true);
        setAllData(data);
    };

    return (
        <>
            {loading ? (
                <div className='h-full flex items-center justify-center'>
                    <div>
                        <InfinitySpin width='200' color='black' />
                    </div>
                </div>
            ) : (
                <>
                    <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden'>
                        <div>
                            <h1 className='text-xl p-2 flex justify-center items-center shadow-lg bg-gray-200'>Your Projects Details</h1>
                            <div className='flex items-center justify-between'>
                                {/* Pagination */}
                            </div>
                        </div>
                        <div className='border shadow mt-4'>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                      
                                        <th scope="col" className="px-6 py-3">
                                            Project Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Project Id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Project Type
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Project Usp
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Reached On
                                        </th>
                                        {/* <th scope="col" className="px-6 py-3">
                                            Status
                                        </th> */}

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
                                                <td className="w-4 p-4">
                                                    <div className="flex items-center">
                                                        <input id={`checkbox-table-search-${i}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor={`checkbox-table-search-${i}`} className="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                               
                                                <td className="px-6 py-4">
                                                    {item.ProjectId.projectInfo.projectDetails.projectName}
                                                </td>
                                                <td className="px-6 py-4">
                                                {item.ProjectId.ProjectUniqId}
                                                </td>
                                                <td className="px-6 py-4">
                                                {item.ProjectId.projectInfo.projectDetails.projectType}
                                                </td>
                                               
                                                <td className="px-6 py-4">
                                                    {item.ProjectId.projectInfo.projectDetails.projectDes}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.ProjectId.projectInfo.projectDetails.projectUSP}
                                                </td>
                                                
                                                
                                                <td>{item.ProjectId.createdAt

}</td>

                                                {/* {
                                                    position == "Completed" && <td className='font-bold bg-green-700'>{dateConverter(item.leadTaskCompletedDate)}</td>
                                                }
                                                {item.projectVerified ?
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
                                                                        item.status === "Completed" ? <button className='px-3 py-1 text-white bg-blue-600 rounded' onClick={() => handleUpdate({ projectId: item.projectId._id, itemId: item._id, index: i })} >Update</button>

                                                                            : <p className='text-red-600'>
                                                                                Not Payed
                                                                            </p>
                                                                : ''
                                                        }
                                                    </td> : <td className='text-red-500 font-bold'>"Not verified"</td>
                                                } */}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {
                        view ? <DataView setView={setView} allData={allData} /> : ''
                    }
                </>
            )}
        </>
    )
}

export default Projects;

// import React, { useState, useEffect } from 'react';
// import { FaLink } from 'react-icons/fa6';
// import { PiChatDotsLight } from 'react-icons/pi';
// import axios from 'axios';
// import { InfinitySpin } from 'react-loader-spinner';
// import { useDispatch, useSelector } from 'react-redux';
// import { IoMdCut } from "react-icons/io";
// import { IoTrashBinOutline } from "react-icons/io5";
// import { userCompletedProjects, userNewProjects, userOngoingProjects } from '@/app/redux/users/userProSlice';
// import DataView from '../../components/DataView';
// import { userProjects } from '../../userAPIs/projectApis';
// function Projects() {
//     const dispatch = useDispatch()
//     const [loading, setLoading] = useState(false);
//     const [position, setPosition] = useState("New")
//     const [projects, setProjects] = useState([]);
//     const [allData, setAllData] = useState()
//     const [view, setView] = useState(false)

//     const [projectsPerPage] = useState(12); // Adjust the number of projects per page
//     const [currentPage, setCurrentPage] = useState(1);

//     const userNewPro = useSelector((state) => state.userProjects.userNewProjects)
//     console.log(userNewPro, '------------------userNewPro')
//     const userOnGoPro = useSelector((state) => state.userProjects.userOngoingProjects)
//     const userCompPro = useSelector((state) => state.userProjects.userCompletedProjects)
//     const fetchTasks = async () => {
//         setLoading(true);
//         try {
//             const { data } = await userProjects()
//             console.log(data.projectsInformation, '---------------------data')
//             const NewProjects = data.projectsInformation.NewProjects;
//             dispatch(userNewProjects(NewProjects))
//             const onGoingProjects = data.projectsInformation.onGoingProjects;
//             dispatch(userOngoingProjects(onGoingProjects))
//             const completedProjects = data.projectsInformation.completedProjects;
//             dispatch(userCompletedProjects(completedProjects))
//             // setProjects(NewProjects)
//             handleData("New")
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching tasks:', error.message);
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         fetchTasks();
//     }, [])
//     useEffect(() => {
//         handleData("New")
//     }, [userNewPro, userOnGoPro, userCompPro]);
//     const handleData = (name) => {
//         setPosition(name)
//         name === "New" ? setProjects(userNewPro)
//             : name === "OnGoing" ? setProjects(userOnGoPro)
//                 : name === "Completed" ? setProjects(userCompPro)
//                     : "";
//     };

//     const indexOfLastProject = currentPage * projectsPerPage;
//     const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//     const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
//     const paginate = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };
//     const handleShowData = (data) => {
//         setView(true)
//         setAllData(data)
//         console.log('....................................its showing')
//         console.log(data, '....................................its showing')
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

//                 <>
//                     <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden'>
//                         <div>
//                             <h1 className='text-xl p-2 flex justify-center items-center shadow-lg bg-gray-200'>Your Projects Details</h1>
//                             <div className='flex items-center justify-between'>
//                                 <div className='flex gap-4 ml-2 py-4 sticky top-0'>
//                                     <div onClick={() => handleData("New")} className={`py-2 px-8  ${position === "New" && "bg-indigo-200"}  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl shadow-cyan-500/50 cursor-pointer`}>
//                                         <p className='font-bold '>New</p>
//                                     </div>
//                                     <div onClick={() => handleData("OnGoing")} className={`py-2 px-8  ${position === "OnGoing" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl shadow-cyan-500/50 cursor-pointer`}>
//                                         <p className='font-bold shadow'>OnGoing</p>
//                                     </div>
//                                     <div onClick={() => handleData("Completed")} className={`py-2 px-8  ${position === "Completed" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl shadow-cyan-500/50 cursor-pointer`}>
//                                         <p className='font-bold shadow'>Completed</p>
//                                     </div>
//                                 </div>
//                                 <div className="">
//                                     {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }).map((_, index) => (
//                                         <button
//                                             key={index}
//                                             onClick={() => paginate(index + 1)}
//                                             className={`px-4 py-2 mx-1 font-extrabold shadow-xl ${currentPage === index + 1 ? 'bg-slate-600 text-white' : 'bg-white text-blue-500'
//                                                 } border border-blue-500 rounded-md hover:bg-slate-600 hover:text-white`}
//                                         >
//                                             {index + 1}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='border shadow mt-4'>
//                             <table className='w-full whitespace-nowrap shadow p-3 '>
//                                 <tbody>
//                                     <tr className='h-16 border border-gray-950 text-white font-bold text-xl rounded shadow-xl  bg-gray-500'>
//                                         <th>No</th>
//                                         <th>ProjectUniqId</th>
//                                         <th>Project Name</th>
//                                         <th>Project Type</th>
//                                         <th>Description</th>
//                                         <th>Project USP</th>
//                                         <th>Project Highlights</th>
//                                         <th>Specifications</th>
//                                         {
//                                             position !== "Completed" &&
//                                             <th>Options</th>
//                                         }
//                                     </tr>
//                                     {/* <tr className='h-5'></tr> */}
//                                     {
//                                         projects.length === 0 ? (
//                                             <tr className="text-center mt-10 shadow-xl border">
//                                                 <td colSpan="10" className='text-2xl text-blue-600'>No Projects</td>
//                                             </tr>
//                                         ) :
//                                             currentProjects.map((item, i) => {
//                                                 return (
//                                                     <tr key={i} className='text-center mt-10 shadow-xl border'>
//                                                         <td>{i + 1}</td>
//                                                         <td className=''>
//                                                             <div className='flex items-center gap-2 ml-5 cursor-pointer' >
//                                                                 <FaLink color='blue' onClick={() => handleShowData(item)} />
//                                                                 <td className=''>{item.ProjectId.ProjectUniqId}</td>                                                          <p>{item.ProjectId.projectInfo.ventureName}</p>
//                                                             </div>
//                                                         </td>
//                                                         <td className='text-center'>{item.ProjectId.projectInfo.projectDetails.projectName}</td>
//                                                         <td className='text-center'>
//                                                             {item.ProjectId.projectInfo.projectDetails.projectType}
//                                                         </td>
//                                                         <td className='text-center'>{item.ProjectId.projectInfo.projectDetails.projectDes}</td>
//                                                         <td className='text-center'>{item.ProjectId.projectInfo.projectDetails.projectUSP}</td>
//                                                         <td className='flex items-center justify-center gap-2'>
//                                                             <PiChatDotsLight />
//                                                             {item.ProjectId.projectInfo.projectDetails.projectHighlights}
//                                                         </td>
//                                                         <td className='text-center'>{item.ProjectId.projectInfo.projectDetails.specification}</td>
//                                                         {
//                                                             position !== "Completed" &&
//                                                             <td className='flex items-center justify-around'>
//                                                                 <button className=' text-blue-900 p-2 text-lg'><IoMdCut /></button>
//                                                                 {/* <button className=' text-red-900 p-2 text-lg'><IoTrashBinOutline /></button> */}
//                                                             </td>
//                                                         }
//                                                     </tr>
//                                                 );
//                                             })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                     {
//                         view ? <DataView setView={setView} allData={allData} /> : ''
//                     }
//                 </>
//             )}
//         </>
//     )
// }
// export default Projects