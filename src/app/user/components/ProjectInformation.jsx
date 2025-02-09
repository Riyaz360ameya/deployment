import React, { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { PiChatDotsLight } from 'react-icons/pi';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { userProjects } from '../userAPIs/projectApis';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdCut } from "react-icons/io";
import { IoTrashBinOutline } from "react-icons/io5";
import { userCompletedProjects, userNewProjects, userOngoingProjects } from '@/app/redux/users/userProSlice';
import DataView from './DataView';
function ProjectInformation() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState("New")
    const [projects, setProjects] = useState([]);
    const [allData, setAllData] = useState()
    const [view, setView] = useState(false)

    const [projectsPerPage] = useState(12); // Adjust the number of projects per page
    const [currentPage, setCurrentPage] = useState(1);

    const userNewPro = useSelector((state) => state.userProjects.userNewProjects)
    console.log(userNewPro, '------------------userNewPro')
    const userOnGoPro = useSelector((state) => state.userProjects.userOngoingProjects)
    const userCompPro = useSelector((state) => state.userProjects.userCompletedProjects)
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const { data } = await userProjects()
            console.log(data.projectsInformation, '---------------------data')
            const NewProjects = data.projectsInformation.NewProjects;
            dispatch(userNewProjects(NewProjects))
            const onGoingProjects = data.projectsInformation.onGoingProjects;
            dispatch(userOngoingProjects(onGoingProjects))
            const completedProjects = data.projectsInformation.completedProjects;
            dispatch(userCompletedProjects(completedProjects))
            // setProjects(NewProjects)
            handleData("New")
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTasks();
    }, [])
    useEffect(() => {
        handleData("New")
    }, [userNewPro, userOnGoPro, userCompPro]);
    const handleData = (name) => {
        setPosition(name)
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
        setView(true)
        setAllData(data)
        console.log('....................................its showing')
        console.log(data, '....................................its showing')
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

                <>
                    <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden'>
                        <div>
                            <h1 className='text-xl p-2 flex justify-center items-center shadow-lg bg-gray-200'>Your Projects Details</h1>
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-4 ml-2 py-4 sticky top-0'>
                                    <div onClick={() => handleData("New")} className={`py-2 px-8  ${position === "New" && "bg-indigo-200"}  hover:bg-indigo-100 text-indigo-700 rounded-full relative shadow-xl cursor-pointer`}>
                                        <p className='font-bold shadow'>New</p>
                                    </div>
                                    <div onClick={() => handleData("OnGoing")} className={`py-2 px-8  ${position === "OnGoing" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl cursor-pointer`}>
                                        <p className='font-bold shadow'>OnGoing</p>
                                    </div>
                                    <div onClick={() => handleData("Completed")} className={`py-2 px-8  ${position === "Completed" && "bg-indigo-200"} hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl cursor-pointer`}>
                                        <p className='font-bold shadow'>Completed</p>
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
                        </div>
                        <div className='border shadow mt-4'>
                            <table className='w-full whitespace-nowrap shadow p-3 '>
                                <tbody>
                                    <tr className='h-16 border border-gray-950 text-white font-bold text-xl rounded shadow-xl  bg-gray-500'>
                                        <th>No</th>
                                        <th>ProjectUniqId</th>
                                        <th>Project Name</th>
                                        <th>Project Type</th>
                                        <th>Description</th>
                                        <th>Project USP</th>
                                        <th>Project Highlights</th>
                                        <th>Specifications</th>
                                        {
                                            position !== "Completed" &&
                                            <th>Options</th>
                                        }
                                    </tr>
                                    {/* <tr className='h-5'></tr> */}
                                    {
                                        projects.length === 0 ? (
                                            <tr className="text-center mt-10 shadow-xl border">
                                                <td colSpan="10" className='text-2xl text-blue-600'>No Projects</td>
                                            </tr>
                                        ) :
                                            currentProjects.map((item, i) => {
                                                return (
                                                    <tr key={i} className='text-center mt-10 shadow-xl border'>
                                                        <td>{i + 1}</td>
                                                        <td className=''>
                                                            <div className='flex items-center gap-2 ml-5 cursor-pointer' >
                                                                {/* <FaLink color='blue' onClick={() => handleShowData(item)} />   */}
                                                                <td className=''>{item.ProjectId.ProjectUniqId}</td>                                                          <p>{item.ProjectId.projectInfo.ventureName}</p>
                                                            </div>
                                                        </td>
                                                        <td className='text-center'>{item.ProjectId.projectInfo.projectDetails.projectName}</td>
                                                        <td className='text-center'>
                                                            {item.ProjectId.projectInfo.projectDetails.projectType}
                                                        </td>
                                                        <td className='text-center'>{item.ProjectId.projectInfo.projectDetails.projectDes}</td>
                                                        <td className='text-center'>{item.ProjectId.projectInfo.projectDetails.projectUSP}</td>
                                                        <td className='flex items-center justify-center gap-2'>
                                                            <PiChatDotsLight />
                                                            {item.ProjectId.projectInfo.projectDetails.projectHighlights}
                                                        </td>
                                                        <td className='text-center'>{item.ProjectId.projectInfo.projectDetails.specification}</td>
                                                        {
                                                            position !== "Completed" &&
                                                            <td className='flex items-center justify-around'>
                                                                <button className=' text-blue-900 p-2 text-lg'><IoMdCut /></button>
                                                                {/* <button className=' text-red-900 p-2 text-lg'><IoTrashBinOutline /></button> */}
                                                            </td>
                                                        }
                                                    </tr>
                                                );
                                            })}
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
export default ProjectInformation