import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Budgets from './Budget';
function uploadDetails() {
    const [formData, setFormData] = useState({
        projectTitle: '',
        description: '',
        startDate: '',
        endDate: '',
        budget: '',
        cadFile: null,
        instruction: ''
    })
    const notify = () => toast("Project details added successful!");
    
    useEffect(() => {
        console.log(formData);
      }, [formData]);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, cadFile: file }));
      };
   
    // const submitDetails = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const formData = new formData();
    //         for (const key in formData) {
    //             formData.append(key, formData[key]);
    //         }

    //         const response = await axios.post("/api/users/projectInput", formData);
    //         notify();
    //         console.log(response.data, "project details added successfully");
    //         reset();
    //     } catch (error) {
    //         console.log("details adding failed", error.message);
    //         toast.error("Something went wrong!");
    //     }
    // };
    const submitDetails = async (e) => {
        e.preventDefault();
        try {
            // const formData = new FormData();
            // formData.append('cadFile', formData.cadFile);
            const response = await axios.post("/api/users/projectInput", formData,
            // {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // }
            
            );
            notify()
            console.log(response.data, "project details added successfully");
           
            toast.success("Added project successfuly")
        } catch (error) {
            console.log("details adding failed", error.message);
            toast.error("Something went wrong!")
        }
    }
   




    return (
        <div className='p-2' >
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
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className='flex justify-between'>
                            <div className='text-left text-sm w-full md:w-1/3'>
                                <label className='font-bold' htmlFor="">Start Date</label>
                                <input type="date" className='w-full border border-gray-400  bg-gray-200 outline-none p-2 rounded-md'
                                    id='startDate'
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className='text-left text-sm w-full md:w-1/3'>
                                <label className='font-bold' htmlFor="">End Date</label>
                                <input type="date" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                    id='endDate'
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>


                        {/* <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Project CAD File</label>
                            <input
                                type="file"
                                id="cadFile"
                                onChange={handleFileChange}
                            />
                        </div> */}

                        <div className='text-left text-sm'>
                            <label className='font-bold' htmlFor="">Instruction to the Team</label>
                            <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                                id='instruction'
                                onChange={(e) => setFormData({ ...formData, instruction: e.target.value })}
                                required
                            />
                        </div>
                        {/* <Budgets /> */}

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


