import React, { useState } from 'react';
import { GrLinkNext } from 'react-icons/gr';

const ContactDetails = ({ addToLocation, removeFromLocation, setClientInputs, clientInputs }) => {
    const [coordinators, setCoordinators] = useState([{ coordinatorName: '', coordinatorEmail: '', coordinatorMobile: '' }]);

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
                { id: "coordinatorName", label: "Name", type: "text" },
                { id: "coordinatorEmail", label: "Email", type: "text" },
                { id: "coordinatorMobile", label: "Mob No", type: "number" },
            ],
        },
    ];

    return (
        <div className=' mt-5 rounded'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-extrabold text-white'>Contact Details</h1>
                </div>

                <div className='flex gap-4'>
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
                </div>
            </div>
            <div className='h-80 md:h-80  overflow-y-scroll p-3 bg-slate-800'>
                {sections.map((section) => (
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
                ))}
                <div className='mt-8'>
                    <p className='text-white text-2xl font-bold'>Coordinators</p>

                    {coordinators.map((_, index) => (
                        <React.Fragment key={index}>
                            <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-5'>
                                {sections.find(s => s.title === "Coordinators")?.fields.map((item, i) => (
                                    <div key={item.id}>
                                        <label htmlFor={`${item.id}_${index}`} className="block mb-2 text-sm font-medium text-white ">
                                            {item.label}
                                        </label>
                                        <input
                                            type={item.type}
                                            id={`${item.id}_${index}`}
                                            value={coordinators[index][item.id] || ''}
                                            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            onChange={(e) => {
                                                const updatedCoordinators = [...coordinators];
                                                updatedCoordinators[index] = {
                                                    ...updatedCoordinators[index],
                                                    [item.id]: e.target.value,
                                                };
                                                setCoordinators(updatedCoordinators);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className='flex justify-between mt-5'>
                    <button className='p-2 px-5 font-bold text-center text-white bg-gray-800 border rounded' onClick={addCoordinator}>
                        <span className='flex items-center justify-between gap-3'>Add more coordinators </span>
                    </button>
                    <button className='p-2 px-5 font-bold text-center text-white bg-gray-800 border rounded' onClick={() => removeCoordinator(coordinators.length - 1)}>
                        <span className='flex items-center justify-between gap-3'>Remove coordinators </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
