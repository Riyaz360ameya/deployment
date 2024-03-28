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
        <div className='rounded mt-5 h-full flex flex-col '>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='md:text-2xl text-lg font-extrabold'>Contact Details</h1>
                </div>
                <div className="flex items-center justify-between gap-2 px-5">
                    <button
                        className=" p-2 text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer  hover:bg-gray-200   bg-gray-100  text-gray-700     border duration-200 ease-in-out  border-gray-600 transition"
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
                    >Next
                    </button>
                </div>
            </div>
            <div className='h-96 md:h-96 overflow-x-hidden  overflow-y-scroll p-3  mt-2 rounded'>
                {sections.map((section) => {
                    if (section.title !== "Coordinators") {
                        return (
                            <div key={section.title} className="mt-4">
                                <p className=" text-2xl font-bold">{section.title}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3">
                                    {section.fields.map((item, i) => (
                                        <div key={item.id}>
                                            <label htmlFor={item.id} className="block mb-2 text-sm font-medium">
                                                {item.label}
                                            </label>
                                            <input
                                                type={item.type}
                                                id={item.id}
                                                value={clientInputs[item.id] || ''}
                                                className="bg-gray-50 outline-none border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => setClientInputs({ ...clientInputs, [item.id]: e.target.value })}
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
                    <p className=' md:text-2xl text-lg  font-bold'>Coordinators</p>
                    {coordinators.map((_, index) => (
                        <React.Fragment key={index}>
                            <div className='grid grid-col-2 md:grid-cols-3 gap-6 mt-5'>
                                <div>
                                    <label htmlFor={`coordinatorName_${index}`} className="block mb-2 text-sm font-medium ">Name</label>
                                    <input
                                        type="text"
                                        id={`coordinatorName_${index}`}
                                        value={clientInputs[`coordinatorName_${index}`] || ''}
                                        className="bg-gray-50 outline-none border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"                                        onChange={(e) => setClientInputs({ ...clientInputs, [`coordinatorName_${index}`]: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`coordinatorMobile_${index}`} className="block mb-2 text-sm font-medium ">Mob No</label>
                                    <input
                                        type="number"
                                        id={`coordinatorMobile_${index}`}
                                        value={clientInputs[`coordinatorMobile_${index}`] || ''}
                                        className="bg-gray-50 outline-none border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"                                        onChange={(e) => setClientInputs({ ...clientInputs, [`coordinatorMobile_${index}`]: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`coordinatorEmail_${index}`} className="block mb-2 text-sm font-medium ">Email</label>
                                    <input
                                        type="email"
                                        id={`coordinatorEmail_${index}`}
                                        value={clientInputs[`coordinatorEmail_${index}`] || ''}
                                        className="bg-gray-50 outline-none border border-gray-200  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"                                        onChange={(e) => setClientInputs({ ...clientInputs, [`coordinatorEmail_${index}`]: e.target.value })}
                                    />
                                </div>
                            </div>
                        </React.Fragment>

                    ))}
                </div>
                <div className='flex justify-between gap-6 mt-5'>
                    <button
                        className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer  hover:bg-teal-600   bg-teal-600  text-teal-100  border duration-200 ease-in-out  border-teal-600 transition"
                        onClick={addCoordinator}
                    >
                        Add more coordinators
                    </button>
                    <button
                        className=" p-2 text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer    hover:bg-gray-200     bg-gray-100   text-gray-700      border duration-200 ease-in-out  border-gray-600 transition"
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
