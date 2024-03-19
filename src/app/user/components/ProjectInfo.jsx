import React, { useState } from 'react'
import { GrLinkNext } from "react-icons/gr";

const ProjectInfo = ({ removeFromLocation, addToLocation, setClientInputs, clientInputs }) => {
    const fields = [
        { id: "projectName", label: "Project Name", placeholder: "Project Name" },
        { id: "specification", label: "Specification", placeholder: "Specification" },
        // { id: "amenities", label: "Amenities", placeholder: "Amenities" },
        { id: "projectUSP", label: "Project USP", placeholder: "Project USP" },
        { id: "projectDes", label: "Project Description", placeholder: "Project Description" },
    ];
    const [complete, setComplete] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const steps = ["Project Info", "Contact Details", "Files Upload", "Payment", "Feedback"];

    return (
        <div className='rounded mt-5 h-full flex flex-col '>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='md:text-2xl text-lg font-extrabold text-white'>Project Info</h1>
                </div>
                <div className="flex items-center justify-between gap-2 px-5">
                    <button
                        className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                hover:bg-teal-600  
                                bg-teal-600 
                                text-teal-100 
                                border duration-200 ease-in-out 
                                border-teal-600 transition"
                        onClick={() => {
                            addToLocation(2)
                        }}
                    >Next
                    </button>
                </div>
            </div>
            <div className='p-3 bg-gray-400 mt-2 flex flex-col rounded'>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 mb-6 md:grid-cols-3 my-2 mx-2 bg-gray-400 p-2 rounded">
                    <>
                        {fields.map((field) => (
                            <div key={field.id}>
                                <label htmlFor={field.id} className="block mb-2 text-sm font-medium text-white">
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    id={field.id}
                                    className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder={field.placeholder}
                                    value={clientInputs[field.id]}
                                    onChange={(e) => setClientInputs({ ...clientInputs, [field.id]: e.target.value })}
                                />
                            </div>
                        ))}
                    </>
                    <div>
                        <label htmlFor="projectType" className="block mb-2 text-sm font-medium text-white ">Project Type </label>
                        <select
                            name='projectType'
                            id='projectType'
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            value={clientInputs.projectType}
                            onChange={(e) => setClientInputs({ ...clientInputs, projectType: e.target.value })}
                        >
                            <option value="Choose Project Type" className="uppercase" disabled >
                                Choose Type
                            </option>
                            <option value="Apartment" className="uppercase" defaultValue>
                                Apartment
                            </option>
                            <option value="Villa" className="uppercase">
                                Villa
                            </option>
                            <option value="Plotting" className="uppercase">
                                Plotting
                            </option>
                            <option value="Commercial" className="uppercase">
                                Commercial
                            </option>
                            <option value="Other" className="uppercase">
                                Other
                            </option>
                        </select>
                    </div>
                </div>
                <div className='px-5'>
                    <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-white ">Project highlight</label>
                    <textarea
                        id="projectOverview" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Extent,number of units,club house sqft..."
                        value={clientInputs.projectHighlights}
                        onChange={(e) => setClientInputs({ ...clientInputs, projectHighlights: e.target.value })}
                    > </textarea>
                </div>
            </div>
        </div>
    )
}

export default ProjectInfo