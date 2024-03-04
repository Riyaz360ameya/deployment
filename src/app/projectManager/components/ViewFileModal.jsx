import React, { useEffect, useState } from 'react';
import { PiChatDotsLight } from 'react-icons/pi';
import { pmProjectFiles } from '../pmAPIs/projectApis';
import { useSelector } from 'react-redux';

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

  const fetchData = async () => {
    try {
      const { data } = await pmProjectFiles({ userName, uniqueId, organizationName });
      console.log(data,"files recieved in pm")
      setFilesData(data.files || []);
    } catch (error) {
      console.error('Error fetching files:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      id="container"
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-15 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <PiChatDotsLight className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">View Project Details</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Project details go here...</p>
              {isLoading ? (
                <p>Please wait Files are Loading😊...</p>
              ) : filesData.length > 0 ? (
                <ul>
                  {filesData.map((file, index) => (
                    <div className="flex justify-around" key={index}>
                      <li>{file.fileName}</li>
                      <a href={`data:application/octet-stream;base64,${file.content}`} download={file.fileName}>
                        Download File
                      </a>
                    </div>
                  ))}
                </ul>
              ) : (
                <p>No files available.</p>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
  );
};

export default ViewFileModal;
