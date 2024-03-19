import React, { useState } from 'react'

const VerifyData = ({ addToLocation, removeFromLocation }) => {
    const [complete, setComplete] = useState(false);
    return (
        <div className='rounded mt-5 h-full flex flex-col '>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='md:text-2xl text-lg font-extrabold text-white'>Verify All Files</h1>
                </div>
                <div className="flex items-center justify-between gap-2 px-5">
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
                    >Next
                    </button>
                </div>
            </div>

        </div>
    )
}

export default VerifyData