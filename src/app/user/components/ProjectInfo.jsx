import React from 'react'
import { GrLinkNext } from "react-icons/gr";

const ProjectInfo = ({ setLocation }) => {
    return (
        <div className='p-2 rounded mt-5'>
            <div>
                <h1 className='text-2xl font-extrabold text-white '>Project Info</h1>
            </div>
            <div className=' grid place-items-end'>
                <button className='bg-gray-800 px-5 p-2 rounded border text-white font-bold' onClick={() => setLocation(2)}>
                    <span className='flex items-center justify-between gap-3'>Next<GrLinkNext /></span>
                </button>
            </div>
            <div className="grid gap-6 grid-cols-2 mb-6 md:grid-cols-3 my-2 mx-2 overflow-hidden bg-gray-800 p-2 rounded">
                <div>
                    <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-white ">Project name</label>
                    <input
                        type="text" id="projectName"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        placeholder="Project Name"
                    />
                </div>
                <div>
                    <label htmlFor="projectUSP" className="block mb-2 text-sm font-medium text-white ">Project USP</label>
                    <input
                        type="text" id="projectUSP"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        placeholder="Project USP"
                    />
                </div>
                <div>
                    <label htmlFor="projectType" className="block mb-2 text-sm font-medium text-white ">Project Type </label>
                    <select
                        name='projectType'
                        id='projectType'
                        className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                    >
                        <option value="Choose Project Type" className="uppercase" disabled >
                            Choose Type
                        </option>
                        <option value="REGULAR" className="uppercase" defaultValue>
                            Apartment
                        </option>
                        <option value="MEDIUM" className="uppercase">
                            Villa
                        </option>
                        <option value="URGENT" className="uppercase">
                            Plotting
                        </option>
                        <option value="URGENT" className="uppercase">
                            Commercial
                        </option>
                        <option value="URGENT" className="uppercase">
                            Other
                        </option>
                    </select>
                </div>
                <div>
                    <label htmlFor="deliveryDate" className="block mb-2 text-sm font-medium text-white ">Estimated Delivery Date</label>
                    <input
                        type="date" id="deliveryDate"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                    />
                </div>
            </div>

        </div>
    )
}

export default ProjectInfo