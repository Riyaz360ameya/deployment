import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner'
import { BeatLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { devUnderLead, leadTaskFiles, taskAssign } from '../leadAPIs/taskApi'
import { addNewLeadTaskProject, teamLeadTaskAssign } from '@/app/redux/teamLead/leadProSlice'
import SelectFiles from './SelectFiles';
import DevTaskOptions from './DevTaskOptions';


const TaskAssignModal = ({ setModal, projectId, onGoingFurther, workType }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.lead.leadDetails);
    const [loading, setLoading] = useState(false)
    const [dataLoading, setDataLoading] = useState(false)
    const [developers, setDevelopers] = useState([])
    const [selectFiles, setSelectFiles] = useState(false)
    const [filesData, setFilesData] = useState([]);
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
        selectedFiles: [],
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
            const { data } = await taskAssign(task)
            // dispatch(teamLeadTaskAssign(projectId));
            // dispatch(addNewLeadTaskProject(data.updateTask)); // Access the 'updateTask' property
            toast.success(data.message)
            // onGoingFurther()
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
            setLoading(false);
        }
        setModal(false)
    }
    const handleChange = () => {
        setSelectFiles((prev) => !prev)
    }
    const leadData = async () => {
        setDataLoading(true);
        const { data } = await devUnderLead()
        setDevelopers(data.Developers)
        const today = new Date();
        const formattedDate = today.toISOString().substr(0, 10); // YYYY-MM-DD
        setTask({ ...task, startDate: formattedDate });
    }
    // fetching leadTask files
    const fetchData = async () => {
        try {
            const { data } = await leadTaskFiles(projectId);
            setFilesData(data.files || []);
            setDataLoading(false);
        } catch (error) {
            //   toast.error(error.response.data.error);
            console.error('Error fetching files:', error.message);
        } finally {
        }
    };
    useEffect(() => {
        leadData()
        fetchData();
    }, [])
    return (
        <>
            <div
                id='container'
                onClick={handleClose}
                className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
                <div className='bg-white dark:bg-boxdark dark:text-white p-8 rounded w-[550px] h-[600px] overflow-auto'>
                    <form className='h-full' onSubmit={handleSubmit}>
                        <h1 className='text-center text-xl capitalize'>{workType} Task Assigning</h1>
                        {
                            !dataLoading ?
                                <>
                                    {
                                        !selectFiles ?
                                            <DevTaskOptions developers={developers} task={task} setTask={setTask} workType={workType} />
                                            :
                                            <div className=''>
                                                <p className='mt-5 font-bold'>Select Files</p>
                                                <SelectFiles task={task} setTask={setTask} filesData={filesData} />
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

                                                !loading ?

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
                                                    :
                                                    <div className='bg-gray-700 rounded p-2'
                                                    >
                                                        <BeatLoader color='white' />
                                                    </div>
                                        }
                                    </div>
                                </>
                                :
                                <div className='w-full h-full flex items-center justify-center dark:text-white'>
                                    <InfinitySpin
                                        width='200'
                                        color="black"
                                    />
                                </div>
                        }

                    </form>
                </div>
            </div >
        </>
    )
}
export default TaskAssignModal