import React,{useState} from 'react'
import axios from 'axios'
import { toast } from 'sonner'
const TaskAssignModal = ({ setModal }) => {
    const [user, setUser] = useState({
        team:'',
        importance:'',
        projectTitle:'',
        description:'',
        instruction:'',
        startDate:'',
        endDate:''
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
        console.log(user)
        e.preventDefault();
        try {
            const response = await axios.post("/api/task/teamLeadTask",user)
            toast.success("Task has been Assigned!")
            console.log(response)
        } catch (error) {
            toast.error("something went wrong!")
            console.log(error.message)
        }
        // setModal(false)
    }
    return (
        <div
            id='container'
            onClick={handleClose}
            className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
            <div className='bg-white p-8 rounded'>
                <h1 className='text-center text-xl'>Task Assigning for developer</h1>
                <form  className='space-y-2'>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="">Select Team</label>
                        <select
                            name='team'
                            id='team'
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            onChange={(e) => setUser({ ...user, team: e.target.value })}
                            required
                        >
                            <option value="Choose Team" className="uppercase" defaultValue disabled >
                                developer Team
                            </option>
                            <option value="Riyaz" className="uppercase">
                               Riyaz
                            </option>
                            <option value="raghav" className="uppercase">
                                raghav
                            </option>
                            <option value="sujith" className="uppercase">
                                sujith
                            </option>
                        </select>
                    </div>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="">Importance</label>
                        <select
                           name='importance'
                           id='importance'
                           className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                           onChange={(e) => setUser({ ...user, importance: e.target.value })}
                           required
                        >
                            <option value="Choose Team" className="uppercase" defaultValue disabled >
                                Choose Type
                            </option>
                            <option value="REGULAR" className="uppercase">
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
                            value={user.projectTitle}
                            onChange={(e) => setUser({ ...user, projectTitle: e.target.value })}
                            required
                        />
                    </div>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="">Description</label>
                        <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            id='description'
                            value={user.description}
                            onChange={(e) => setUser({ ...user, description: e.target.value })}
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
                            value={user.startDate}
                            onChange={(e) => setUser({ ...user, startDate: e.target.value })}
                            required
                        />
                        </div>
                        <div className='text-left text-sm w-full '>
                            <label className='font-bold' htmlFor="">Estimated Due Date</label>
                            <input
                            type="date"
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            id='endDate'
                            onChange={(e) => setUser({ ...user, endDate: e.target.value })}
                            required
                            value={user.endDate}
                        />
                        </div>
                    </div>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="">Instruction to the Team</label>
                        <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            id='instruction'
                            value={user.instruction}
                            onChange={(e) => setUser({ ...user, instruction: e.target.value })}
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
}
export default TaskAssignModal