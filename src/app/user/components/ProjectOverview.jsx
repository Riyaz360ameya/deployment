import React from 'react'
import { GrLinkNext } from 'react-icons/gr'

const ProjectOverview = ({ setLocation }) => {
    return (
        <div className='p-2 rounded mt-5'>
            <div>
                <h1 className='text-2xl font-extrabold text-white '>Project Overview</h1>
            </div>
            <div className=' grid place-items-end'>
                <div className='flex gap-4'>
                    <button className='bg-gray-800 px-5 p-2 border rounded text-white font-bold' onClick={() => setLocation(prev => prev - 1)}>
                        <span className='flex items-center justify-between gap-3'><GrLinkNext className='rotate-180' />Back</span>
                    </button>
                    <button className='bg-gray-800 px-5 p-2 rounded border text-white font-bold' onClick={() => setLocation(3)}>
                        <span className='flex items-center justify-between gap-3'>Next<GrLinkNext /></span>
                    </button>
                </div>
            </div>
            <div className="grid gap-6 grid-cols-2 mb-6 md:grid-cols-3 my-2 mx-2 overflow-hidden bg-gray-800 p-2 rounded">
                <div>
                    <label htmlFor="specification" className="block mb-2 text-sm font-medium text-white ">Specification</label>
                    <input
                        type="text" id="specification"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        placeholder="Specification"
                    />
                </div>
                <div>
                    <label htmlFor="amenities" className="block mb-2 text-sm font-medium text-white ">Amenities</label>
                    <input
                        type="text" id="amenities"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        placeholder="Amenities"
                    />
                </div>
                <div>
                    <label htmlFor="projectDes" className="block mb-2 text-sm font-medium text-white ">Project Description</label>
                    <input
                        type="text" id="projectDes"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        placeholder="Project Description"
                    />
                </div>

            </div>

        </div>
    )
}

export default ProjectOverview