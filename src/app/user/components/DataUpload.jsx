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
            const response = await uploadProject( clientInputs );
            console.log(response, "-------data sending------------");
            console.log(projectId, "--------projectId----------")
        } catch (error) {
            console.error('Error sending data to the backend:', error);
        }
    };

    const settingWidthProgress = () => {
        const locationsLength = location.length;
        if (locationsLength === 1) {
            setWidth(15);
        } else if (locationsLength === 2) {
            setWidth(30);
        } else if (locationsLength === 3) {
            setWidth(50);
        } else if (locationsLength === 4) {
            setWidth(70);
        } else if (locationsLength === 5) {
            setWidth(90);
        }
    }
    useEffect(() => {
        settingWidthProgress();
    }, [location, width]);
    const bgColor = width < 20 ? 'bg-red-600' : width < 40 ? 'bg-orange-500' : width < 60 ? 'bg-yellow-400' : width < 80 ? 'bg-lime-400' : 'bg-green-600';
    const handleMove = (number) => {
        setLocation(Array.from({ length: number }, (_, index) => index + 1));
    };

    return (
        <div className='h-full p-2'>
            <div className='h-full  bg-gray-800 '>
                <div className='flex justify-around p-5'>
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