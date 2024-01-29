import React from 'react'
import { GrLinkNext } from 'react-icons/gr'

const ContactDetails = ({ setLocation }) => {
    return (
        <div className=' p-2 rounded mt-5'>
            <div>
                <h1 className='text-2xl font-extrabold text-white'>Contact Details</h1>
            </div>
            <div className=' grid place-items-end'>
            <div className='flex gap-4'>
                    <button className='bg-gray-800 px-5 p-2 border rounded text-white font-bold' onClick={() => setLocation(prev => prev - 1)}>
                        <span className='flex items-center justify-between gap-3'><GrLinkNext color='white' className='rotate-180 text-white' />Back</span>
                    </button>
                    <button className='bg-gray-800 px-5 p-2 rounded border text-white font-bold' onClick={() => setLocation(4)}>
                        <span className='flex items-center justify-between gap-3'>Next<GrLinkNext color='white' /></span>
                    </button>
                </div>
            </div>
            <div className="grid gap-6 grid-cols-2 mb-6 md:grid-cols-3 my-2 mx-2 overflow-hidden bg-gray-800 p-2 rounded">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white ">Email</label>
                    <input
                        type="email" id="email"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    />
                </div>
                <div>
                    <label htmlFor="mobNum" className="block mb-2 text-sm font-medium text-white ">MOB No</label>
                    <input
                        type="number" id="mobNum"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-white ">Location</label>
                    <input
                        type="text" id="location"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    />
                </div>
                <div>
                    <label htmlFor="siteAddress" className="block mb-2 text-sm font-medium text-white ">Site Address</label>
                    <textarea
                        type="text" id="siteAddress"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        placeholder="Project Description"
                    />
                </div>
                <div>
                    <label htmlFor="officeAddress" className="block mb-2 text-sm font-medium text-white ">Office Address</label>
                    <textarea
                        type="text" id="officeAddress"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    />
                </div>
                <div>
                    <label htmlFor="archName" className="block mb-2 text-sm font-medium text-white ">Architecture Name</label>
                    <input
                        type="text" id="archName"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    />
                </div>
                <div>
                    <label htmlFor="archEmail" className="block mb-2 text-sm font-medium text-white ">Architecture Email</label>
                    <input
                        type="email" id="archEmail"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    />
                </div>
                <div>
                    <label htmlFor="landsName" className="block mb-2 text-sm font-medium text-white ">Landscape Name</label>
                    <input
                        type="text" id="landsName"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    />
                </div>
                <div>
                    <label htmlFor="archEmail" className="block mb-2 text-sm font-medium text-white ">Architecture Email</label>
                    <input
                        type="email" id="archEmail"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    />
                </div>
            </div>

        </div>
    )
}

export default ContactDetails