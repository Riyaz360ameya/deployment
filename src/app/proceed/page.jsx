"use client"
import { useState } from 'react';
import axios from 'axios';

const page = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('cadFile', file);
    console.log(file,'---------file------------')

    try {
      await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    console.log('success')  
  } catch (error) {
        console.log(error) 
   }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default page;

// function page() {
//   return (
//     <>
//       <div className=''>
//         <div className='flex justify-center align-items-center py-5'>
//           <h1 className='text-xl font-bold'>Thank Your for the Payment Please add your files here...</h1>
//         </div>

//         <div
//           className="bg-gray-50 text-center px-4 rounded w-80 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed mx-auto font-[sans-serif]">
//           <div className="py-6">
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-10 mb-2 fill-gray-600 inline-block" viewBox="0 0 32 32">
//               <path
//                 d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
//                 data-original="#000000" />
//               <path
//                 d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
//                 data-original="#000000" />
//             </svg>
//             <h4 className="text-base font-semibold text-gray-600">Grag and drop cad files here</h4>
//           </div>
//           <hr className="w-full border-gray-400 my-2" />
//           <div className="py-6">
//             <input type="file" id='uploadFile1' className="hidden" />
//             <label htmlFor="uploadFile1"
//               className="block px-6 py-2.5 rounded text-gray-600 text-sm tracking-wider font-semibold border-none outline-none bg-gray-200 hover:bg-gray-100">Browse Files</label>
//             <p className="text-xs text-gray-400 mt-4">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
//           </div>
//         </div>

//       </div>
//       <div className='flex justify-center align-items-center py-5'>
//         <form>
//           <label class="block">
//             <span class="sr-only">Upload your Cad file</span>
//             <input type="file" class="block w-full text-sm text-gray-500
//                 file:me-4 file:py-2 file:px-4
//                 file:rounded-lg file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-600 file:text-white
//                 hover:file:bg-blue-700
//                 file:disabled:opacity-50 file:disabled:pointer-events-none
//                 dark:file:bg-blue-500
//                 dark:hover:file:bg-blue-400
//               "/>
//           </label>
//           <div className='my-5 flex justify-center align-items-center '>
//             <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
//               upload
//             </button>
//           </div>
//         </form>

//       </div>

//     </>
//   )
// }

// export default page