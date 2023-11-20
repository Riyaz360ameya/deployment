import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner';

function uploadDetails() {
    const inputFileRef = useRef(null);
    const [formData, setFormData] = useState({
        projectTitle: '',
        description: '',
        startDate: '',
        endDate: '',
        budget: '',
        cadFile: null,
        instruction: '',
        interiorViews: '',
        exteriorViews: '',
        video: ''
    })
    const notify = () => toast("Project details added successful!");
    //budget
    const [interior, setInterior] = useState(0)
    const [exterior, setExterior] = useState(0)
    const [video, setVideo] = useState(0)
    const [totalInterior, setTotalInterior] = useState(0)
    const [totalExterior, setTotalExterior] = useState(0)
    const [totalVideo, setTotalVideo] = useState(0)
    const interiorValue = 35000;
    const exteriorValue = 25000;
    const videoValue = 5000;
    const interiorCalculation = (e) => {
        const inputValue = e.target.value;
        setInterior(inputValue);
        console.log(interior, '-------', interiorValue)
        const calculatedValue = inputValue * interiorValue;
        setTotalInterior(calculatedValue)
        setFormData({ ...formData, interiorViews: e.target.value })
    }
    const exteriorCalculation = (e) => {
        const inputValue = e.target.value;
        setExterior(inputValue);
        const calculatedValue = inputValue * exteriorValue;
        setTotalExterior(calculatedValue)
        setFormData({ ...formData, exteriorViews: e.target.value })
    }
    const videoCalculation = (e) => {
        const inputValue = e.target.value;
        setVideo(inputValue);
        const calculatedValue = inputValue * videoValue;
        setTotalVideo(calculatedValue)
        setFormData({ ...formData, video: e.target.value })
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, cadFile: file }));
    };
    const submitDetails = async (e) => {
        e.preventDefault();
        try {
            console.log(formData, '-------------formData---formData')
            const data = new FormData();
            const userString = localStorage.getItem('user');
            const user = JSON.parse(userString);
            const userId = user._id
            data.append('projectTitle', formData.projectTitle);
            data.append('description', formData.description);
            data.append('startDate', formData.startDate);
            data.append('endDate', formData.endDate);
            data.append('cadFile', formData.cadFile);
            data.append('instruction', formData.instruction);
            data.append('interiorViews', formData.interiorViews);
            data.append('exteriorViews', formData.exteriorViews);
            data.append('video', formData.video);
            data.append('userId', userId);
            console.log(data,'---------sending data')
            const response = await axios.post("/api/users/projectInput", data);
            toast.success("Added project successfully")
            setFormData({
                projectTitle: '',
                description: '',
                startDate: '',
                endDate: '',
                budget: '',
                cadFile: null,
                instruction: '',
                interiorViews: '',
                exteriorViews: '',
                video: ''
            });
            setTotalInterior('')
            setTotalExterior('')
            setTotalVideo('')
            inputFileRef.current.value = ''
        } catch (error) {
            console.log("details adding failed", error.message);
            toast.error("Something went wrong!")
        }
    }
    useEffect(() => {
        const currentDate = new Date();
        const StartingDate = new Date(currentDate.setDate(currentDate.getDate()));
        const formattedStartingDate = StartingDate.toISOString().split('T')[0];
        setFormData((prevData) => ({ ...prevData, startDate: formattedStartingDate }));
        const estimatedEndDate = new Date(currentDate.setDate(currentDate.getDate() + 90));
        const formattedEstimatedEndDate = estimatedEndDate.toISOString().split('T')[0];
        setFormData((prevData) => ({ ...prevData, endDate: formattedEstimatedEndDate }));
    }, []); // Empty dependency array ensures the effect runs only once on mount
    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        // Recalculate and update the estimated end date
        const startDate = new Date(newStartDate);
        const estimatedEndDate = new Date(startDate.setDate(startDate.getDate() + 90));
        const formattedEstimatedEndDate = estimatedEndDate.toISOString().split('T')[0];
        setFormData({
            ...formData,
            startDate: newStartDate,
            endDate: formattedEstimatedEndDate,
        });
    };


    return (
        <div className='p-2 h-full overflow-hidden overflow-y-scroll' >
            <div className='text-center bg-slate-400 p-2 flex flex-col items-center '>
                <h1 className='text-xl  font-semibold md:text-3xl'>Add New Project</h1>
                <div className="p-2 w-full md:p-5 md:w-[80%]">
                    <form className='flex flex-col gap-1'>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Project Title</label>
                            <input type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                value={formData.projectTitle}
                                id='projectTitle'
                                onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                                required
                            />
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Description</label>
                            <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                id='description'
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className='flex justify-between'>
                            <div className='text-left text-sm w-full md:w-1/3'>
                                <label className='font-bold' htmlFor="">Start Date</label>
                                <input
                                    type="date"
                                    className='w-full border border-gray-400  bg-gray-200 outline-none p-2 rounded-md'
                                    id='startDate'
                                    value={formData.startDate}
                                    onChange={handleStartDateChange}
                                    required
                                    min={formData.startDate}
                                />
                            </div>
                            <div className='text-left text-sm w-full md:w-1/3'>
                                <label className='font-bold' htmlFor="">Estimated Due Date</label>
                                <input
                                    type="date"
                                    className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                    id='endDate'
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    required
                                    value={formData.endDate}
                                    min={formData.endDate}
                                />
                            </div>
                        </div>

                        <div className='text-left text-sm flex flex-col '>
                            <label className='font-bold' htmlFor="">Project CAD File</label>
                            <input
                                className='bg-white px-5 py-3 rounded'
                                type="file"
                                id="cadFile"
                                ref={inputFileRef}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Instruction to the Team</label>
                            <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                id='instruction'
                                onChange={(e) => setFormData({ ...formData, instruction: e.target.value })}
                                required
                            />
                        </div>
                        {/* ---------------------------- <Budgets /> --------------------------- */}


                        <div>
                            <p className='text-lg font-bold text-left text-red-700'>
                                Budget
                            </p>
                            <div className='text-left'>
                                <label className='font-bold text-green-900' >Interior</label>
                                <div className='flex gap-5'>
                                    <div>
                                        <label>No of view </label>
                                        <input
                                            type='number'
                                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                            placeholder='No of Views'
                                            onChange={interiorCalculation}
                                            value={formData.interiorViews}
                                        />
                                    </div>
                                    <div>
                                        <label>Estimated cost</label>
                                        <input
                                            type='number'
                                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                            readOnly
                                            value={totalInterior}

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='text-left'>
                                <label className='font-bold text-amber-900' >Exterior</label>
                                <div className='flex gap-5'>                    <div>
                                    <label>No of view </label>
                                    <input
                                        type='number'
                                        className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                        placeholder='No of Views'
                                        onChange={exteriorCalculation}
                                        value={formData.exteriorViews}
                                    />
                                </div>
                                    <div>
                                        <label>Estimated cost</label>
                                        <input
                                            type='number'
                                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                            readOnly
                                            value={totalExterior}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='text-left'>
                                <label className='font-bold text-yellow-800' >Video</label>
                                <div className='flex gap-5'>                    <div>
                                    <label>No of Mints</label>
                                    <input
                                        type='number'
                                        className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                        placeholder='Minute'
                                        onChange={videoCalculation}
                                        value={formData.video}
                                    />
                                </div>
                                    <div>
                                        <label>Estimated cost</label>
                                        <input
                                            type='number'
                                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                            readOnly
                                            value={totalVideo}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ///////-------------------Budget-----------------------------////// */}
                        <div className='text-end'>
                            <button className='bg-gray-900 text-white rounded-md p-2 px-5 mt-5 font-bold' onClick={submitDetails}>Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default uploadDetails


