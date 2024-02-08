import React from 'react';
import { GrLinkNext } from 'react-icons/gr';

const ImageFilesUpload = ({ addToLocation, removeFromLocation, files, setFiles }) => {
    const fileInputs = [
        'Exterior draft images',
        'Interior draft images',
        'Aerial Image, Front Building elevation image for all towers',
        '2D Floor Plan (color)',
        '2D Unit plan (color)',
        '2D Unit plan (ISO)',
        'Renders of common areas',
        'Tower Terrace Renders',
        'Club House Terrace Renders',
        'Amenities Images',
        'Master Plan of site (color)',
        'Club house floor plan (2D Color)',
        'Logo of project/Company',
        'Landscape renders',
        'Project Broucher',
    ];

    const handleFileChange = async (e, inputLabel) => {
        const selectedFile = e.target.files[0];
        
        // Read the file content using FileReader
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target.result;
            
            setFiles((prevFiles) => ({
                ...prevFiles,
                [inputLabel]: fileContent,
            }));
        };
        reader.readAsText(selectedFile);
    };

    return (
        <div className='p-2 mt-5 rounded'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-extrabold text-white'>Upload your Image Files.......</h1>
                </div>
                <div className='flex gap-4'>
                    <button
                        className='p-2 px-5 font-bold text-white bg-gray-800 border rounded'
                        onClick={() => removeFromLocation(4)}
                    >
                        <span className='flex items-center justify-between gap-3'>
                            <GrLinkNext className='rotate-180' />
                            Back
                        </span>
                    </button>
                    <button
                        className='p-2 px-5 font-bold text-white border rounded bg-slate-500'
                        onClick={() => addToLocation(5)}
                    >
                        <span className='flex items-center justify-between gap-3'>Submit</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 p-2 mx-2 my-2 mb-6 overflow-hidden bg-gray-800 rounded md:grid-cols-3">
                {fileInputs.map((label, index) => (
                    <div key={index}>
                        <label className="block mb-2 text-white text-sm font-medium text-gray-900 dark:text-white" htmlFor={label}>
                            {label}
                        </label>
                        <input
                            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id={label}
                            type="file"
                            onChange={(e) => handleFileChange(e, label)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageFilesUpload;

