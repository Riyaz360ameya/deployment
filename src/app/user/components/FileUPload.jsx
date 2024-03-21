import React, { useState, useRef } from 'react';
import { GrLinkNext } from 'react-icons/gr';
import axios from 'axios';
import { toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
const FileUpload = ({ addToLocation, removeFromLocation, projectName, uniqueId, fileUploads, setFileUploads }) => {
  const [load, setLoad] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleInputChange = (key, files) => {
    const updatedFileUpload = { ...fileUploads };
    updatedFileUpload[key] = {
      name: files[0].name,
      file: files[0],  // Now, directly pass the File object
    };
    setFileUploads(updatedFileUpload);
  };
  // const handleSubmit = async (e) => {
  //   try {
  //     // setLoading(true);
  //     setLoad(true)
  //     e.preventDefault();
  //     const formData = new FormData();
  //     // Iterate over the keys of fileUpload object
  //     for (const key of Object.keys(fileUploads)) {
  //       const { name, file } = fileUploads[key];
  //       console.log(`Appending file - Key: ${key}, Name: ${name}, Size: ${file.size} bytes`);
  //       formData.append(key, file, name);
  //     }
  //     formData.append('projectName', projectName)
  //     formData.append('uniqueId', uniqueId)
  //     const { data } = await axios.post('/api/upload', formData);
  //     // setUploadedFiles(true);
  //     toast.success(data.message);
  //     setLoad(false);
  //     setSuccess(true);

  //   } catch (error) {
  //     console.log(error.message, '-------------------error')
  //     toast.error(error.response?.data?.error || 'Error uploading files');
  //     // setLoading(false);
  //     setLoad(false)
  //   }
  // };
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
        <form
        //  onSubmit={handleSubmit}
        >
          {/* <div className='h-full md:h-80 overflow-hidden overflow-y-scroll grid grid-cols-1 md:grid-cols-2 gap-2 p-2 mt-2 bg-gray-400 rounded '> */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 h-2/4 md:3/4 overflow-hidden overflow-y-scroll p-2 mt-2  rounded' >
            {Object.keys(fileUploads).map((item, index) => (
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
          {/* <button className='p-2 px-5 font-bold text-white bg-slate-500 border rounded mt-4' type='submit'>
            Upload
          </button> */}
        </form>
      }
    </div>
  )
}
export default FileUpload