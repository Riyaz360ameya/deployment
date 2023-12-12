import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner';

function uploadDetails() {
    const router = useRouter()
    const inputFileRef = useRef(null);
    const [formData, setFormData] = useState({
        ventureName: '',
        projectPlace: '',
        email: '',
        ventureType: '',
        vision: '',
        projectUsp: '',
        contact: '',
        specification: '',
        amenities: '',
        pages: '',
        brochureLanguage: '',
        brochureBudget: '',
        leafLet: '',
        ventureDescription: '',
        estimatedDelivaryDate: '',
        siteAddress: '',
        previousVenture: '',
        officeAdress: '',
        location: '',
        projectOverview: '',
    })

    const submitProjectDetails = async (e) => {
        e.preventDefault();
        try {
            const userString = localStorage.getItem('user');
            const user = JSON.parse(userString);
            console.log(user, "user")
            const userId = user._id
            formData.userId = userId
            console.log(formData, '-----------formData')
            const { data } = await axios.post("/api/users/projectInput", formData);
            toast.success(data.message)
            router.push("/proceed");
        } catch (error) {
            toast.error("something went wrong")
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={submitProjectDetails}>
                <div class="grid gap-6 mb-6 md:grid-cols-2 my-5 mx-5 overflow-hidden ">
                    <div>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Venture name</label>
                        <input
                            type="text" id="first_name"
                            class="bg-gray-50 border border-gray-300
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500
                            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                            dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""
                            required
                            value={formData.ventureName}
                            onChange={(e) => setFormData({ ...formData, ventureName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Place </label>
                        <input
                            type="text" id="last_name" class="bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                                block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.projectPlace}
                            onChange={(e) => setFormData({ ...formData, projectPlace: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Id</label>
                        <input
                            type="text" id="company"
                            class="bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
                                p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Venture Type</label>
                        <input
                            type="text" id="company"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.ventureType}
                            onChange={(e) => setFormData({ ...formData, ventureType: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vision</label>
                        <input
                            type="text" id="phone" class="bg-gray-50 border border-gray-300
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                            w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.vision}
                            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project USP</label>
                        <input
                            type="text" id="website" class="bg-gray-50 border border-gray-300
                         text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                          block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.projectUsp}
                            onChange={(e) => setFormData({ ...formData, projectUsp: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact</label>
                        <input
                            type="number" id="visitors" class="bg-gray-50 border
                           border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                           focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                           dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specification</label>
                        <input
                            type="text" id="phone" class="bg-gray-50 border border-gray-300
                             text-gray-900 text-sm rounded-lg focus:ring-blue-500
                             focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                             dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                             dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.specification}
                            onChange={(e) => setFormData({ ...formData, specification: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amenities</label>
                        <input
                            type="text" id="website" class="bg-gray-50 border border-gray-300
                             text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                             block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                             dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.amenities}
                            onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No.of pages (brochure)</label>
                        <input
                            type="text" id="phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                           dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                           dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.pages}
                            onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brochure(language)</label>
                        <input
                            type="text" id="website" class="bg-gray-50 border border-gray-300
                             text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                             block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.brochureLanguage}
                            onChange={(e) => setFormData({ ...formData, brochureLanguage: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Budget brochure</label>
                        <input
                            type="number" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 
                              text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                             dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.brochureBudget}
                            onChange={(e) => setFormData({ ...formData, brochureBudget: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leaflet</label>
                        <input
                            type="text" id="website" class="bg-gray-50 border border-gray-300
                           text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.leafLet}
                            onChange={(e) => setFormData({ ...formData, leafLet: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Venture description</label>
                        <input
                            type="text" id="phone" class="bg-gray-50 border border-gray-300
                           text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                           block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.ventureDescription}
                            onChange={(e) => setFormData({ ...formData, ventureDescription: e.target.value })}
                        />
                    </div>
                    <div>
                        <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estimated Delivary Date</label>
                        <input
                            type="date" id="website" class="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.estimatedDelivaryDate}
                            onChange={(e) => setFormData({ ...formData, estimatedDelivaryDate: e.target.value })}
                        />
                    </div>
                    <div class="mb-6 ">
                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Site address</label>
                        <input
                            type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.siteAddress}
                            onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
                        />
                    </div>
                </div>
                <div class="my-5 mx-5">

                    <div class="mb-6">
                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Previous ventuare</label>
                        <input
                            type="text" id="email" class="bg-gray-50 border border-gray-300
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                            w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.previousVenture}
                            onChange={(e) => setFormData({ ...formData, previousVenture: e.target.value })}
                        />
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Office address</label>
                        <input
                            type="text" id="password" class="bg-gray-50 border border-gray-300 text-gray-900
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                           dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.officeAdress}
                            onChange={(e) => setFormData({ ...formData, officeAdress: e.target.value })}
                        />
                    </div>
                    <div class="mb-6">
                        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                        <input
                            type="text" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900
                             text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                             dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>

                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project overview</label>
                    <textarea
                        id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 
                       rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Extent,number of units,club house sqft..."
                        value={formData.projectOverview}
                        onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
                    ></textarea>

                    <div class="flex items-start mb-6 mt-5">
                        <div class="flex items-center h-5">
                            <input
                                id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 
                              rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700
                             dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                required
                            />
                        </div>
                        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                    </div>
                </div>
                <button
                    type="submit" class="text-white my-5 mx-5 bg-blue-700 hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                 dark:focus:ring-blue-800" >Submit</button>
            </form>











        </>
        // ----------------------------------------------------------------------------
        // //budget
        // const [interior, setInterior] = useState(0)
        // const [exterior, setExterior] = useState(0)
        // const [video, setVideo] = useState(0)
        // const [totalInterior, setTotalInterior] = useState(0)
        // const [totalExterior, setTotalExterior] = useState(0)
        // const [totalVideo, setTotalVideo] = useState(0)
        // const interiorValue = 35000;
        // const exteriorValue = 25000;
        // const videoValue = 5000;
        // const interiorCalculation = (e) => {
        //     const inputValue = e.target.value;
        //     setInterior(inputValue);
        //     console.log(interior, '-------', interiorValue)
        //     const calculatedValue = inputValue * interiorValue;
        //     setTotalInterior(calculatedValue)
        //     setFormData({ ...formData, interiorViews: e.target.value })
        // }
        // const exteriorCalculation = (e) => {
        //     const inputValue = e.target.value;
        //     setExterior(inputValue);
        //     const calculatedValue = inputValue * exteriorValue;
        //     setTotalExterior(calculatedValue)
        //     setFormData({ ...formData, exteriorViews: e.target.value })
        // }
        // const videoCalculation = (e) => {
        //     const inputValue = e.target.value;
        //     setVideo(inputValue);
        //     const calculatedValue = inputValue * videoValue;
        //     setTotalVideo(calculatedValue)
        //     setFormData({ ...formData, video: e.target.value })
        // }
        // const handleFileChange = (e) => {
        //     const file = e.target.files[0];
        //     setFormData((prevData) => ({ ...prevData, cadFile: file }));
        // };
        // -------------------------------------------
        // projectTitle: '',
        // description: '',
        // startDate: '',
        // endDate: '',
        // budget: '',
        // cadFile: null,
        // instruction: '',
        // interiorViews: '',
        // exteriorViews: '',
        // video: ''
        // --------------------------------------------------
        // const submitDetails = async (e) => {
        //     e.preventDefault();
        //     try {
        //         console.log(formData, '-------------formData---formData')
        //         const data = new FormData();
        //         const userString = localStorage.getItem('user');
        //         const user = JSON.parse(userString);
        //         const userId = user._id
        //         data.append('projectTitle', formData.projectTitle);
        //         data.append('description', formData.description);
        //         data.append('startDate', formData.startDate);
        //         data.append('endDate', formData.endDate);
        //         data.append('cadFile', formData.cadFile);
        //         data.append('instruction', formData.instruction);
        //         data.append('interiorViews', formData.interiorViews);
        //         data.append('exteriorViews', formData.exteriorViews);
        //         data.append('video', formData.video);
        //         data.append('userId', userId);
        //         console.log(data, '---------sending data')
        //         const response = await axios.post("/api/users/projectInput", data);
        //         toast.success("Added project successfully")
        //         setFormData({
        //             projectTitle: '',
        //             description: '',
        //             startDate: '',
        //             endDate: '',
        //             budget: '',
        //             cadFile: null,
        //             instruction: '',
        //             interiorViews: '',
        //             exteriorViews: '',
        //             video: ''
        //         });
        //         setTotalInterior('')
        //         setTotalExterior('')
        //         setTotalVideo('')
        //         inputFileRef.current.value = ''
        //     } catch (error) {
        //         console.log("details adding failed", error.message);
        //         toast.error("Something went wrong!")
        //     }
        // }
        // useEffect(() => {
        //     const currentDate = new Date();
        //     const StartingDate = new Date(currentDate.setDate(currentDate.getDate()));
        //     const formattedStartingDate = StartingDate.toISOString().split('T')[0];
        //     setFormData((prevData) => ({ ...prevData, startDate: formattedStartingDate }));
        //     const estimatedEndDate = new Date(currentDate.setDate(currentDate.getDate() + 90));
        //     const formattedEstimatedEndDate = estimatedEndDate.toISOString().split('T')[0];
        //     setFormData((prevData) => ({ ...prevData, endDate: formattedEstimatedEndDate }));
        // }, []); // Empty dependency array ensures the effect runs only once on mount
        // const handleStartDateChange = (e) => {
        //     const newStartDate = e.target.value;
        //     // Recalculate and update the estimated end date
        //     const startDate = new Date(newStartDate);
        //     const estimatedEndDate = new Date(startDate.setDate(startDate.getDate() + 90));
        //     const formattedEstimatedEndDate = estimatedEndDate.toISOString().split('T')[0];
        //     setFormData({
        //         ...formData,
        //         startDate: newStartDate,
        //         endDate: formattedEstimatedEndDate,
        //     });
        // };
        // --------------------------------------------------------
        // <div className='p-2 h-full overflow-hidden overflow-y-scroll' >
        //     <div className='text-center bg-slate-400 p-2 flex flex-col items-center '>
        //         <h1 className='text-xl  font-semibold md:text-3xl'>Add New Project</h1>
        //         <div className="p-2 w-full md:p-5 md:w-[80%]">
        //             <form className='flex flex-col gap-1'>
        //                 <div className='text-left text-sm'>
        //                     <label className='font-bold' htmlFor="">Project Title</label>
        //                     <input type="text" className='w-full  bg-gray-200 outline-none p-2 rounded-md'
        //                         value={formData.projectTitle}
        //                         id='projectTitle'
        //                         onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
        //                         required
        //                     />
        //                 </div>
        //                 <div className='text-left text-sm'>
        //                     <label className='font-bold' htmlFor="">Description</label>
        //                     <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
        //                         id='description'
        //                         value={formData.description}
        //                         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        //                         required
        //                     />
        //                 </div>

        //                 <div className='flex justify-between'>
        //                     <div className='text-left text-sm w-full md:w-1/3'>
        //                         <label className='font-bold' htmlFor="">Start Date</label>
        //                         <input
        //                             type="date"
        //                             className='w-full border border-gray-400  bg-gray-200 outline-none p-2 rounded-md'
        //                             id='startDate'
        //                             value={formData.startDate}
        //                             onChange={handleStartDateChange}
        //                             required
        //                             min={formData.startDate}
        //                         />
        //                     </div>
        //                     <div className='text-left text-sm w-full md:w-1/3'>
        //                         <label className='font-bold' htmlFor="">Estimated Due Date</label>
        //                         <input
        //                             type="date"
        //                             className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
        //                             id='endDate'
        //                             onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
        //                             required
        //                             value={formData.endDate}
        //                             min={formData.endDate}
        //                         />
        //                     </div>
        //                 </div>

        //                 <div className='text-left text-sm flex flex-col '>
        //                     <label className='font-bold' htmlFor="">Project CAD File</label>
        //                     <input
        //                         className='bg-white px-5 py-3 rounded'
        //                         type="file"
        //                         id="cadFile"
        //                         ref={inputFileRef}
        //                         onChange={handleFileChange}
        //                     />
        //                 </div>
        //                 <div className='text-left text-sm'>
        //                     <label className='font-bold' htmlFor="">Instruction to the Team</label>
        //                     <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
        //                         id='instruction'
        //                         onChange={(e) => setFormData({ ...formData, instruction: e.target.value })}
        //                         required
        //                     />
        //                 </div>
        //                 {/* ---------------------------- <Budgets /> --------------------------- */}


        //                 <div>
        //                     <p className='text-lg font-bold text-left text-red-700'>
        //                         Budget
        //                     </p>
        //                     <div className='text-left'>
        //                         <label className='font-bold text-green-900' >Interior</label>
        //                         <div className='flex gap-5'>
        //                             <div>
        //                                 <label>No of view </label>
        //                                 <input
        //                                     type='number'
        //                                     className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
        //                                     placeholder='No of Views'
        //                                     onChange={interiorCalculation}
        //                                     value={formData.interiorViews}
        //                                 />
        //                             </div>
        //                             <div>
        //                                 <label>Estimated cost</label>
        //                                 <input
        //                                     type='number'
        //                                     className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
        //                                     readOnly
        //                                     value={totalInterior}

        //                                 />
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div className='text-left'>
        //                         <label className='font-bold text-amber-900' >Exterior</label>
        //                         <div className='flex gap-5'>                    <div>
        //                             <label>No of view </label>
        //                             <input
        //                                 type='number'
        //                                 className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
        //                                 placeholder='No of Views'
        //                                 onChange={exteriorCalculation}
        //                                 value={formData.exteriorViews}
        //                             />
        //                         </div>
        //                             <div>
        //                                 <label>Estimated cost</label>
        //                                 <input
        //                                     type='number'
        //                                     className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
        //                                     readOnly
        //                                     value={totalExterior}
        //                                 />
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div className='text-left'>
        //                         <label className='font-bold text-yellow-800' >Video</label>
        //                         <div className='flex gap-5'>                    <div>
        //                             <label>No of Mints</label>
        //                             <input
        //                                 type='number'
        //                                 className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
        //                                 placeholder='Minute'
        //                                 onChange={videoCalculation}
        //                                 value={formData.video}
        //                             />
        //                         </div>
        //                             <div>
        //                                 <label>Estimated cost</label>
        //                                 <input
        //                                     type='number'
        //                                     className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
        //                                     readOnly
        //                                     value={totalVideo}
        //                                 />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 {/* ///////-------------------Budget-----------------------------////// */}
        //                 <div className='text-end'>
        //                     <button className='bg-gray-900 text-white rounded-md p-2 px-5 mt-5 font-bold' onClick={submitDetails}>Submit</button>
        //                 </div>

        //             </form>
        //         </div>
        //     </div>
        // </div>
    )
}

export default uploadDetails


