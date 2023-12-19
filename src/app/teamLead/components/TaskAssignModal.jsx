import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { InfinitySpin } from 'react-loader-spinner'
const TaskAssignModal = ({ setModal, projectId }) => {
    const [loading, setLoading] = useState(false)
    const [developers, setDevelopers] = useState([])
    const [task, setTask] = useState({
        developer: '',
        importance: '',
        projectTitle: '',
        description: '',
        instruction: '',
        startDate: '',
        endDate: '',
        projectId: projectId
    })
    const onClose = () => {
        setModal(false)
    }
    const handleClose = (e) => {
        if (e.target.id === "container") {
            onClose()
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const LeadDetails = JSON.parse(localStorage.getItem('TeamLead'));
            task.assignedBy = LeadDetails._id
            console.log(task, '---------task assigned')
            const { data } = await axios.post("/api/teamLead/taskAssign", task)
            console.log(data, '--------------response')
            toast.success(data.message)
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
            setLoading(false);
        }
        setModal(false)
    }
    const leadData = async () => {
        const Lead = JSON.parse(localStorage.getItem("TeamLead"))
        const leadType = Lead.designation
        const { data } = await axios.post('/api/teamLead/getDev', { leadType });
        setDevelopers(data.Developers, '-------------data')
    }
    useEffect(() => {
        leadData()
    }, [])
    return (
<>
<div
                id='container'
                onClick={handleClose}
                className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
                <div className='bg-white p-8 rounded'>
                    <h1 className='text-center text-xl'>Task Assigning for developer</h1>
                    <form className='space-y-2'>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor='team'>
                                Select Developer
                            </label>
                            <select
                                name='developer'
                                value={task.developer || ""} // Set the initial value based on the first item in the array
                                id='developer'
                                className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                onChange={(e) => setTask({ ...task, developer: e.target.value })}
                                required
                            >
                                <option value="" className="uppercase" disabled defaultValue  >
                                    Choose  Developer
                                </option>
                                {developers.map((item, i) => {
                                    return (
                                        <option key={i} value={item._id} className="uppercase">
                                            {item.firstName} {item.lastName}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Importance</label>
                            <select
                                value={task.importance || ""}
                                name='importance'
                                id='importance'
                                className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                onChange={(e) => setTask({ ...task, importance: e.target.value })}
                                required
                            >
                                <option value="" className="uppercase" disabled defaultValue >
                                    Choose Type
                                </option>
                                <option value="REGULAR" className="uppercase" >
                                    REGULAR
                                </option>
                                <option value="MEDIUM" className="uppercase">
                                    MEDIUM
                                </option>
                                <option value="URGENT" className="uppercase">
                                    URGENT
                                </option>
                            </select>
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Project Title</label>
                            <input type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                id='projectTitle'
                                value={task.projectTitle}
                                onChange={(e) => setTask({ ...task, projectTitle: e.target.value })}
                                required
                            />
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Description</label>
                            <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                id='description'
                                value={task.description}
                                onChange={(e) => setTask({ ...task, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='text-left text-sm w-full '>
                                <label className='font-bold' htmlFor="">Start Date</label>
                                <input
                                    type="date"
                                    className='w-full border border-gray-400  bg-gray-200 outline-none p-2 rounded-md'
                                    id='startDate'
                                    value={task.startDate}
                                    onChange={(e) => setTask({ ...task, startDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className='text-left text-sm w-full '>
                                <label className='font-bold' htmlFor="">Estimated Due Date</label>
                                <input
                                    type="date"
                                    className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                    id='endDate'
                                    onChange={(e) => setTask({ ...task, endDate: e.target.value })}
                                    required
                                    value={task.endDate}
                                />
                            </div>
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Instruction to the Team</label>
                            <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                id='instruction'
                                value={task.instruction}
                                onChange={(e) => setTask({ ...task, instruction: e.target.value })}
                                required
                            />
                        </div>
                        <div className='text-end'>
                            <button onClick={handleSubmit} type='submit' className='bg-gray-900 text-white rounded-md p-2 px-5 mt-5 font-bold'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        {/* {
            loading ? (
                <div className='h-full flex items-center justify-center'>
                <InfinitySpin width='200' color='black' />
            </div>
            ):(
                <div
                id='container'
                onClick={handleClose}
                className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
                <div className='bg-white p-8 rounded'>
                    <h1 className='text-center text-xl'>Task Assigning for developer</h1>
                    <form className='space-y-2'>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor='team'>
                                Select Developer
                            </label>
                            <select
                                name='developer'
                                value={task.developer || ""} // Set the initial value based on the first item in the array
                                id='developer'
                                className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                onChange={(e) => setTask({ ...task, developer: e.target.value })}
                                required
                            >
                                <option value="" className="uppercase" disabled defaultValue  >
                                    Choose  Developer
                                </option>
                                {developers.map((item, i) => {
                                    return (
                                        <option key={i} value={item._id} className="uppercase">
                                            {item.firstName} {item.lastName}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Importance</label>
                            <select
                                value={task.importance || ""}
                                name='importance'
                                id='importance'
                                className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                onChange={(e) => setTask({ ...task, importance: e.target.value })}
                                required
                            >
                                <option value="" className="uppercase" disabled defaultValue >
                                    Choose Type
                                </option>
                                <option value="REGULAR" className="uppercase" >
                                    REGULAR
                                </option>
                                <option value="MEDIUM" className="uppercase">
                                    MEDIUM
                                </option>
                                <option value="URGENT" className="uppercase">
                                    URGENT
                                </option>
                            </select>
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Project Title</label>
                            <input type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                id='projectTitle'
                                value={task.projectTitle}
                                onChange={(e) => setTask({ ...task, projectTitle: e.target.value })}
                                required
                            />
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Description</label>
                            <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                id='description'
                                value={task.description}
                                onChange={(e) => setTask({ ...task, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='text-left text-sm w-full '>
                                <label className='font-bold' htmlFor="">Start Date</label>
                                <input
                                    type="date"
                                    className='w-full border border-gray-400  bg-gray-200 outline-none p-2 rounded-md'
                                    id='startDate'
                                    value={task.startDate}
                                    onChange={(e) => setTask({ ...task, startDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className='text-left text-sm w-full '>
                                <label className='font-bold' htmlFor="">Estimated Due Date</label>
                                <input
                                    type="date"
                                    className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                    id='endDate'
                                    onChange={(e) => setTask({ ...task, endDate: e.target.value })}
                                    required
                                    value={task.endDate}
                                />
                            </div>
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Instruction to the Team</label>
                            <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                id='instruction'
                                value={task.instruction}
                                onChange={(e) => setTask({ ...task, instruction: e.target.value })}
                                required
                            />
                        </div>
                        <div className='text-end'>
                            <button onClick={handleSubmit} type='submit' className='bg-gray-900 text-white rounded-md p-2 px-5 mt-5 font-bold'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            )
        } */}
        
        </>
    )
}
export default TaskAssignModal