import React, { useState } from 'react'

const VerifyData = ({ addToLocation, removeFromLocation, clientInputs, fileUploads }) => {
    console.log(clientInputs, '-------------------clientInputs')
    console.log(fileUploads, '-------------------fileUpload')
    return (
        <div className='rounded mt-5 h-full flex flex-col '>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='md:text-2xl text-lg font-extrabold'>Verify All Data & Files</h1>
                </div>
                <div className="flex items-center justify-between gap-2 px-5 py-4">
                    <button
                        className=" p-2 text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer  hover:bg-gray-200   bg-gray-100  text-gray-700     border duration-200 ease-in-out  border-gray-600 transition"
                        onClick={() => {
                            removeFromLocation(4)
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
                            addToLocation(5)
                        }}
                    >Upload
                    </button>
                </div>
            </div>
            <div className=' h-3/4 overflow-auto p-1 '>
                <p className='text-xl font-bold'>Project & Contact Details</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2 mt-3 p-2'>
                    {Object.keys(clientInputs).map((key) => (
                        <p key={key} className='dark:text-white'>
                            <strong className='dark:text-gray-500'>
                                {key
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ')}:
                            </strong> {clientInputs[key]}
                        </p>
                    ))}
                </div>
                <p className='text-xl font-bold mt-3 '>Files Details</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2 p-2'>
                    {Object.keys(fileUploads).map((category) => (
                        <div key={category}>
                            <strong className=''>{category}:</strong>
                            <p className='dark:text-white'>{fileUploads[category].name}</p>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default VerifyData