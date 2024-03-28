import React, { useEffect, useState } from 'react';
import { PiChatDotsLight } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { allProjectFiles, dataVerified } from '../devApis/taskApi';
import { developerNewProjectsStore } from '@/app/redux/developer/developerProSlice';
import { InfinitySpin } from 'react-loader-spinner';

// const ViewFileModal = ({ userDetails, uniqueId, setviewFiles }) => {
const ViewFileModal = ({ data, setOpenModal }) => {
  const user = useSelector((state) => state.developer.developerDetails)
  const devNewTasks = useSelector((state) => state.developerTasks.developerNewTasks);
  const dispatch = useDispatch()
  const [filesData, setFilesData] = useState([]);
  const [formData, setFormData] = useState('')
  const [openInput, setOpenInput] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setloading] = useState(false);
  const [unverified, setunVerified] = useState(false);
  const [files, setfiles] = useState(false);
  const email = user.email;
  const userName = data.userId.firstName;
  const organizationName = data.userId.organization;
  const uniqueId = data.projectId.ProjectUniqId
  const projectId = data.projectId._id
  const onClose = () => {
    setOpenModal(false);
  };

  const handleClose = (e) => {
    if (e.target.id === 'container') {
      onClose();
    }
  };
  const fetchData = async () => {
    try {
      const { data } = await allProjectFiles({ userName, uniqueId, organizationName });
      console.log(data, '---------------------------------datadatadata 5 55')
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

  const formSubmit = async (e) => {
    try {
      setunVerified(true);
      e.preventDefault()
      console.log(formData, '---------------formDaa ')
      const emailResponse = await dataVerified({ projectId, formData, email, emailType: "NOT_VERIFIED" });
      setFormData('')
      onClose();
      setunVerified(false);
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data?.error || 'please re-check the files and upload');
      setunVerified(false);
    }
  }
  const handleVerified = async ({ projectId, email }) => {
    try {
      setloading(true);
      const { data } = await dataVerified({ projectId, email, emailType: "FILES_VERIFIED" })
      console.log(data, '--------------1010')
      console.log(devNewTasks, '--------before-----devNewTasks')
      const updatedNewTasks = devNewTasks.filter(task => task.projectId._id !== projectId);
      console.log(updatedNewTasks, '------after--------456')
      dispatch(developerNewProjectsStore(updatedNewTasks))
      // dispatch(developerCompletedProjectsStore(data.upDatedVerifier.completedTasks))
      toast.success(data.message);
      onClose();
      setloading(false);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error in verifying files');
      setloading(false);
    }
  }
  return (
    <div
      id="container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white flex w-full  h-80 px-5 overflow-y-scroll">
        <div className="w-full px-4 py-4">
          <div className=' flex justify-between items-center p-2'>
            <h3 className="text-base font-semibold leading-6 text-gray-900 ">Files</h3>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300  sm:w-auto"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          {
            unverified ? (
              <>
                <div className='flex items-center justify-center'>
                  <div className='flex items-center justify-center  w-full'>
                    <InfinitySpin width='200' color='black' />
                  </div>
                </div>
              </>
            ) : <div className="mt-2">
              {isLoading ? (
                <p>Please wait. Files are loading 😊...</p>
                
              ) :filesData?.length > 0 ? (
                <div className='d-flex gap-5 '>
                  <div className=' flex justify-end gap-2'>
                    <button onClick={() => handleVerified({ projectId: data.projectId._id, email: email })} className='p-2 rounded text-white bg-green-800'>Its Verified</button>
                    <button onClick={() => setOpenInput((prev) => !prev)} className='p-2 rounded text-white bg-red-600'>Need more Data</button>
                  </div>
                  {
                    openInput ?
                      <form onSubmit={formSubmit} className='flex flex-col items-center justify-center gap-2'>
                        <div className='w-full'>
                          <label htmlFor='fileInput'>Add Comments:</label>
                          <textarea
                            id='fileInput'
                            name='fileInput'
                            type="text"
                            placeholder='Enter Your comments'
                            rows={4}
                            className="bg-gray-50 w-full outline-none border text-gray-900 text-sm rounded-lg border-blue-500 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            required
                            onChange={(e) => setFormData(e.target.value)}
                          />

                        </div>
                        <button type='submit' className='p-2 rounded text-white bg-red-600'>Send Message</button>
                      </form>
                      : ''
                  }
                  {
                    loading ? (
                      <>
                        <div className='flex items-center justify-center'>
                          <div className='flex items-center justify-center  w-full'>
                            <InfinitySpin width='200' color='black' />
                          </div>
                        </div>
                      </>
                    ) :
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
                    
                      
                  }
                </div>
              ) :
              
              (
                <p>No files found</p>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  

  );
};

export default ViewFileModal;
