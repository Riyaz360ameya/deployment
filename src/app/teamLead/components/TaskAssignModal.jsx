import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner'
import { BeatLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { devUnderLead, taskAssign } from '../leadAPIs/taskApi'
import { addNewLeadTaskProject, teamLeadTaskAssign } from '@/app/redux/teamLead/leadProSlice'
const TaskAssignModal = ({ setModal, projectId, onGoingFurther, workType }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.lead.leadDetails);
    const [loading, setLoading] = useState(false)
    const [developers, setDevelopers] = useState([])
    const [selectFiles, setSelectFiles] = useState(false)
    const [task, setTask] = useState({
        developer: '',
        importance: '',
        projectTitle: '',
        description: '',
        instruction: '',
        startDate: '',
        endDate: '',
        projectId: projectId,
        selectedDvs: [],
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
        // setLoading(true);
        try {
            task.assignedBy = user._id
            console.log(task, '---------given task')
            // const { data } = await taskAssign(task)
            // console.log(data, '-------return message-------response')
            // dispatch(teamLeadTaskAssign(projectId));
            // dispatch(addNewLeadTaskProject(data.updateTask)); // Access the 'updateTask' property
            // toast.success(data.message)
            // onGoingFurther()
            // setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
            setLoading(false);
        }
        // setModal(false)
    }
    const leadData = async () => {
        const { data } = await devUnderLead()
        console.log(data.Developers, '--------developer++++++')
        setDevelopers(data.Developers)
        const today = new Date();
        const formattedDate = today.toISOString().substr(0, 10); // YYYY-MM-DD
        setTask({ ...task, startDate: formattedDate });
    }
    useEffect(() => {
        leadData()
    }, [])
    const filteredDevelopers = developers.filter(item => item.roles.includes(workType));

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        // If checked, add the value to selectedDevps; otherwise, remove it
        if (checked) {
            setTask(prevTask => ({
                ...prevTask,
                selectedDvs: [...prevTask.selectedDvs, value]
            }));
        } else {
            setTask(prevTask => ({
                ...prevTask,
                selectedDvs: prevTask.selectedDvs.filter(teamId => teamId !== value)
            }));
        }
    };
    const handleChange = () => {
        setSelectFiles((prev) => !prev)
    }
    return (
        <>
            <div
                id='container'
                onClick={handleClose}
                className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
                <div className='bg-white dark:bg-boxdark dark:text-white p-8 rounded'>
                    <h1 className='text-center text-xl capitalize'>{workType} Task Assigning</h1>
                    <form className='space-y-2' onSubmit={handleSubmit}>
                        {
                            !selectFiles ?
                                <>
                                    <div className='text-left text-sm'>
                                        <label className='font-bold' htmlFor='team'>
                                            Select Developer
                                        </label>
                                        <select
                                            name='developer'
                                            value={task.developer || ""} // Set the initial value based on the first item in the array
                                            id='developer'
                                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md dark:text-black'
                                            onChange={(e) => setTask({ ...task, developer: e.target.value })}
                                            required
                                        >
                                            <option value="" className="uppercase" disabled defaultValue  >
                                                Choose  Developer
                                            </option>
                                            {filteredDevelopers.length > 0 ? (
                                                filteredDevelopers.map((item, i) => (
                                                    <option key={i} value={item._id} className="uppercase">
                                                        {item.firstName} {item.lastName}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="" disabled>No developers found</option>
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <div className='grid gap-2 grid-cols-2'>
                                            {filteredDevelopers.length > 0 ? (
                                                filteredDevelopers.map((item, i) => (
                                                    <div className="flex items-center" key={item._id}>
                                                        <input id={`checkbox-${item._id}`} type="checkbox" value={item._id}
                                                            onChange={handleCheckboxChange}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor={`checkbox-${item._id}`} className="ms-2 text-sm font-extrabold text-gray-900 dark:text-white">{item.firstName} {item.lastName}</label>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No developers found</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='text-left text-sm'>
                                        <label className='font-bold' htmlFor="">Importance</label>
                                        <select
                                            value={task.importance || ""}
                                            name='importance'
                                            id='importance'
                                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md dark:text-black'
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
                                        <label className='font-bold' htmlFor="">Task Title</label>
                                        <input type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md dark:text-black'
                                            id='projectTitle'
                                            value={task.projectTitle}
                                            onChange={(e) => setTask({ ...task, projectTitle: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className='text-left text-sm'>
                                        <label className='font-bold' htmlFor="">Description</label>
                                        <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md dark:text-black'
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
                                                className='w-full border border-gray-400  bg-gray-200 outline-none p-2 rounded-md dark:text-black'
                                                id='startDate'
                                                value={task.startDate}
                                                min={task.startDate}
                                                onChange={(e) => setTask({ ...task, startDate: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className='text-left text-sm w-full '>
                                            <label className='font-bold' htmlFor="">Estimated Due Date</label>
                                            <input
                                                type="date"
                                                className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md dark:text-black'
                                                id='endDate'
                                                onChange={(e) => setTask({ ...task, endDate: e.target.value })}
                                                required
                                                value={task.endDate}
                                            />
                                        </div>
                                    </div>
                                    <div className='text-left text-sm'>
                                        <label className='font-bold' htmlFor="">Instruction to the Developer</label>
                                        <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md dark:text-black'
                                            id='instruction'
                                            value={task.instruction}
                                            onChange={(e) => setTask({ ...task, instruction: e.target.value })}
                                            required
                                        />
                                    </div>


                                </>
                                :
                                <div className='h-[500px]'>
                                    <p className='mt-5 font-bold'>Select Files</p>
                                </div>
                        }
                        <div className='text-center'>
                            {
                                !selectFiles ?
                                    <button className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold'
                                        onClick={handleChange}
                                    >
                                        Next
                                    </button>
                                    :
                                    <div className='flex gap-2 text-white font-bold'>
                                        <button className='bg-red-500 rounded p-2 w-1/2'
                                            onClick={handleChange}
                                        >
                                            Back
                                        </button>
                                        <button type={loading ? "button" : "submit"} className='bg-gray-700 rounded p-2 w-1/2'>
                                            {loading ? <BeatLoader color='white' /> : 'Submit'}
                                        </button>
                                    </div>
                            }
                            {/* <button type={loading ? "button" : "submit"} className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold'>
                                {loading ? <BeatLoader color='white' /> : 'Submit'}
                            </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default TaskAssignModal