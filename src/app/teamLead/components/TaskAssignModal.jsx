import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner'
import { BeatLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { devUnderLead, taskAssign } from '../leadAPIs/taskApi'
import { addNewLeadTaskProject, teamLeadTaskAssign } from '@/app/redux/teamLead/leadProSlice'
const TaskAssignModal = ({ setModal, projectId, onGoingFurthur }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.lead.leadDetails);
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
            task.assignedBy = user._id
            console.log(task, '---------given task')
            const { data } = await taskAssign(task)
            console.log(data, '-------return message-------response')
            dispatch(teamLeadTaskAssign(projectId));
            dispatch(addNewLeadTaskProject(data.updateTask)); // Access the 'updateTask' property
            toast.success(data.message)
            onGoingFurthur()
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
            setLoading(false);
        }
        setModal(false)
    }
    const leadData = async () => {
        const { data } = await devUnderLead()
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
                    <form className='space-y-2' onSubmit={handleSubmit}>
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
                            <button type={loading ? "button" : "submit"} className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold'>
                                {loading ? <BeatLoader color='white' /> : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default TaskAssignModal