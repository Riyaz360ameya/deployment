import React, { useEffect, useState } from 'react';
import { PiChatDotsLight } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { allProjectFiles, dataVerified } from '../devApis/taskApi';
import { developerCompletedProjectsStore, developerNewProjectsStore } from '@/app/redux/developer/developerProSlice';

// const ViewFileModal = ({ userDetails, uniqueId, setviewFiles }) => {
const ViewFileModal = ({ data, setOpenModal }) => {
  const dispatch = useDispatch()
  const [filesData, setFilesData] = useState([]);
  const [formData, setFormData] = useState('')
  const [openInput, setOpenInput] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const userName = data.userId.firstName;
  const organizationName = data.userId.organization;
  const uniqueId = data.projectId.ProjectUniqId
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

  const formSubmit = (e) => {
    e.preventDefault()
    console.log(formData, '---------------formDaa ')
    setFormData('')
    onClose();
  }
  const handleVerified = async (projectId) => {
    const { data } = await dataVerified(projectId)
    console.log(data, '--------------1010')
    console.log(data.upDatedVerifier.newTasks, '--------------456')
    dispatch(developerNewProjectsStore(data.upDatedVerifier.newTasks));
    dispatch(developerCompletedProjectsStore(data.upDatedVerifier.completedTasks))
    onClose();
  }
  return (
    <div
      id="container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white flex w-8/12 h-80 overflow-y-scroll ">
        <div className="w-full px-4 py-4">
          <div className=' flex justify-between items-center p-2'>
            <h3 className="text-base font-semibold leading-6 text-gray-900 ">Files</h3>
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-800 sm:w-auto"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="mt-2">
            {isLoading ? (
              <p>Please wait. Files are loading 😊...</p>
            ) : filesData?.length > 0 ? (
              <div className='d-flex gap-5 '>
                <div className=' flex justify-end gap-2'>
                  <button onClick={() => handleVerified(data.projectId._id)} className='p-2 rounded text-white bg-green-800'>Its Verified</button>
                  <button onClick={() => setOpenInput((prev) => !prev)} className='p-2 rounded text-white bg-red-600'>Need More Data</button>
                </div>
                {
                  openInput ?
                    <form onSubmit={formSubmit} className='flex flex-col items-center justify-center gap-2'>
                      <div className='w-full'>
                        <label htmlFor='fileInput'>Comments:</label>
                        <input
                          id='fileInput'
                          name='fileInput'
                          type="text"
                          placeholder='Enter Your comments'
                          className="bg-gray-50 w-full outline-none border text-gray-900 text-sm rounded-lg border-blue-500 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          required
                          onChange={(e) => setFormData(e.target.value)}
                        />
                      </div>
                      <button type='submit' className='p-2 rounded text-white bg-red-600'>Send Message</button>
                    </form>
                    : ''
                }
                {filesData?.map((file, index) => (
                  <div className="" key={index}>
                    <h2 className='text-lg font-bold'>Data Uploaded: {file.folderName}</h2>
                    <div className='flex flex-col gap-2'>
                      {file.data.map((item, i) => (
                        <div className='bg-slate-700 flex items-center justify-between text-white p-2 rounded' key={i}>
                          <p>{item.fileName}</p>
                          <a className='bg-red-500 text-white font-bold text-center p-2 rounded' href={`data:application/octet-stream;base64,${item.content}`} download={item.fileName}>
                            Download File
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              </div>
            ) : (
              <form onSubmit={formSubmit} className='flex flex-col items-center justify-center gap-2'>
                <p>No files are Present</p>
                <div className='w-full'>
                  <label htmlFor='fileInput'>Comments:</label>
                  <input
                    id='fileInput'
                    name='fileInput'
                    type="text"
                    placeholder='Enter Your comments'
                    className="bg-gray-50 w-full outline-none border text-gray-900 text-sm rounded-lg border-blue-500 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    required
                    onChange={(e) => setFormData(e.target.value)}
                  />
                </div>
                <button type='submit' className='p-2 rounded text-white bg-red-600'>Send Message</button>
              </form>

            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ViewFileModal;
