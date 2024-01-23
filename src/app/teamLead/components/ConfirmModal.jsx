import React, { useState } from 'react'
import { GiCycle } from "react-icons/gi";
import { IoPlayForwardSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import { forwardTask, reAssignTask } from '../leadAPIs/taskApi';
import { useDispatch } from 'react-redux';
import { teamLeadCompletedProjectsStore, teamLeadOngoingProjectsStore } from '@/app/redux/teamLead/leadProSlice';
import { InfinitySpin } from 'react-loader-spinner';

const ConfirmModal = ({ projectId, setCModal }) => {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const onClose = () => {
        setCModal(false)
    }
    const handleClose = (e) => {
        if (e.target.id === "container") {
            onClose()
        }
    }
    const handleAssign = async (projectId) => {
        try {
            setloading(true)
            const { data } = await reAssignTask(projectId)
            dispatch(teamLeadOngoingProjectsStore(data.updatedTask.onGoingTasks))
            setloading(false)
            onClose()
            toast.success(data.message)
        } catch (error) {
            setloading(false)
            console.log(error)
            toast.error(error.response.data.error)
        }
    }
    const handleForward = async (projectId) => {
        try {
            setloading(true)
            const { data } = await forwardTask(projectId);
            // console.log(data.upDatedLead.onGoingTasks, '----------data in move forward---------');
            dispatch(teamLeadOngoingProjectsStore(data.upDatedLead.onGoingTasks));
            dispatch(teamLeadCompletedProjectsStore(data.upDatedLead.completedTasks));
            toast.success(data.message);
            onClose();
            setloading(false)
        } catch (error) {
            setloading(false)
            console.error('Error in handleForward:', error);
            toast.error(error.response.data.error)
        }
    }
    return (
        <div
            id='container'
            onClick={handleClose}
            className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
            <div className='bg-white p-8 rounded'>
                <div>
                    <h1 className='text-center text-2xl'>Do you wish to <span className='text-red-600 font-bold cursor-pointer'>Re-Assign</span> the task for developer</h1>
                    <h1 className='text-center text-2xl font-extrabold'>OR</h1>
                    <h1 className='text-center text-2xl'>  <span className='text-green-800 font-bold cursor-pointer'>Move forward</span> with This Task</h1>
                </div>
                {
                    !loading ?
                        <>
                            <div className='flex justify-around mt-5'>
                                <button className='bg-red-600 rounded-md px-3 py-2 text-white flex flex-col items-center' onClick={() => handleAssign(projectId)}>
                                    Re-Assign To Dev
                                    <GiCycle className='text-2xl' />
                                </button>
                                <button className='bg-green-800 rounded-md px-3 py-2 text-white flex flex-col items-center' onClick={() => handleForward(projectId)}>
                                    Move Forward <IoPlayForwardSharp className='text-2xl' />
                                </button>
                            </div>
                        </>
                        :
                        <div className='flex justify-center items-center'>
                            <InfinitySpin
                                width='200'
                                color="black"
                            />
                        </div>
                }
            </div>
        </div>
    )
}

export default ConfirmModal