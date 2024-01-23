import React, { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { PiChatDotsLight } from 'react-icons/pi';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import Badge from './Badge';
import { userProjects } from '../userAPIs/projectApis';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdCut } from "react-icons/io";
import { IoTrashBinOutline } from "react-icons/io5";
import { userCompletedProjects, userNewProjects, userOngoingProjects } from '@/app/redux/users/userProSlice';
function ClientInformation() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState("New")
    const [projects, setProjects] = useState([]);
    const userNewPro = useSelector((state) => state.userProjects.userNewProjects)
    console.log(userNewPro, '------------------userNewPro')
    const userOnGoPro = useSelector((state) => state.userProjects.userOngoingProjects)
    const userCompPro = useSelector((state) => state.userProjects.userCompletedProjects)
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const { data } = await userProjects()
            console.log(data, '---------------------data')
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
                        <h1 className='text-xl p-2 flex justify-center items-center shadow-lg bg-gray-200'>Your Projects Details</h1>
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
                    </div>
                    <div className='border shadow mt-4'>
                        <table className='w-full whitespace-nowrap shadow p-3 '>
                            <tbody>
                                <tr className='h-16 border border-gray-950 text-white font-bold text-xl rounded shadow-xl  bg-gray-500'>
                                    <th>No</th>
                                    <th>Venture Name</th>
                                    <th>Project No</th>
                                    <th>Venture Type</th>
                                    <th>Description</th>
                                    <th>Deadline</th>
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
                                        projects.map((item, i) => {
                                            return (
                                                <tr key={i} className='text-center mt-10 shadow-xl border'>
                                                    <td>{i + 1}</td>
                                                    <td className=''>
                                                        <div className='flex items-center gap-2 ml-5' >
                                                            {item.isNew && <Badge label='New' color='bg-green-500 text-white' />}
                                                            <FaLink color='blue' />
                                                            <p>{item.ProjectId.projectInfo.ventureName}</p>
                                                        </div>
                                                    </td>
                                                    <td className=''>{item.ProjectId.userId.slice(0, 8)}</td>
                                                    <td className='text-center'>{item.ProjectId.projectInfo.ventureType}</td>
                                                    <td className='flex items-center justify-center gap-2'>
                                                        <PiChatDotsLight />
                                                        {item.ProjectId.projectInfo.ventureDescription}
                                                    </td>
                                                    <td className='bg-red-200 rounded text-red-600'>{item.ProjectId.projectInfo.estimatedDeliveryDate}</td>
                                                    {
                                                        position !== "Completed" &&
                                                        <td className='flex items-center justify-around'>
                                                            <button className=' text-blue-900 p-2 text-lg'><IoMdCut /></button>
                                                            <button className=' text-red-900 p-2 text-lg'><IoTrashBinOutline /></button>
                                                        </td>
                                                    }

                                                </tr>
                                            );
                                        })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}
export default ClientInformation