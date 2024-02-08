import React, { useState } from 'react';
import { GrLinkNext } from 'react-icons/gr';

const ContactDetails = ({ addToLocation, moveToFurthur, removeFromLocation, clientInputs, setClientInputs }) => {
  const [coordinators, setcoordinators] = useState([{ coordinatorName: '', coordinatorEmail: '', coordinatorNo: '' }])
  // const [coordinators, setCoordinators] = useState([{}]);

  const addCoordinator = () => {
    setcoordinators([...coordinators, { coordinatorName: '', coordinatorEmail: '', coordinatorNo: '' }]);
  };

  const handleCoordinatorChange = (index, field, value) => {
    const updatedCoordinators = [...coordinators];
    updatedCoordinators[index][field] = value;
    setcoordinators(updatedCoordinators);
  };

  return (
    <div className='p-2 mt-5 rounded'>
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

      <div className="grid grid-cols-2 gap-6 p-2 mx-2 my-2 mb-6 overflow-hidden bg-gray-800 rounded md:grid-cols-3">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-white ">Email</label>
          <input
            type="email" id="email"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={clientInputs.email}
            onChange={(e) => setClientInputs({ ...clientInputs, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="mobNum" className="block mb-2 text-sm font-medium text-white ">MOB No</label>
          <input
            type="number" id="mobNum"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={clientInputs.contact}
            onChange={(e) => setClientInputs({ ...clientInputs, contact: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="location" className="block mb-2 text-sm font-medium text-white ">Site Location</label>
          <input
            type="text" id="location"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={clientInputs.siteLocation}
            onChange={(e) => setClientInputs({ ...clientInputs, siteLocation: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="siteAddress" className="block mb-2 text-sm font-medium text-white ">Site Address</label>
          <input
            type="text" id="siteAddress"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={clientInputs.siteAddress}
            onChange={(e) => setClientInputs({ ...clientInputs, siteAddress: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="officeAddress" className="block mb-2 text-sm font-medium text-white ">Office Address</label>
          <input
            type="text" id="officeAddress"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={clientInputs.OfficeAddress}
            onChange={(e) => setClientInputs({ ...clientInputs, OfficeAddress: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="archName" className="block mb-2 text-sm font-medium text-white ">Architecture Name</label>
          <input
            type="text" id="archName"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={clientInputs.architectureName}
            onChange={(e) => setClientInputs({ ...clientInputs, architectureName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="archEmail" className="block mb-2 text-sm font-medium text-white ">Architecture Email</label>
          <input
            type="email" id="archEmail"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={clientInputs.architectureEmail}
            onChange={(e) => setClientInputs({ ...clientInputs, architectureEmail: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="landsName" className="block mb-2 text-sm font-medium text-white ">Landscape Name</label>
          <input
            type="text" id="landsName"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={clientInputs.LandscapeName}
            onChange={(e) => setClientInputs({ ...clientInputs, LandscapeName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="landsName" className="block mb-2 text-sm font-medium text-white ">Landscape Email</label>
          <input
            type="text" id="landsName"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={clientInputs.LandscapeEmail}
            onChange={(e) => setClientInputs({ ...clientInputs, LandscapeEmail: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="landsName" className="block mb-2 text-sm font-medium text-white ">Landscape No</label>
          <input
            type="text" id="landsName"
            className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={clientInputs.LandscapeNo}
            onChange={(e) => setClientInputs({ ...clientInputs, LandscapeNo: e.target.value })}
          />
        </div>
        {coordinators.map((_, index) => (
          <React.Fragment key={index}>
            <div>
              <label htmlFor={`coordinatorName${index}`} className="block mb-2 text-sm font-medium text-white ">Coordinator Name</label>
              <input
                type="text"
                id={`coordinatorName${index}`}
                className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={coordinators[index].coordinatorName || ''}
                onChange={(e) => handleCoordinatorChange(index, 'coordinatorName', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`coordinatorEmail${index}`} className="block mb-2 text-sm font-medium text-white ">Coordinator Email</label>
              <input
                type="text"
                id={`coordinatorEmail${index}`}
                className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={coordinators[index].coordinatorEmail || ''}
                onChange={(e) => handleCoordinatorChange(index, 'coordinatorEmail', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`coordinatorNo${index}`} className="block mb-2 text-sm font-medium text-white ">Coordinator Mob No</label>
              <input
                type="text"
                id={`coordinatorNo${index}`}
                className="bg-gray-50 outline-none border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={coordinators[index].coordinatorNo || ''}
                onChange={(e) => handleCoordinatorChange(index, 'coordinatorNo', e.target.value)}
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

