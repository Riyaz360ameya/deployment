
import { pmProjectFiles } from '@/app/projectManager/pmAPIs/projectApis';
import { leadTaskFiles } from '@/app/teamLead/leadAPIs/taskApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner'
import { dataVerified, verifierFiles } from '@/app/developer/devApis/taskApi';

const ViewFilesModal = ({ setViewFiles, projectId }) => {
    const user = useSelector((state) => state.user.userDetails);
    const design = user.designation
    const [filesData, setFilesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [projectDetails, setProjectDetails] = useState()
    const [openInput, setOpenInput] = useState(false)
    const [data, setData] = useState([]);
    const [sort, setSort] = useState('latest');

    const onClose = () => {
        setViewFiles(false);
    };

    const handleClose = (e) => {
        if (e.target.id === 'container') {
            onClose();
        }
    };
    const fetchData = async () => {
        try {
            setIsLoading(true)
            const { data } = design === "Project Manager" ? await pmProjectFiles(projectId)
                : design === "File Verifier" ? await verifierFiles(projectId)
                    : await leadTaskFiles(projectId);
            console.log(data, '---------------------data in files');
            setFilesData(data.files || []);
            console.log(data.projectDetails, '------------------data.projectDetails')
            setProjectDetails(data.projectDetails)
            setIsLoading(false)
        } catch (error) {
            toast.error(error.response.data.error);
            console.error('Error fetching files:', error.message);
        } finally {
            setIsLoading(false);
        }
    };


    const [activeTab, setActiveTab] = useState('info');

    const handleTabClick = (tabId) => {
        console.log(activeTab, '------1---------------old ', tabId)
        setActiveTab(tabId);
        console.log(activeTab, '--------2------------- new')
    };
    // console.log(projectDetails, '--------------projectDetails.ProjectUniqId')

    // Verifier Works

    const handleVerified = async () => {
        try {
            setIsLoading(true)
            const { data } = await dataVerified({ projectId, emailType: "FILES_VERIFIED" })
            console.log(data, '--------------1010')
            console.log(devNewTasks, '--------before-----devNewTasks')
            const updatedNewTasks = devNewTasks.filter(task => task.projectId._id !== projectId);
            console.log(updatedNewTasks, '------after--------456')
            dispatch(developerNewProjectsStore(updatedNewTasks))
            // dispatch(developerCompletedProjectsStore(data.upDatedVerifier.completedTasks))
            toast.success(data.message);
            onClose();
            setIsLoading(false)
        } catch (error) {
            toast.error(error.response?.data?.error || 'Error in verifying files');
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData();
    }, [projectId]);
    return (
        <div
            id="container"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center "
        >
            <div className=" flex rounded">
                <div className="w-full  border  rounded-lg shadow ">
                    <div className='flex justify-between items-center'>
                        <ul className="flex flex-wrap text-sm font-medium text-center  ">
                            <li className="me-2 p-2">
                                <button
                                    onClick={() => handleTabClick('info')}
                                    className={`inline-block p-4 ${activeTab === 'info' ? 'text-blue-600 bg-gray-300 rounded dark:bg-gray-700' : 'hover:text-gray-600'} hover:rounded hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300`}
                                >
                                    Project Information
                                </button>
                            </li>
                            {
                                design === "Project Manager" && design === "File Verifier" &&

                            <li className="me-2 p-2">
                                <button
                                    onClick={() => handleTabClick('contact')}
                                    className={`inline-block p-4 ${activeTab === 'contact' ? 'text-blue-600 bg-gray-300 rounded' : 'hover:text-gray-600'} hover:rounded hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300`}
                                >
                                    Project contact details
                                </button>
                            </li>
                            }
                            <li className="me-2 p-2">
                                <button
                                    onClick={() => handleTabClick('Files')}
                                    className={`inline-block p-4 ${activeTab === 'Files' ? 'text-blue-600 bg-gray-300 rounded' : 'hover:text-gray-600'} hover:rounded hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300`}
                                >
                                    Files
                                </button>
                            </li>
                            <li className="me-2 flex text-center items-center">
                                <div className=' flex justify-end gap-2'>
                                    <button onClick={handleVerified} className='p-2 rounded text-white bg-green-800'>Its Verified</button>
                                    <button onClick={() => setOpenInput((prev) => !prev)} className='p-2 rounded text-white bg-red-600'>Need more Data</button>
                                </div>
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
                    {
                        isLoading ?
                            <div className='flex items-center justify-center'>
                                <InfinitySpin
                                    width='200'
                                    color="black"
                                />
                            </div>
                            :
                            <div id="defaultTabContent">
                                <div className={` bg-white dark:bg-gray-400 rounded-lg md:p-8  ${activeTab === 'info' ? '' : 'hidden'}`}>
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
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{projectDetails?.ProjectUniqId}</dd>
                                                    </div>
                                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Project Name</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{projectDetails?.projectInfo.projectDetails?.projectName}</dd>
                                                    </div>
                                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Project USP</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{projectDetails?.projectInfo.projectDetails?.projectUSP}</dd>
                                                    </div>
                                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Project Verified</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{projectDetails?.projectVerified ? 'Yes' : 'No'}</dd>
                                                    </div>
                                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Specification</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {projectDetails?.projectInfo.projectDetails?.specification}</dd>
                                                    </div>
                                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Project Heighlights</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                            {projectDetails?.projectInfo.projectDetails?.projectHighlights}
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
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {projectDetails?.projectInfo.contactDetails.contact}</dd>
                                                    </div>
                                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Email Id </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {projectDetails?.projectInfo.contactDetails.email}</dd>
                                                    </div>
                                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Office Address </dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {projectDetails?.projectInfo.contactDetails.officeAddress}</dd>
                                                    </div>
                                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Site Address</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {projectDetails?.projectInfo.contactDetails.siteAddress}</dd>
                                                    </div>
                                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Site Location</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {projectDetails?.projectInfo.contactDetails.siteLocation}</dd>
                                                    </div>
                                                    <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Registered Date</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {projectDetails?.projectReachedOn}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {

                                    design === "Project Manager" &&
                                    <div className={`p-4 bg-white dark:bg-gray-400  rounded-lg md:p-8   ${activeTab === 'contact' ? '' : 'hidden'}`}>
                                        <div className='flex'>
                                            <div className="divide-y divide-gray-100">
                                                <div className="px-4 mt-5 sm:px-0">
                                                    <h3 className="text-base font-semibold leading-7 text-gray-900 ">Architecture Contact Details</h3>
                                                </div>
                                                <hr className='text-black' />
                                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Architecture Name</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {projectDetails?.projectInfo.contactDetails.architecture.architectureName}</dd>
                                                </div>
                                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900"> Architecture Email  </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {projectDetails?.projectInfo.contactDetails.architecture.architectureEmail
                                                    }</dd>
                                                </div>
                                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Architecture No </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {projectDetails?.projectInfo.contactDetails.architecture.architectureMobNo}</dd>
                                                </div>
                                                <div className="px-4 mt-5 sm:px-0">
                                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Landscape Contact Details</h3>
                                                </div>
                                                <hr className='' />
                                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Landscape Name</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {projectDetails?.projectInfo.contactDetails.landscape.landscapeName}</dd>
                                                </div>
                                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900"> Landscape Email  </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {projectDetails?.projectInfo.contactDetails.landscape.landscapeEmail
                                                    }</dd>
                                                </div>
                                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Landscape No </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">  {projectDetails?.projectInfo.contactDetails.landscape.landscapeMobNo}</dd>
                                                </div>
                                            </div>
                                            <div className="divide-y divide-gray-100">
                                                <div className="px-4 mt-5 sm:px-0">
                                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Client Details</h3>
                                                </div>
                                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Organization Name</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {projectDetails?.userId.organization}</dd>
                                                </div>
                                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Client Name</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {projectDetails?.userId.firstName}</dd>
                                                </div>
                                                <div className="px-4 mt-5 sm:px-0">
                                                    <h3 className="text-base font-semibold leading-7 text-gray-900"> Coordinators Details</h3>
                                                </div>
                                                <hr className='' />
                                                {projectDetails?.projectInfo.contactDetails.coordinators.map((coordinator, index) => (
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
                                }
                                <div className={`p-4 md:p-8 bg-white dark:bg-gray-400 ${activeTab === 'Files' ? '' : 'hidden'}`}>
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
                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
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
                                                                                <div className='bg-white dark:bg-gray-400 flex items-center justify-between py-1' key={i}>
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
                    }

                </div>
            </div>
        </div>

    );
};

export default ViewFilesModal;



