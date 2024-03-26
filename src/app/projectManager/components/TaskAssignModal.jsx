import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
import { BeatLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { assignLeadTask, getAllLeads } from '../pmAPIs/taskApis';
import { addNewOnGoProject, leadTaskAssign, pmOngoingProjects } from '@/app/redux/projectManager/pmProSlice';

const TaskAssignModal = ({ setModal, projectId, itemId, moveONgoing, setNextTask }) => {
    const dispatch = useDispatch()
    const [leadsData, setLeadsData] = useState([])
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState({
        importance: 'REGULAR',
        phase: 'White Render',
        projectTitle: '',
        description: '',
        instruction: '',
        startDate: '',
        endDate: '',
        projectId: projectId,
        selectedTeams: []
    });
    const onClose = () => {
        setModal(false);
        // setNextTask(false)
    };
    const handleClose = (e) => {
        if (e.target.id === 'container') {
            onClose();
        }
    };
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        // If checked, add the value to selectedTeams; otherwise, remove it
        if (checked) {
            setTask(prevTask => ({
                ...prevTask,
                selectedTeams: [...prevTask.selectedTeams, value]
            }));
        } else {
            setTask(prevTask => ({
                ...prevTask,
                selectedTeams: prevTask.selectedTeams.filter(teamId => teamId !== value)
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);
        try {
            console.log(task.selectedTeams, '------------------task')

            const { data } = await assignLeadTask(task)
            // console.log(data, '.................data on assigning')
            // dispatch(leadTaskAssign(itemId));
            // dispatch(pmOngoingProjects(data.newOngoing))
            // toast.success(data.message);
            // moveONgoing()
            // setModal(false);
            // setLoading(false);
        } catch (error) {
            toast.error('Something went wrong!');
            console.error(error);
            setLoading(false);
        }
    };
    const getLeads = async () => {
        const { data } = await getAllLeads()
        setLeadsData(data.allLeadsData)
        const today = new Date();
        const formattedDate = today.toISOString().substr(0, 10); // YYYY-MM-DD
        setTask({ ...task, startDate: formattedDate });
    }
    useEffect(() => {
        getLeads()
    }, [])


    return (
        <div
            id='container'
            onClick={handleClose}
            className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '
        >
            <div className='bg-white dark:bg-boxdark p-5 rounded border-solid border-4 border-sky-500'>
                <h1 className='text-center text-xl'>Task Assigning</h1>

                {loading ?
                    <div className='flex items-center justify-center'>
                        <InfinitySpin width='200' color='black' />
                    </div>
                    :
                    <form onSubmit={handleSubmit} className='space-y-2 dark:text-gray-300'>
                        <div className='grid gap-2'>
                            <label className='font-bold dark:text-gray-400' htmlFor="">Select Team</label>
                            <div className='grid gap-2 grid-cols-2'>
                                {leadsData.map((lead, i) => (
                                    <div className="flex items-center" key={lead._id}>
                                        <input id={`checkbox-${lead._id}`} type="checkbox" value={lead._id}
                                            onChange={handleCheckboxChange}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor={`checkbox-${lead._id}`} className="ms-2 text-sm font-extrabold text-gray-900 dark:text-white">{lead.designation} Team</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-2' >
                            <div className='text-left text-sm w-full grid gap-2 '>
                                <label className='font-bold dark:text-gray-400' htmlFor="">Choose Phase</label>
                                <select
                                    name='importance'
                                    id='importance'
                                    className='w-full border border-gray-400 bg-gray-200 dark:bg-gray-700 outline-none p-2 rounded-md'
                                    onChange={(e) => setTask({ ...task, phase: e.target.value })}
                                    required
                                >
                                    <option value="Choose Team" className="uppercase" disabled >
                                        Choose Phase
                                    </option>
                                    <option value="White Render" className="uppercase" defaultValue>
                                        WHITE RENDER
                                    </option>
                                    <option value="Texture And Lightning" className="uppercase">
                                        TEXTURE & LIGHTNING
                                    </option>
                                    <option value="8K Render" className="uppercase">
                                        8K RENDER
                                    </option>
                                </select>
                            </div>
                            <div className='text-left text-sm w-full grid gap-2'>
                                <label className='font-bold' htmlFor="">Importance</label>
                                <select
                                    name='importance'
                                    id='importance'
                                    className='w-full border border-gray-400 dark:bg-gray-700 bg-gray-200 outline-none p-2 rounded-md'
                                    onChange={(e) => setTask({ ...task, importance: e.target.value })}
                                    required
                                >
                                    <option value="Choose Team" className="uppercase" disabled >
                                        Choose Type
                                    </option>
                                    <option value="REGULAR" className="uppercase" defaultValue>
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
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Project Title</label>
                            <input type="text" className='w-full border border-gray-400 dark:bg-gray-700 bg-gray-200 outline-none p-2 rounded-md'
                                id='projectTitle'
                                value={task.projectTitle}
                                onChange={(e) => setTask({ ...task, projectTitle: e.target.value })}
                                required
                            />
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Description</label>
                            <textarea type="text" className='w-full border border-gray-400 dark:bg-gray-700 bg-gray-200 outline-none p-2 rounded-md'
                                id='description'
                                value={task.description}
                                onChange={(e) => setTask({ ...task, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className='flex justify-between gap-2'>
                            <div className='text-left text-sm w-full '>
                                <label className='font-bold' htmlFor="">Start Date</label>
                                {/* <input
                                    type="date"
                                    className='w-full border border-gray-400  dark:bg-gray-700 bg-gray-200 outline-none p-2 rounded-md'
                                    id='startDate'
                                    value={task.startDate}
                                    onChange={(e) => setTask({ ...task, startDate: e.target.value })}
                                    required
                                /> */}
                                <input
                                    type="date"
                                    className='w-full border border-gray-400  dark:bg-gray-700 bg-gray-200 outline-none p-2 rounded-md'
                                    id='startDate'
                                    value={task.startDate}
                                    min={task.startDate} // Set min attribute to restrict selection from today onwards
                                    onChange={(e) => setTask({ ...task, startDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className='text-left text-sm w-full '>
                                <label className='font-bold' htmlFor="">Estimated Due Date</label>
                                <input
                                    type="date"
                                    className='w-full border border-gray-400 dark:bg-gray-700 bg-gray-200 outline-none p-2 rounded-md'
                                    id='endDate'
                                    onChange={(e) => setTask({ ...task, endDate: e.target.value })}
                                    required
                                    value={task.endDate}
                                />
                            </div>
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Instruction to the Team</label>
                            <textarea type="text" className='w-full border border-gray-400 dark:bg-gray-700 bg-gray-200 outline-none p-2 rounded-md'
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
                }
            </div>
        </div>
    );
};

export default TaskAssignModal;


