import React, { useEffect, useState } from 'react';
import { PiChatDotsLight } from 'react-icons/pi';
import { pmAllProjects, pmProjectFiles } from '../pmAPIs/projectApis';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ViewFileModal = ({ userDetails, uniqueId, setviewFiles }) => {
  const [filesData, setFilesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const getAllPmProjects = async () => {
    try {
      const { data } = await pmAllProjects()
      console.log(data, "-----------------pm view data")
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  }
  const fetchData = async () => {
    try {
      const { data } = await pmProjectFiles({ userName, uniqueId, organizationName });
      console.log(data, '---------------------data in files')
      setFilesData(data.files || []);
      // console.log(data)
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

  return (
    <div
      id="container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white flex h-full w-full overflow-y-scroll ">
        <div className="w-3/4 px-4 py-4">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Files</h3>
          <div className="mt-2">
            {isLoading ? (
              <p>Please wait. Files are loading 😊...</p>
            ) : filesData?.length > 0 ? (
              <div className='d-flex gap-5 '>
                {filesData?.map((file, index) => (
                  <div className="" key={index}>
                    <h2 className='text-lg font-bold'>Data Uploaded: {file.folderName}</h2>
                    <div className=''>
                      {file.data.map((item, i) => (
                        <div className='bg-slate-700 flex items-center justify-between' key={i}>
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
              <p>No files available.</p>
            )}
          </div>
        </div>

        <div className="w-1/4 bg-gray-50 px-4 py-4 sm:flex sm:flex-col sm:items-start">
          <h3 className="text-base font-semibold leading-6 text-gray-900">View Project Details</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Project details go here...</p>
          </div>
          <div className="mt-3 text-center sm:text-left ">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ViewFileModal;
