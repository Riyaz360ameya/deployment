import React from 'react';
import { GrLinkNext } from 'react-icons/gr';

const ImageFilesUpload = ({ addToLocation, removeFromLocation, files, setFiles }) => {
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
            <div className='flex items-center justify-between h:md-80'>
                <div>
                    <h1 className='text-2xl font-extrabold text-white'>Preview of your files uploaded History</h1>
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
                        className='p-2 px-5 font-bold text-white border rounded bg-gray-800'
                        onClick={() => addToLocation(5)}
                    >
                        <span className='flex items-center justify-between gap-3'>Next<GrLinkNext /></span>
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default ImageFilesUpload;

