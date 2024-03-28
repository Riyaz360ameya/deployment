import React, { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import ProjectInfo from './ProjectInfo';
import ContactDetails from './ContactDetails';
import FileUPload from './FileUPload';
import Loading from './Loading';
import ImageFilesUpload from './ImageFilesUpload';
import { uploadFiles, uploadProject } from '../userAPIs/projectApis';
import './View.css';  // Assuming your styles are in View.css
import { TiTick } from "react-icons/ti";
import VerifyData from './VerifyData';
import { toast } from 'react-toastify';

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
    const [fileUpload, setFileUpload] = useState({
        // '3DsMax - Building': {},
        // '3DsMax - Landscape & Textures': {},
        // '3DsMax - Terrace': {},
        // '3DsMax - Entry or Exit gate': {},
        // 'CAD Floor plans (dwg)': {},
        // 'CAD Elevation (dwg)': {},
        // 'CAD Section (dwg)': {},
        // 'Club House CAD Elevation (dwg)': {},
        // 'Club House CAD Section (dwg)': {},
        // 'Club house floor plans CAD (dwg)': {},
        // 'Tower Terrace Cad (dwg)': {},
        // 'Landscape (Dwg)': {},
        // // //images file
        // 'Material Palette': {},
        // 'Exterior draft images': {},
        // 'Interior draft images': {},
        // 'Aerial Image, Front Building elevation image for all towers': {},
        // '2D Floor Plan (color)': {},
        // '2D Unit plan (color)': {},
        // '2D Unit plan (ISO)': {},
        // 'Renders of common areas': {},
        // 'Tower Terrace Renders': {},
        // 'Club House Terrace Renders': {},
        // 'Amenities Images': {},
        // 'Master Plan of site (color)': {},
        // 'Club house floor plan (2D Color)': {},
        'Logo of project or Company': {},
        'Landscape renders': {},
        'Project Brochure': {},
    });
    const steps = ["Project Info", "Contact Details", "Files Upload", "Confirm", "Successful"];
    const steps1 = ["Project Info", "Contact Details", "Files Upload", "Confirm"];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);
    const [location, setLocation] = useState([1]);

    const addToLocation = async (newValue) => {
        setLocation((prevLocation) => [...prevLocation, newValue]);
        if (newValue === 5) {
            await sentClientData(clientInputs);
        }
        currentStep === steps.length
            ? setComplete(true)
            : setCurrentStep((prev) => prev + 1);
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
            const { data } = await uploadProject(clientInputs);
            console.log(data, "-------data sending------------");
            console.log(data.savedProject.ProjectUniqId, "-------data sending------------");
            setUniqueId(data.savedProject.ProjectUniqId);
            handleSubmit(data.savedProject.ProjectUniqId)
        } catch (error) {
            console.error('Error sending data to the backend:', error);
        }
    };
    const handleSubmit = async (ProjectUniqId) => {
        try {
            const formData = new FormData();
            // Iterate over the keys of fileUpload object
            for (const key of Object.keys(fileUpload)) {
                const { name, file } = fileUpload[key];
                // console.log(`Appending file - Key: ${key}, Name: ${name}, Size: ${file.size} bytes`);
                formData.append(key, file, name);
            }
            formData.append('projectName', clientInputs.projectName)
            formData.append('uniqueId', ProjectUniqId)
            console.log(formData, '-------------------formData', ProjectUniqId)
            const { data } = await uploadFiles(formData);
            console.log(data, '----------------upload result')
            toast.success(data.message);
        } catch (error) {
            console.log(error.message, '-------------------error')
            toast.error(error.response?.data?.error || 'Error uploading files');
        }
    };
    return (
        <div className='h-full  p-2  border border-stroke bg-gray-200 px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white sm:px-7.5 xl:pb-1 rounded '>
            <div className="flex items-center p-5">
                {steps?.map((step, i) => (
                    <>
                        <div className="flex items-center relative flex-col justify-center ">
                            <div className={`rounded-full transition flex items-center justify-center duration-500 ease-in-out h-12 w-12 py-3 border-2 border-green-600 text-white bg-boxdark
                                ${currentStep === i + 1 && "bg-sky-600 "} 
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

            {/* <div className="flex items-center p-5 w-full">
                {steps?.map((step, i) => (
                    <div className={`w-full items-center ${i != steps.length - 1 && 'flex'} `} key={i}>
                        <div className="flex items-center relative flex-col justify-center ">
                            <div className={`rounded-full transition flex items-center justify-center duration-500 ease-in-out h-12 w-12 py-3 border-2 border-green-600 text-white bg-boxdark
                                ${currentStep === i + 1 && "bg-sky-600 "} 
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
                    </div>
                ))}
            </div> */}

            <div className='p-2 h-full overflow-hidden duration-700 text-gray-700   dark:text-gray-400'>
                {location.length === 1 ? (
                    <ProjectInfo addToLocation={addToLocation} setClientInputs={setClientInputs} clientInputs={clientInputs} />
                ) : location.length === 2 ? (
                    <ContactDetails addToLocation={addToLocation} removeFromLocation={removeFromLocation} setClientInputs={setClientInputs} clientInputs={clientInputs} />
                ) : location.length === 3 ? (
                    <FileUPload addToLocation={addToLocation} removeFromLocation={removeFromLocation} uniqueId={uniqueId} projectName={clientInputs.projectName} fileUploads={fileUpload} setFileUploads={setFileUpload} />
                )
                    : location.length === 4 ? (
                        <VerifyData addToLocation={addToLocation} removeFromLocation={removeFromLocation} clientInputs={clientInputs} fileUploads={fileUpload} />
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
