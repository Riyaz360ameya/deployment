import React, { useState, useRef } from 'react';
import { GrLinkNext } from 'react-icons/gr';
import axios from 'axios';
import { toast } from 'react-toastify';

const FileUpload = ({ addToLocation, removeFromLocation, projectId, projectName,}) => {
  const inputFileRefs = Array.from({ length: 28 }, () => useRef(null));
  const [files, setFiles] = useState(Array.from({ length: 28 }, () => null));
  const [uploadStatus, setUploadStatus] = useState(false);
  const [loading, setloading] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleFileChange = (index, e) => {
    const selectedFile = e.target.files[0];
    const updatedFiles = [...files];
    updatedFiles[index] = { file: selectedFile, projectId, projectName };
    setFiles(updatedFiles);
  };

 
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setloading(true);
      const formData = new FormData();
  
      files.forEach((fileData, index) => {
        if (fileData) {
          formData.append(`file[]`, fileData.file);
          formData.append(`projectId[]`, fileData.projectId);
          formData.append(`projectName[]`, fileData.projectName);
        }
      });
  
      const {data} = await axios.post('/api/upload', formData);
  
      inputFileRefs.forEach((ref) => (ref.current.value = ''));
      setFiles(Array.from({ length: 28 }, () => null));
  
      // Check if the request was successful
      if (data.success) {
        setUploadStatus(true);
        toast.success(data.message);
      } else {
        toast.error('Failed to upload files');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error uploading files');
    } finally {
      setloading(false);
    }
  };
  
  const fileInputs = [
    '3DsMax - Building',
    '3DsMax - Landscape & Textures',
    '3DsMax - Terrace',
    '3DsMax - Entry/Exit gate',
    'CAD Floor plans (dwg)',
    'CAD Elevation (dwg)',
    'CAD Section (dwg)',
    'Club House CAD Elevation (dwg)',
    'Club House CAD Section (dwg)',
    'Club house floor plans CAD (dwg)',
    'Tower Terrace Cad (dwg)',
    'Landscape (Dwg)',
    //images file
    "Material Palette",
    "Exterior draft images",
    "Interior draft images",
    "Aerial Image, Front Building elevation image for all towers",
    "2D Floor Plan (color)",
    "2D Unit plan (color)",
    "2D Unit plan (ISO)",
    "Renders of common areas",
    "Tower Terrace Renders",
    "Club House Terrace Renders",
    "Amenities Images",
    "Master Plan of site (color)",
    "Club house floor plan (2D Color)",
    "Logo of project/Company",
    "Landscape renders",
    "Project Brochure"
  ];

  const enderUploadStatus = () => {
    if (loading) {
      return (
        <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
          <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Please wait Files are Loading...</span>
          </div>
        </div>
      );
    }}

  return (
    <div className='p-2 mt-5 rounded'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-extrabold text-white '>Upload your Cad Files...</h1>
        </div>
        <div className='flex gap-4'>
          <button
            className='p-2 px-5 font-bold text-white bg-gray-800 border rounded'
            onClick={() => removeFromLocation(3)}
          >
            <span className='flex items-center justify-between gap-3'>
              <GrLinkNext className='rotate-180' />
              Back
            </span>
          </button>
          <button
            className='p-2 px-5 font-bold text-white border rounded bg-slate-500'
            onClick={() => addToLocation(4)}
          >
            <span className='flex items-center justify-between gap-3'>Next<GrLinkNext /></span>
          </button>
        </div>
      </div>

      {uploadStatus  ? (
        <div className='h-full md:h-80 text-center justify-content-center align-items-center'>
          <h1 className='text-2xl text-center align-items-center  font-extrabold text-white'>
            Thank you! Files uploaded successfully.
          </h1>
          <h1 className='text-2xl text-center align-items-center  font-extrabold text-white'>
            Please continue further!
          </h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='h-full md:h-80 overflow-hidden overflow-y-scroll grid grid-cols-2 gap-6 p-2 mt-2 bg-gray-800 rounded md:grid-cols-2'>
            {inputFileRefs.map((inputRef, index) => (
              <div key={index}>
                <label className='block text-white mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor={`fileInput-${index}`}>
                  {fileInputs[index]}
                </label>
                <input
                  className='block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                  ref={inputRef}
                  id={`fileInput-${index}`}
                  type='file'
                  name={`file`}
                  onChange={(e) => handleFileChange(index, e)}
                  multiple
                />
              </div>
            ))}
          </div>
          <button className='p-2 px-5 font-bold text-white bg-slate-500 border rounded mt-4' type='submit'>
            Upload
          </button>
        </form>
        
      )}
      



    </div>
  );
};

export default FileUpload;

