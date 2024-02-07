import React from 'react'
import { GrLinkNext } from "react-icons/gr";

const ProjectInfo = ({ addToLocation }) => {
    return (
        <div className='p-2 mt-5 rounded'>

            <div className='flex items-center justify-between '>
                <div>
                    <h1 className='text-2xl font-extrabold text-white '>Project Info</h1>
                </div>
                <button className='p-2 px-5 font-bold text-white bg-gray-800 border rounded' onClick={() => addToLocation(2)}>
                    <span className='flex items-center justify-between gap-3'>Next<GrLinkNext color='' /></span>
                </button>
            </div>
            <div className="grid grid-cols-2 gap-6 p-2 mx-2 my-2 mb-6 overflow-hidden bg-gray-800 rounded md:grid-cols-3">
                <div>
                    <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-white ">Project Name</label>
                    <input
                        type="text" id="projectName"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        placeholder="Project Name"
                    />
                </div>

                <div>
                    <label htmlFor="projectType" className="block mb-2 text-sm font-medium text-white ">Project Type </label>
                    <select
                        name='projectType'
                        id='projectType'
                        className='w-full p-2 bg-gray-200 border border-gray-400 rounded-md outline-none'
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
                    <label htmlFor="projectUSP" className="block mb-2 text-sm font-medium text-white ">Project USP</label>
                    <input
                        type="text" id="projectUSP"
                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        placeholder="Project USP"
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

export default ProjectInfo