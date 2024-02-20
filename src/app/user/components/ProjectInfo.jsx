import React from 'react'
import { GrLinkNext } from "react-icons/gr";

const ProjectInfo = ({ addToLocation, setClientInputs, clientInputs }) => {
    const fields = [
        { id: "projectName", label: "Project Name", placeholder: "Project Name" },
        { id: "specification", label: "Specification", placeholder: "Specification" },
        { id: "amenities", label: "Amenities", placeholder: "Amenities" },
        { id: "projectUSP", label: "Project USP", placeholder: "Project USP" },
        { id: "projectDes", label: "Project Description", placeholder: "Project Description" },
    ];
    return (
        <div className='p-2 rounded mt-5'>

            <div className=' flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-extrabold text-white '>Project Info</h1>
                </div>
                <button className='bg-gray-800 px-5 p-2 rounded border text-white font-bold' onClick={() => addToLocation(2)}>
                    <span className='flex items-center justify-between gap-3'>Next<GrLinkNext className='text-white' style={{ color: 'red' }} />
                    
                    </span>
                </button>
            </div>
            <div className="grid gap-6 grid-cols-2 mb-6 md:grid-cols-3 my-2 mx-2 overflow-hidden bg-gray-800 p-2 rounded">
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
            </div>
            <div className='px-5'>
                <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-white ">Project highlight</label>
                <textarea
                    id="projectOverview" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Extent,number of units,club house sqft..."
                    value={clientInputs.projectHighlights}
                    onChange={(e) => setClientInputs({ ...clientInputs, projectHighlights: e.target.value })}
                > </textarea>
            </div>
        </div>
    )
}

export default ProjectInfo