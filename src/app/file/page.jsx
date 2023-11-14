"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Page() {
  const [formData, setFormData] = useState({
  
    cadFile: null,

  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, cadFile: file }));
  };

  const submitDetails = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('cadFile', formData.cadFile);

      const response = await axios.post('/api/users/uploader', formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        console.log('Project details added successfully:', response.data.savedData);
        // Perform additional actions if needed
      } else {
        console.error('Project details upload failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error uploading project details:', error.message);
    }
  };

  return (
    <div>
      <h1>Add New Project</h1>
      <form>
        {/* Your form inputs ... */}
        <div>
          <label htmlFor="cadFile">Project CAD File:</label>
          <input
            type="file"
            id="cadFile"
            onChange={handleFileChange}
          />
        </div>
        <button onClick={submitDetails}>Submit</button>
      </form>
    </div>
  );
}

export default Page;





// import React, { useState } from 'react';
// import axios from 'axios';

// function page() {
//   const [Formdata, setFormdata] = useState({
//     projectTitle: '',
//     description: '',
//     startDate: '',
//     endDate: '',
//     cadFile: null,
//     instruction: ''
//   });

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormdata((prevData) => ({ ...prevData, cadFile: file }));
//   };

//   const submitDetails = async (e) => {
//     e.preventDefault();

//     // try {
//       const formData = new FormData();
//       formData.append('cadFile', Formdata.cadFile);
//       console.log(formData)

//     //   const response = await axios.post('/api/users/uploader', formData);

//     //   if (response.data.success) {
//     //     console.log('Project details added successfully:', response.data.savedData);
//     //     // Perform additional actions if needed
//     //   } else {
//     //     console.error('Project details upload failed:', response.data.error);
//     //   }
//     // } catch (error) {
//     //   console.error('Error uploading project details:', error.message);
//     // }
//   };

//   return (
//     <div>
//       <h1>Add New Project</h1>
//       <form>
//         {/* Your form inputs ... */}
//         <div>
//           <label htmlFor="cadFile">Project CAD File:</label>
//           <input
//             type="file"
//             id="cadFile"
//             onChange={handleFileChange}
//           />
//         </div>
//         <button onClick={submitDetails}>Submit</button>
//       </form>
//     </div>
//   );
// }

// export default page;
