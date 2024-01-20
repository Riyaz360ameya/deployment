import React, { useState } from 'react';
import { toast } from 'sonner';
import { InfinitySpin } from 'react-loader-spinner';
import { BeatLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux'
import { assignLeadTask } from '../pmAPIs/taskApis';
import { addNewOnGoProject, leadTaskAssign } from '@/app/redux/projectManager/pmProSlice';

const TaskAssignModal = ({ setModal, projectId, item }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState({
        designation: 'Interior',
        importance: 'REGULAR',
        projectTitle: '',
        description: '',
        instruction: '',
        startDate: '',
        endDate: '',
        projectId: projectId
    });

    const onClose = () => {
        setModal(false);
    };

    const handleClose = (e) => {
        if (e.target.id === 'container') {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await assignLeadTask(task)
            dispatch(leadTaskAssign(item));
            dispatch(addNewOnGoProject(data.newOngoing))
            toast.success(data.message);
            // moveONgoing()
            setModal(false);
            setLoading(false);
        } catch (error) {
            toast.error('Something went wrong!');
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div
            id='container'
            onClick={handleClose}
            className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '
        >
            <div className='bg-white p-8 rounded'>
                <h1 className='text-center text-xl'>Task Assigning</h1>

                {loading ?
                    <div className='flex items-center justify-center'>
                        <InfinitySpin width='200' color='black' />
                    </div>
                    :
                    <form onSubmit={handleSubmit} className='space-y-2'>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Select Team</label>
                            <select
                                placeholder='Choose Team'
                                name='designation'
                                id='designation'
                                className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                onChange={(e) => setTask({ ...task, designation: e.target.value })}
                                required
                            >
                                <option value="" className="uppercase" disabled >
                                    Choose Team
                                </option>
                                <option value="Interior" className="uppercase" defaultValue>
                                    INTERIOR
                                </option>
                                <option value="Exterior" className="uppercase">
                                    EXTERIOR
                                </option>
                            </select>
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Importance</label>
                            <select
                                name='importance'
                                id='importance'
                                className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
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
                }
            </div>
        </div>
    );
};

export default TaskAssignModal;


