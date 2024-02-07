import React from 'react';
import { GrLinkNext } from 'react-icons/gr';

const FileUpload = ({ addToLocation, removeFromLocation }) => {
    // Data for file inputs
    const fileInputs = [
        '3DsMax - Building',
        '3DsMax - Landscape & Textures',
        '3DsMax - Terrace',
        '3DsMax - Entry/Exit gate',
        'CAD Floor plans (dwg)',
        'CAD Elevation (dwg)',
        'CAD Section (dwg)',
        'Club House CAD Elevation (dwg)',
        'Club House CAD Section (dwg)',
        'Club house floor plans CAD (dwg)',
        'Tower Terrace Cad (dwg)',
        'Landscape (Dwg)',
    ];

    return (
        <div className='p-2 mt-5 rounded'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-extrabold text-white '>Upload your Cad Files...</h1>
                </div>
                <div className='flex gap-4'>
                    <button
                        className='p-2 px-5 font-bold text-white bg-gray-800 border rounded'
                        onClick={() => removeFromLocation(3)}
                    >
                        <span className='flex items-center justify-between gap-3'>
                            <GrLinkNext className='rotate-180' />
                            Back
                        </span>
                    </button>
                    <button
                        className='p-2 px-5 font-bold text-white border rounded bg-slate-500'
                        onClick={() => addToLocation(4)}
                    >
                        <span className='flex items-center justify-between gap-3'>Next<GrLinkNext /></span>
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-6 p-2 mx-2 my-2 mb-6 overflow-hidden bg-gray-800 rounded md:grid-cols-3'>
                {fileInputs.map((label, index) => (
                    <div key={index}>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor={`fileInput_${index}`}>
                            {label}
                        </label>
                        <input
                            className='block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                            id={`fileInput_${index}`}
                            type='file'
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
