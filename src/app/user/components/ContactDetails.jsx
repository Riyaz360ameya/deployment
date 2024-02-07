// import React from 'react'
// import { GrLinkNext } from 'react-icons/gr'

// const ContactDetails = ({ setLocation }) => {
//     const [coordinators, setCoordinators] = useState([{}]);

//     const addCoordinator = () => {
//       setCoordinators([...coordinators, {}]);
//     };


//     return (
//         <div className='p-2 mt-5 rounded '>
//             <div>
//                 <h1 className='text-2xl font-extrabold text-white'>Contact Details</h1>
//             </div>
//             <div className='grid place-items-end'>
//             <div className='flex gap-4'>
//                     <button className='p-2 px-5 font-bold text-white bg-gray-800 border rounded' onClick={() => setLocation(prev => prev - 1)}>
//                         <span className='flex items-center justify-between gap-3'><GrLinkNext color='white' className='text-white rotate-180' />Back</span>
//                     </button>
//                     <button className='p-2 px-5 font-bold text-white bg-gray-800 border rounded' onClick={() => setLocation(4)}>
//                         <span className='flex items-center justify-between gap-3'>Next<GrLinkNext color='white' /></span>
//                     </button>
//                 </div>
//             </div>
//             <div className="grid grid-cols-2 gap-6 p-2 mx-2 my-2 mb-6 overflow-hidden bg-gray-800 rounded md:grid-cols-3">
//                 <div>
//                     <label htmlFor="email" className="block mb-2 text-sm font-medium text-white ">Email</label>
//                     <input
//                         type="email" id="email"
//                         className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="mobNum" className="block mb-2 text-sm font-medium text-white ">MOB No</label>
//                     <input
//                         type="number" id="mobNum"
//                         className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="location" className="block mb-2 text-sm font-medium text-white ">Site Location</label>
//                     <input
//                         type="text" id="location"
//                         className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="location" className="block mb-2 text-sm font-medium text-white ">office Location</label>
//                     <input
//                         type="text" id="location"
//                         className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="officeAddress" className="block mb-2 text-sm font-medium text-white ">Office Address</label>
//                     <input
//                         type="text" id="location"
//                         className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="archName" className="block mb-2 text-sm font-medium text-white ">Architecture Name</label>
//                     <input
//                         type="text" id="archName"
//                         className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="archEmail" className="block mb-2 text-sm font-medium text-white ">Architecture Email</label>
//                     <input
//                         type="email" id="archEmail"
//                         className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="landsName" className="block mb-2 text-sm font-medium text-white ">Landscape Name</label>
//                     <input
//                         type="text" id="landsName"
//                         className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="archEmail" className="block mb-2 text-sm font-medium text-white ">Architecture Email</label>
//                     <input
//                         type="email" id="archEmail"
//                         className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
//                     />
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default ContactDetails

import React, { useState } from 'react';
import { GrLinkNext } from 'react-icons/gr';

const ContactDetails = ({ addToLocation, removeFromLocation }) => {
  const [coordinators, setCoordinators] = useState([{}]);

  const addCoordinator = () => {
    setCoordinators([...coordinators, {}]);
  };

  return (
    <div className='p-2 mt-5 rounded'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-extrabold text-white'>Contact Details</h1>        </div>
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
      
      
      <div className="grid grid-cols-2 gap-6 p-2 mx-2 my-2 mb-6 overflow-hidden bg-gray-800 rounded md:grid-cols-3">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-white ">Email</label>
          <input
            type="email" id="email"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label htmlFor="mobNum" className="block mb-2 text-sm font-medium text-white ">MOB No</label>
          <input
            type="number" id="mobNum"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label htmlFor="location" className="block mb-2 text-sm font-medium text-white ">Site Location</label>
          <input
            type="text" id="location"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label htmlFor="siteAddress" className="block mb-2 text-sm font-medium text-white ">Site Address</label>
          <input
            type="text" id="siteAddress"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label htmlFor="officeAddress" className="block mb-2 text-sm font-medium text-white ">Office Address</label>
          <input
            type="text" id="officeAddress"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label htmlFor="archName" className="block mb-2 text-sm font-medium text-white ">Architecture Name</label>
          <input
            type="text" id="archName"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label htmlFor="archEmail" className="block mb-2 text-sm font-medium text-white ">Architecture Email</label>
          <input
            type="email" id="archEmail"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label htmlFor="landsName" className="block mb-2 text-sm font-medium text-white ">Landscape Name</label>
          <input
            type="text" id="landsName"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        {coordinators.map((_, index) => (
          <React.Fragment key={index}>
            <div>
              <label htmlFor={`coordinatorName${index}`} className="block mb-2 text-sm font-medium text-white ">coordinators Name</label>
              <input
                type="text"
                id={`coordinatorName${index}`}
                className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor={`coordinatorMobile${index}`} className="block mb-2 text-sm font-medium text-white ">coordinators Mob No</label>
              <input
                type="text"
                id={`coordinatorMobile${index}`}
                className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor={`coordinatorEmail${index}`} className="block mb-2 text-sm font-medium text-white ">coordinators Email</label>
              <input
                type="text"
                id={`coordinatorEmail${index}`}
                className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className='px-4'>
        <button className='p-2 px-5 font-bold text-center text-white bg-gray-800 border rounded' onClick={addCoordinator}>
          <span className='flex items-center justify-between gap-3'>Add more coordinators </span>
        </button>
      </div>
    </div>
  );
};

export default ContactDetails;
