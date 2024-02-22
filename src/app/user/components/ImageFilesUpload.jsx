import React from 'react';
import { GrLinkNext } from 'react-icons/gr';

const ImageFilesUpload = ({ addToLocation, removeFromLocation, files, setFiles }) => {
   
    return (
        <div className='p-2 mt-5 rounded'>
            <div className='flex items-center justify-between'>
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
            {/* <div className='h-full md:h-80  overflow-y-scroll p-3'> */}
           <div>
            {/* <h1>Files</h1> */}
           </div>
        </div>
    );
};

export default ImageFilesUpload;

