import React, { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa";
import ProjectInfo from './ProjectInfo';
import ProjectOverview from './ProjectOverview';
import ContactDetails from './ContactDetails';
import FileUPload from './FileUPload';
import Loading from './Loading';
import ImageFilesUpload from './ImageFilesUpload';
import { uploadProject } from '../userAPIs/projectApis';
import { v4 as uuidv4 } from 'uuid';


const DataUpload = () => {
    const [clientInputs, setClientInputs] = useState({
        // projectId: '',
        projectName: '',
        projectDes: '',
        projectHighlights: '',
        projectType: '',
        projectUSP: '',
        specification: '',

        clientName: '',
        clientEmail: '',
        clientMobileNO: '',
        clientOfficeAddress: '',
        clientSiteAddress: '',
        clientSiteLocation: '',

        architectureName: '',
        architectureMobNo: '',
        architectureEmail: '',

        landscapeName: '',
        landscapeEmail: '',
        landscapeMobNo: '',


    });

    const [location, setLocation] = useState([1])
    const [width, setWidth] = useState(15)

    const addToLocation = (newValue) => {
        console.log(clientInputs, '-------------------clientInputs')
        setLocation(prevLocation => [...prevLocation, newValue]);
        if (newValue == 3) {
            sentClientData(clientInputs)
            console.log(clientInputs, '-----------------all data------------')
        }
    };
    const removeFromLocation = (valueToRemove) => {
        setLocation(prevLocation => prevLocation.filter(item => item !== valueToRemove));
    };
    const resetLocation = () => {
        setLocation([1])
    }
    const sentClientData = async (clientInputs) => {
        try {
            const projectId = uuidv4();
            setClientInputs({ ...clientInputs, projectId });
            const response = await uploadProject(clientInputs);
            console.log(response, "-------data sending------------");
            console.log(projectId, "--------projectId----------")
        } catch (error) {
            console.error('Error sending data to the backend:', error);
        }
    };
    return (
        <div className='h-full p-2'>
            <div className='bg-gray-800 '>
                {/* stepper */}
                <div class="p-5">
                    <div class="mx-4 p-4">
                        <div class="flex items-center">
                            <div class="flex items-center text-teal-600 relative">
                                <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark ">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                </div>
                                <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Project Info</div>
                            </div>
                            <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
                            <div class="flex items-center text-white relative">
                                <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus ">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="8.5" cy="7" r="4"></circle>
                                        <line x1="20" y1="8" x2="20" y2="14"></line>
                                        <line x1="23" y1="11" x2="17" y2="11"></line>
                                    </svg>
                                </div>
                                <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Contact Details</div>
                            </div>
                            <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                            <div class="flex items-center text-gray-500 relative">
                                <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail ">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">Files Upload</div>
                            </div>
                            <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                            <div class="flex items-center text-gray-500 relative">
                                <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-database ">
                                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                    </svg>
                                </div>
                                <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">Confirm</div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 p-4">

                        <div class="flex p-2 mt-4">
                            <button class="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                hover:bg-gray-200  
                                bg-gray-100 
                                text-gray-700 
                                border duration-200 ease-in-out 
                                border-gray-600 transition"
        >Previous</button>
                            <div class="flex-auto flex flex-row-reverse">
                                <button class="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                hover:bg-teal-600  
                                bg-teal-600 
                                text-teal-100 
                                border duration-200 ease-in-out 
                                border-teal-600 transition"
        >Next</button>
                                <button class="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                hover:bg-teal-200  
                                bg-teal-100 
                                text-teal-700 
                                border duration-200 ease-in-out 
                                border-teal-600 transition"
        >Skip</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-5 '>
                    {
                        location.length == 1 ? <ProjectInfo addToLocation={addToLocation} setClientInputs={setClientInputs} clientInputs={clientInputs} />
                            // : location.length == 2 ? <ProjectOverview addToLocation={addToLocation} removeFromLocation={removeFromLocation} />
                            : location.length == 2 ? <ContactDetails addToLocation={addToLocation} removeFromLocation={removeFromLocation} setClientInputs={setClientInputs} clientInputs={clientInputs} />
                                : location.length == 3 ? <FileUPload addToLocation={addToLocation} removeFromLocation={removeFromLocation} projectId={clientInputs.projectId} projectName={clientInputs.projectName} />
                                    : location.length == 4 ? <ImageFilesUpload addToLocation={addToLocation} removeFromLocation={removeFromLocation} />
                                        : location.length == 5 && <Loading resetLocation={resetLocation} />
                    }
                </div>

            </div>
        </div>
    )
}

export default DataUpload



{/* <div className='flex justify-around p-5'>
                    {[1, 2, 3, 4, 5].map((number) => (
                        <div
                            key={number}
                            onClick={() => handleMove(number)}
                            className={`w-14 h-14 md:w-20 md:h-20 cursor-pointer ${location.includes(number) ? 'text-black bg-white' : 'text-white bg-slate-600'}
    grid place-items-center rounded-full text-sm md:text-3xl font-extrabold`}
                        >
                            <p>{number === 5 ? <FaCheck /> : number}</p>
                        </div>
                    ))}
                </div>
                <div className='p-5'>
                    <div className="w-full h-1 mb-6 bg-neutral-200 dark:bg-neutral-600 rounded-full">
                        <div
                            className={`h-1 transition-all duration-500 ease-in-out ${bgColor} relative grid place-items-center  rounded-full`}
                            style={{ width: `${width}%` }}>
                            <span className={`absolute h-4 w-4 ${bgColor} rounded-full  right-0 flex items-center justify-center`}>
                                <span className={`h-full w-full rounded-full animate-ping  ${bgColor} opacity-75`}></span>
                            </span>
                        </div>
                    </div>
                </div> */}
{/* <div class="p-5">
                    <div class="mx-4 p-4">
                        <div class="flex items-center">
                            <div class="flex items-center text-teal-600 relative">
                                <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark ">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                </div>
                                <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Personal</div>
                            </div>
                            <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
                            <div class="flex items-center text-white relative">
                                <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus ">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="8.5" cy="7" r="4"></circle>
                                        <line x1="20" y1="8" x2="20" y2="14"></line>
                                        <line x1="23" y1="11" x2="17" y2="11"></line>
                                    </svg>
                                </div>
                                <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Account</div>
                            </div>
                            <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                            <div class="flex items-center text-gray-500 relative">
                                <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail ">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">Message</div>
                            </div>
                            <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                            <div class="flex items-center text-gray-500 relative">
                                <div class="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-database ">
                                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                    </svg>
                                </div>
                                <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">Confirm</div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 p-4">

                        <div class="flex p-2 mt-4">
                            <button class="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition">Previous</button>
                            <div class="flex-auto flex flex-row-reverse">
                                <button class="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-600  
        bg-teal-600 
        text-teal-100 
        border duration-200 ease-in-out 
        border-teal-600 transition">Next</button>
                                <button class="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-200  
        bg-teal-100 
        text-teal-700 
        border duration-200 ease-in-out 
        border-teal-600 transition">Skip</button>
                            </div>
                        </div>
                    </div>
                </div>  */}