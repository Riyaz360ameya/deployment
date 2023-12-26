import axios from 'axios';
import React from 'react'
import { GiCycle } from "react-icons/gi";
import { IoPlayForwardSharp } from "react-icons/io5";
import { toast } from 'sonner';


const ConfirmModal = ({ Lead, projectId, setCModal }) => {
    const onClose = () => {
        setCModal(false)
    }
    const handleClose = (e) => {
        if (e.target.id === "container") {
            onClose()
        }
    }
    const handleAssign = async (projectId) => {
        console.log('Reassign-------iid')
        const { data } = await axios.post('/api/teamLead/reAssign', { Lead, projectId })
        onClose()
        toast.success(data.message)
    }
    const handleForward = async (projectId) => {
        console.log(projectId, '-------id')
        const { data } = await axios.post('/api/teamLead/forward', { Lead, projectId })
        toast.success(data.message)
        onClose()
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
                <div className='flex justify-around mt-5'>
                    <button className='bg-red-600 rounded-md px-3 py-2 text-white flex flex-col items-center' onClick={() => handleAssign(projectId)}>
                        Re-Assign To Dev
                        <GiCycle className='text-2xl' />
                    </button>
                    <button className='bg-green-800 rounded-md px-3 py-2 text-white flex flex-col items-center' onClick={() => handleForward(projectId)}>
                        Move Forward
                        <IoPlayForwardSharp className='text-2xl' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal