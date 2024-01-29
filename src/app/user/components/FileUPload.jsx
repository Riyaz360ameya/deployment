import React from 'react'
import { GrLinkNext } from 'react-icons/gr'

const FileUPload = ({ setLocation }) => {
    return (
        <div className='  p-2 rounded mt-5'>
            <div>
                <h1 className='text-2xl font-extrabold text-white '>File Upload</h1>
            </div>
            <div className=' grid place-items-end'>
                <div className='flex gap-4'>
                    <button className='bg-gray-800 px-5 p-2 border rounded text-white font-bold' onClick={() => setLocation(prev => prev - 1)}>
                        <span className='flex items-center justify-between gap-3'><GrLinkNext className='rotate-180' />Back</span>
                    </button>
                    <button className='bg-gray-800 px-5 p-2 rounded border text-white font-bold' onClick={() => setLocation(5)}>
                        <span className='flex items-center justify-between gap-3'>Next<GrLinkNext /></span>
                    </button>
                </div>
            </div>
            <div className=" my-2 mx-2 overflow-hidden bg-gray-800 p-2 rounded w-full border h-80">
                <h1 className='text-white text-center '>Place to upload files</h1>
            </div>

        </div>
    )
}

export default FileUPload