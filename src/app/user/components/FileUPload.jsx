import React, { useState, useRef } from 'react';
import { GrLinkNext } from 'react-icons/gr';
import axios from 'axios';
import { toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
const FileUpload = ({ addToLocation, removeFromLocation, projectName, uniqueId }) => {
  const [complete, setComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [load, setLoad] = useState(false);
  const steps = ["Project Info", "Contact Details", "Files Upload", "Payment", "Feedback"];
  const [success, setSuccess] = useState(false);

  const [fileUpload, setFileUpload] = useState({
    '3DsMax - Building': {},
    '3DsMax - Landscape & Textures': {},
    '3DsMax - Terrace': {},
    // '3DsMax - Entry or Exit gate': {},
    // 'CAD Floor plans (dwg)': {},
    // 'CAD Elevation (dwg)': {},
    // 'CAD Section (dwg)': {},
    // 'Club House CAD Elevation (dwg)': {},
    // 'Club House CAD Section (dwg)': {},
    // 'Club house floor plans CAD (dwg)': {},
    // 'Tower Terrace Cad (dwg)': {},
    // 'Landscape (Dwg)': {},
    // // //images file
    // 'Material Palette': {},
    // 'Exterior draft images': {},
    // 'Interior draft images': {},
    // 'Aerial Image, Front Building elevation image for all towers': {},
    // '2D Floor Plan (color)': {},
    // '2D Unit plan (color)': {},
    // '2D Unit plan (ISO)': {},
    // 'Renders of common areas': {},
    // 'Tower Terrace Renders': {},
    // 'Club House Terrace Renders': {},
    // 'Amenities Images': {},
    // 'Master Plan of site (color)': {},
    // 'Club house floor plan (2D Color)': {},
    // 'Logo of project or Company': {},
    // 'Landscape renders': {},
    // 'Project Brochure': {},
  });
  // console.log(fileUpload, '---------------------fileUpload')
  const handleInputChange = (key, files) => {
    const updatedFileUpload = { ...fileUpload };
    updatedFileUpload[key] = {
      name: files[0].name,
      file: files[0],  // Now, directly pass the File object
    };
    setFileUpload(updatedFileUpload);
  };
  const handleSubmit = async (e) => {
    try {
      // setLoading(true);
      setLoad(true)
      e.preventDefault();
      const formData = new FormData();
      // Iterate over the keys of fileUpload object
      for (const key of Object.keys(fileUpload)) {
        const { name, file } = fileUpload[key];
        console.log(`Appending file - Key: ${key}, Name: ${name}, Size: ${file.size} bytes`);
        formData.append(key, file, name);
      }
      formData.append('projectName', projectName)
      formData.append('uniqueId', uniqueId)
      const { data } = await axios.post('/api/upload', formData);
      // setUploadedFiles(true);
      toast.success(data.message);
      setLoad(false);
      setSuccess(true);

    } catch (error) {
      console.log(error.message, '-------------------error')
      toast.error(error.response?.data?.error || 'Error uploading files');
      // setLoading(false);
      setLoad(false)
    }
  };
  return (
    <div className='rounded mt-5 h-full flex flex-col '>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='md:text-2xl text-lg font-extrabold text-white'>File Upload</h1>
        </div>
        <div className="flex items-center justify-between gap-2 px-5">
          <button
            className=" p-2 text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer  hover:bg-gray-200   bg-gray-100  text-gray-700     border duration-200 ease-in-out  border-gray-600 transition"
            onClick={() => {
              removeFromLocation(3)
            }}
          >
            Back
          </button>
          <button
            className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                    hover:bg-teal-600  
                    bg-teal-600 
                    text-teal-100 
                    border duration-200 ease-in-out 
                    border-teal-600 transition"
            onClick={() => {
              addToLocation(4)
            }}
          >Next
          </button>
        </div>
      </div>
      {load ? (
        <div className='flex items-center justify-center h-full'>
          <div className='flex items-center justify-center h-full'>
            <InfinitySpin />
          </div>
        </div>
      ) : success ? (
        <div className='flex items-center justify-center h-full'>
          <div>
            <h1>Files uploaded successfully</h1>
            {/* <p>Please continue further</p> */}
          </div>
        </div>) :
        <form onSubmit={handleSubmit}>
          <div className='h-full md:h-80 overflow-hidden overflow-y-scroll grid grid-cols-1 gap-6 p-2 mt-2 bg-gray-400 rounded md:grid-cols-2'>
            {Object.keys(fileUpload).map((item, index) => (
              <div key={index}>
                <label className='block mb-2 text-sm text-white font-medium  dark:text-white' htmlFor={item}>{item}</label>
                <input
                  type="file"
                  className='block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                  id={item}
                  name={item}
                  onChange={(e) => handleInputChange(item, e.target.files)}
                  multiple
                />
              </div>
            ))}
          </div>
          <button className='p-2 px-5 font-bold text-white bg-slate-500 border rounded mt-4' type='submit'>
            Upload
          </button>
        </form>
      }
    </div>
  )
}
export default FileUpload