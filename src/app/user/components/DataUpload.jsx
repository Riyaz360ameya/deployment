import React, { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import ProjectInfo from './ProjectInfo';
import ContactDetails from './ContactDetails';
import FileUPload from './FileUPload';
import Loading from './Loading';
import ImageFilesUpload from './ImageFilesUpload';
import { uploadProject } from '../userAPIs/projectApis';
import './View.css';  // Assuming your styles are in View.css
import { TiTick } from "react-icons/ti";
import VerifyData from './VerifyData';

const DataUpload = () => {
    const [uniqueId, setUniqueId] = useState('');
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
    const [width, setWidth] = useState(15);
    const steps = ["Project Info", "Contact Details", "Files Upload", "Confirm", "Successful"];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);
    const bgColor = width < 20 ? 'bg-red-600' : width < 40 ? 'bg-orange-500' : width < 60 ? 'bg-yellow-400' : width < 80 ? 'bg-lime-400' : 'bg-green-600';
    const [location, setLocation] = useState([1]);

    const addToLocation = (newValue) => {
        setLocation((prevLocation) => [...prevLocation, newValue]);
        currentStep === steps.length
            ? setComplete(true)
            : setCurrentStep((prev) => prev + 1);
        if (newValue === 3) {
            sentClientData(clientInputs);
        }
    };

    const removeFromLocation = (valueToRemove) => {
        console.log(location, '---------------location')
        setLocation((prevLocation) => prevLocation.filter((item) => item !== valueToRemove));
        setCurrentStep((prev) => prev - 1);

    };

    const resetLocation = () => {
        console.log(location, '------------------location')
        setLocation([1]); // Set "location" to contain only the value 1
        console.log(location, '------------------location')
        console.log(currentStep, '------------------currentStep')
        setCurrentStep(1)
        setComplete(false)
    };

    const sentClientData = async (clientInputs) => {
        try {
            // const { data } = await uploadProject(clientInputs);
            // console.log(data, "-------data sending------------");
            // console.log(data.savedProject.ProjectUniqId, "-------data sending------------");
            // setUniqueId(data.savedProject.ProjectUniqId);
        } catch (error) {
            console.error('Error sending data to the backend:', error);
        }
    };

    return (
        <div className='h-full bg-gray-600 p-2 flex flex-col '>
            <div className="p-5 ">
                <div className="flex items-center">
                    {steps?.map((step, i) => (
                        <>
                            <div className="flex items-center relative flex-col justify-center ">
                                <div className={`rounded-full transition flex items-center justify-center duration-500 ease-in-out h-12 w-12 py-3 border-2 border-green-600 text-white 
                                ${currentStep === i + 1 && "bg-sky-600 text-white"} 
                                ${(i + 1 < currentStep || complete) && "bg-green-600 text-white"}  
                                `}>

                                    {i + 1 < currentStep || complete ?
                                        <TiTick size={24} />
                                        : i + 1}
                                </div>
                                <div className={`hidden md:flex items-center justify-center absolute top-0 mt-12 text-center w-32 text-xs font-medium uppercase text-black ${i + 1 < currentStep || complete ? 'text-white' : ''}`}>
                                    <p>{step}</p>
                                </div>
                            </div>

                            {i != steps.length - 1 && <div className={`flex-auto border-t-4 transition duration-500 ease-in-out  ${i + 1 < currentStep || complete ? 'border-green-600 ' : 'border-yellow-200'} `}></div>}
                        </>
                    ))}
                </div>
            </div>
            <div className='p-2 h-full overflow-hidden duration-700'>
                {location.length === 1 ? (
                    <ProjectInfo addToLocation={addToLocation} setClientInputs={setClientInputs} clientInputs={clientInputs} />
                ) : location.length === 2 ? (
                    <ContactDetails addToLocation={addToLocation} removeFromLocation={removeFromLocation} setClientInputs={setClientInputs} clientInputs={clientInputs} />
                ) : location.length === 3 ? (
                    <FileUPload addToLocation={addToLocation} removeFromLocation={removeFromLocation} uniqueId={uniqueId} projectName={clientInputs.projectName} />
                )
                    : location.length === 4 ? (
                        <VerifyData addToLocation={addToLocation} removeFromLocation={removeFromLocation} />
                        // <ImageFilesUpload  />
                    )
                        : location.length === 5 && (
                            <Loading resetLocation={resetLocation} />
                        )}
            </div>
        </div>
    );
};

export default DataUpload;
