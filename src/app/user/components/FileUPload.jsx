import React, { useState, useRef } from 'react';
import { GrLinkNext } from 'react-icons/gr';
import axios from 'axios';
import { toast } from 'react-toastify';

const FileUpload = ({ addToLocation, removeFromLocation, projectId, projectName,}) => {
  const inputFileRefs = Array.from({ length: 28 }, () => useRef(null));
  const [files, setFiles] = useState(Array.from({ length: 28 }, () => null));
  const [uploadStatus, setUploadStatus] = useState(false);
  const [loading, setloading] = useState(false);

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
        <div className='text-center justify-content-center align-items-center'>
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

