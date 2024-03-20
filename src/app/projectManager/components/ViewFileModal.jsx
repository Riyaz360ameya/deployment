import React, { useEffect, useState } from 'react';
import { pmProjectFiles } from '../pmAPIs/projectApis';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ViewFileModal = ({ userDetails, uniqueId, setviewFiles, details }) => {
  console.log(details, '-------------------details')
  const [filesData, setFilesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('latest');

  const userName = userDetails.firstName;
  const organizationName = userDetails.organization;

  const onClose = () => {
    setviewFiles(false);
  };

  const handleClose = (e) => {
    if (e.target.id === 'container') {
      onClose();
    }
  };
  const fetchData = async () => {
    try {
      const { data } = await pmProjectFiles({ userName, uniqueId, organizationName });
      console.log(data, '---------------------data in files');
      setFilesData(data.files || []);
    } catch (error) {
      toast.error(error.response.data.error);
      console.error('Error fetching files:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [uniqueId]);

  const [activeTab, setActiveTab] = useState('about');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div
      id="container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center "
    >
      <div className="bg-white flex rounded">
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow ">
          <div className='flex justify-between items-center'>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50  dark:text-gray-400 ">
              <li className="me-2">
                <button
                  onClick={() => handleTabClick('about')}
                  className={`inline-block p-4 ${activeTab === 'about' ? 'text-blue-600' : 'hover:text-gray-600'}  hover:rounded hover:bg-gray-300 dark:hover:bg-gray-700 dark:text-blue-500`}
                >
                  Project Information
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => handleTabClick('services')}
                  className={`inline-block p-4 ${activeTab === 'services' ? 'text-blue-600' : 'hover:text-gray-600'} hover:rounded hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300`}
                >
                  Project contact details
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => handleTabClick('statistics')}
                  className={`inline-block p-4 ${activeTab === 'statistics' ? 'text-blue-600' : 'hover:text-gray-600'} hover:rounded hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300`}
                >
                  Files
                </button>
              </li>
            </ul>
            <div className='p-2'>
              <button
                type="button"
                className="p-2 text-center hover:scale-110 focus:outline-none flex justify-center rounded font-bold cursor-pointer  hover:bg-gray-200   bg-gray-100  text-gray-700  border duration-200 ease-in-out  border-gray-600 transition "
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
          <hr className='border-2 border-red-600' />
          <div id="defaultTabContent">
            <div className={` bg-white rounded-lg md:p-8  ${activeTab === 'about' ? '' : 'hidden'}`}>
              <div className='flex'>
                <div>
                  <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Project Information</h3>
                  </div>
                  <hr />
                  <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Project Id</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details.projectId.ProjectUniqId}</dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Project Name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details.projectId.projectInfo.projectDetails.projectName}</dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Project USP</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details.projectId.projectInfo.projectDetails.projectUSP}</dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Project Verified</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{details.projectVerified ? 'Yes' : 'No'}</dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Specification</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {details.projectId.projectInfo.projectDetails.specification}</dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Project Heighlights</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {details.projectId.projectInfo.projectDetails.projectHighlights}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">Project Contact Details</h3>
                  <hr />
                  <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4  sm:px-0">
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Contact No </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {details.projectId.projectInfo.contactDetails.contact}</dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Email Id </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {details.projectId.projectInfo.contactDetails.email}</dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Office Address </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {details.projectId.projectInfo.contactDetails.officeAddress}</dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Site Address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {details.projectId.projectInfo.contactDetails.siteAddress}</dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Site Location</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {details.projectId.projectInfo.contactDetails.siteLocation}</dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Registered Date</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {details.projectReachedOn}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className={`p-4 bg-white rounded-lg md:p-8   ${activeTab === 'services' ? '' : 'hidden'}`}>
              <div className='flex'>
                <div className="divide-y divide-gray-100">
                  <div className="px-4 mt-5 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900 ">Architecture Contact Details</h3>
                  </div>
                  <hr className='text-black' />
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Architecture Name</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {details.projectId.projectInfo.contactDetails.architecture.architectureName}</dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900"> Architecture Email  </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {details.projectId.projectInfo.contactDetails.architecture.architectureEmail
                    }</dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Architecture No </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {details.projectId.projectInfo.contactDetails.architecture.architectureMobNo}</dd>
                  </div>
                  <div className="px-4 mt-5 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Landscape Contact Details</h3>
                  </div>
                  <hr className='' />
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Landscape Name</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {details.projectId.projectInfo.contactDetails.landscape.landscapeName}</dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900"> Landscape Email  </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {details.projectId.projectInfo.contactDetails.landscape.landscapeEmail
                    }</dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Landscape No </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {details.projectId.projectInfo.contactDetails.landscape.landscapeMobNo}</dd>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  <div className="px-4 mt-5 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Client Details</h3>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Organisation Name</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {details.userId.organization}</dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Client Name</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {details.userId.firstName}</dd>
                  </div>
                  <div className="px-4 mt-5 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900"> Coordinators Details</h3>
                  </div>
                  <hr className='' />
                  {details.projectId.projectInfo.contactDetails.coordinators.map((coordinator, index) => (
                    <div key={index} className="">
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Coordinator Name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {coordinator.coordinatorName}</dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Coordinator Email</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{coordinator.coordinatorEmail}</dd>
                      </div>

                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Coordinator Contact</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{coordinator.coordinatorMobile}</dd>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={`p-4 md:p-8 dark:bg-white ${activeTab === 'statistics' ? '' : 'hidden'}`}>
              <div className="">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Files</h3>
                <div className="mt-2">
                  {isLoading ? (
                    <p>Please wait. Files are loading 😊...</p>
                  ) : filesData?.length > 0 ? (
                    <div className='d-flex gap-5 '>
                      <ol className="relative text-black border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        {filesData
                          ?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                          .map((file, index) => (
                            <li key={index} className="mb-10 ms-6">
                              <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                                <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                              </span>
                              <h3 className="font-medium leading-tight text-black">{file.folderName}</h3>
                              <div className="">
                                <div className='flex justify-between'>
                                  <h2 className='text-lg font-bold text-black'>Data Uploaded: {file.folderName}</h2>
                                </div>
                                <hr />
                                <div className=''>
                                  {file.data.map((item, i) => (
                                    <div className='bg-white flex items-center justify-between py-1' key={i}>
                                      <p className='text-black'>{item.fileName}</p>
                                      <a className='bg-green-400  text-white font-bold text-center p-2 rounded' href={`data:application/octet-stream;base64,${item.content}`} download={item.fileName}>
                                        Download File
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </li>
                          ))}
                      </ol>
                    </div>
                  ) : (
                    <p>No files available.</p>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFileModal;

