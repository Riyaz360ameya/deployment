import React, { useEffect, useState } from 'react';
import { GrLinkNext } from 'react-icons/gr';

const ContactDetails = ({ addToLocation, removeFromLocation, setClientInputs, clientInputs }) => {
    const [coordinators, setCoordinators] = useState([{ coordinatorName: '', coordinatorEmail: '', coordinatorMobile: '' }]);
    const [complete, setComplete] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const steps = ["Project Info", "Contact Details", "Files Upload", "Payment", "Feedback"];

    const addCoordinator = () => {
        setCoordinators([...coordinators, { coordinatorName: '', coordinatorEmail: '', coordinatorMobile: '' }]);
    };

    const removeCoordinator = (index) => {
        if (coordinators.length > 1) {
            const updatedCoordinators = [...coordinators];
            updatedCoordinators.splice(index, 1);
            setCoordinators(updatedCoordinators);
        }
    };

    const sections = [
        {
            title: "",
            fields: [
                { id: "clientName", label: "Name", type: "text" },
                { id: "clientEmail", label: "Email", type: "email" },
                { id: "clientMobileNO", label: "Mob No", type: "number" },
                { id: "clientSiteLocation", label: "Site Location", type: "text" },
                { id: "clientSiteAddress", label: "Site Address", type: "text" },
                { id: "clientOfficeAddress", label: "Office Address", type: "text" },
            ],
        },
        {
            title: "Architecture",
            fields: [
                { id: "architectureName", label: "Name", type: "text" },
                { id: "architectureEmail", label: "Email", type: "email" },
                { id: "architectureMobNo", label: "Mob No", type: "number" },
            ],
        },
        {
            title: "Landscape",
            fields: [
                { id: "landscapeName", label: "Name", type: "text" },
                { id: "landscapeEmail", label: "Email", type: "email" },
                { id: "landscapeMobNo", label: "Mob No", type: "number" },
            ],
        },
        {
            title: "Coordinators",
            fields: [
                { id: "coordinatorName_0", label: "Name", type: "text" },
                { id: "coordinatorEmail_0", label: "Email", type: "text" },
                { id: "coordinatorMobile_0", label: "Mob No", type: "number" },
            ],
        },
    ];

    return (
        <div className='p-2 mt-5 rounded'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-extrabold text-white'>Contact Details</h1>
                </div>

                {/* <div className='flex gap-4'>
                    <button
                        className='p-2 px-5 font-bold text-white bg-gray-800 border rounded'
                        onClick={() => removeFromLocation(2)}
                    >
                        <span className='flex items-center justify-between gap-3'>
                            <GrLinkNext className='rotate-180' /> Back
                        </span>
                    </button>
                    <button
                        className='p-2 px-5 font-bold text-white bg-gray-800 border rounded'
                        onClick={() => addToLocation(3)}
                    >
                        <span className='flex items-center justify-between gap-3'>Next<GrLinkNext /></span>
                    </button>
                </div> */}
                <div className="flex items-center justify-between gap-2 px-5">
                    {!complete && (
                        <>
                            <button
                                className=" p-2 px-4 rounded text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                hover:bg-gray-200  
                                bg-gray-100 
                               text-gray-700 
                                  border duration-200 ease-in-out 
                             border-gray-600 transition"
                                onClick={() => {
                                    removeFromLocation(2)
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
                                    addToLocation(3)
                                }}
                            >
                                {currentStep === steps.length ? "Finish" : "Next"}
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className='h-80 md:h-80  overflow-y-scroll p-3 bg-gray-400 mt-2'>
                {sections.map((section) => {
                    if (section.title !== "Coordinators") {
                        return (
                            <div key={section.title} className="mt-8">
                                <p className="text-white text-2xl font-bold">{section.title}</p>
                                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                                    {section.fields.map((item, i) => (
                                        <div key={item.id}>
                                            <label htmlFor={item.id} className="block mb-2 text-sm font-medium text-white">
                                                {item.label}
                                            </label>
                                            <input
                                                type={item.type}
                                                id={item.id}
                                                value={clientInputs[item.id] || ''}
                                                className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                onChange={(e) => setClientInputs({ ...clientInputs, [item.id]: e.target.value })}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
                <div className='mt-8'>
                    <p className='text-white text-2xl font-bold'>Coordinators</p>
                    {coordinators.map((_, index) => (
                        <React.Fragment key={index}>
                            <div className='grid grid-col-2 md:grid-cols-3 gap-6 mt-5'>
                                <div>
                                    <label htmlFor={`coordinatorName_${index}`} className="block mb-2 text-sm font-medium text-white ">Name</label>
                                    <input
                                        type="text"
                                        id={`coordinatorName_${index}`}
                                        value={clientInputs[`coordinatorName_${index}`] || ''}
                                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        onChange={(e) => setClientInputs({ ...clientInputs, [`coordinatorName_${index}`]: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`coordinatorMobile_${index}`} className="block mb-2 text-sm font-medium text-white ">Mob No</label>
                                    <input
                                        type="number"
                                        id={`coordinatorMobile_${index}`}
                                        value={clientInputs[`coordinatorMobile_${index}`] || ''}
                                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        onChange={(e) => setClientInputs({ ...clientInputs, [`coordinatorMobile_${index}`]: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`coordinatorEmail_${index}`} className="block mb-2 text-sm font-medium text-white ">Email</label>
                                    <input
                                        type="email"
                                        id={`coordinatorEmail_${index}`}
                                        value={clientInputs[`coordinatorEmail_${index}`] || ''}
                                        className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        onChange={(e) => setClientInputs({ ...clientInputs, [`coordinatorEmail_${index}`]: e.target.value })}
                                    />
                                </div>
                            </div>
                        </React.Fragment>

                    ))}
                </div>
                <div className='flex justify-between mt-5'>
                    {/* <button className='p-2 px-5 font-bold text-center text-white bg-gray-800 border rounded' onClick={addCoordinator}>
                        <span className='flex items-center justify-between gap-3'>Add more coordinators </span>
                    </button> */}

                    {/* <button className='p-2 px-5 font-bold text-center text-white bg-gray-800 border rounded' onClick={() => removeCoordinator(coordinators.length - 1)}>
                        <span className='flex items-center justify-between gap-3'>Remove coordinators </span>
                    </button> */}
                    <button
                        className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                hover:bg-teal-600  
                                bg-teal-600 
                                text-teal-100 
                                border duration-200 ease-in-out 
                                border-teal-600 transition"
                        onClick={addCoordinator}
                    >
                        Add more coordinators
                    </button>
                    <button
                        className=" p-2 px-4 rounded text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                                hover:bg-gray-200  
                                bg-gray-100 
                               text-gray-700 
                                  border duration-200 ease-in-out 
                             border-gray-600 transition"
                        onClick={() => removeCoordinator(coordinators.length - 1)}
                    >
                        Remove coordinators
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
