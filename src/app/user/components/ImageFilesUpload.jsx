import React,{useState} from 'react';
import { GrLinkNext } from 'react-icons/gr';

const ImageFilesUpload = ({ addToLocation, removeFromLocation, files, setFiles }) => {
    const [complete, setComplete] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const steps = ["Project Info", "Contact Details", "Files Upload", "Payment", "Feedback"];
    const fileInputs = [
        "Material Palette",
        "Exterior draft images",
        "Interior draft images",
        "Aerial Image, Front Building elevation image for all towers",
        "2D Floor Plan (color)",
        "2D Unit plan (color)",
        "2D Unit plan (ISO)",
        "Renders of common areas",
        "Tower Terrace Renders",
        "Club House Terrace Renders",
        "Amenities Images",
        "Master Plan of site (color)",
        "Club house floor plan (2D Color)",
        "Logo of project/Company",
        "Landscape renders",
        "Project Broucher"
    ];

    return (
        <div className='p-2 mt-5 rounded'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-extrabold text-white'>Preview of your files uploaded History</h1>
                </div>
                <div className="flex items-center justify-between gap-2 px-5">
                    {!complete && (
                        <>
                            <button
                                className=" p-2 px-4 rounded text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                hover:bg-gray-200  
                                bg-gray-100 
                               text-gray-700 
                                  border duration-200 ease-in-out 
                             border-gray-600 transition"
                                onClick={() => {
                                    removeFromLocation(2)
                                }}
                            >
                                Back
                            </button>

                            <button
                                className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                hover:bg-teal-600  
                                bg-teal-600 
                                text-teal-100 
                                border duration-200 ease-in-out 
                                border-teal-600 transition"
                                onClick={() => {
                                   addToLocation(3)
                                }}
                            >
                                {currentStep === steps.length ? "Finish" : "Next"}
                            </button>
                        </>
                    )}
                </div>
            </div>
           
        </div>
    );
};

export default ImageFilesUpload;

