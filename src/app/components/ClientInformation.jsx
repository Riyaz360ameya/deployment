
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { FaLink } from 'react-icons/fa6';
import { PiChatDotsLight } from 'react-icons/pi';
import Badge from '../projectManager/components/Badge';

function ClientInformation() {
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState([]);
    const [user, setUser] = useState(null);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            //fetched userid from localStorage
            const userData = localStorage.getItem('user');
            const user = JSON.parse(userData)
            console.log(user)
            const { _id } = user
            //api
            const { data } = await axios.get('/api/users/projectInput')
            const projectInformation = data.projectsInformation
            console.log(projectInformation, "------------api")
            //filter based on userId to show particular user id data
            const userProjects = projectInformation.filter((project => project.userId._id === _id))
            setProjectData(userProjects);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProjects();
    }, []);
    return (
        <>
                        {loading ? (
                <div className='h-full flex items-center justify-center'>
                    <div>
                        <InfinitySpin width='200' color='black' />
                    </div>
                </div>
            ) : (
                <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden'>
                    <div>
                        <h1 className='text-xl p-2 flex justify-center items-center shadow-lg bg-gray-200'>Your Projects Details</h1>
                        <div className='flex gap-4 ml-2 py-4'>
                            <div className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>All</p>
                            </div>
                            {/* <div className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>Previous</p>
                            </div>
                            <div className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>ongoing</p>
                            </div>
                            <div className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>completed</p>
                            </div> */}
                        </div>
                    </div>
                    <div className='border shadow mt-4'>
                        <table className='w-full whitespace-nowrap shadow p-3'>
                            <thead>
                                <tr className='focus:outline-none h-16 border border-gray-100 rounded shadow-xl'>
                                    <th>No</th>
                                    <th>Builder Name</th>
                                    <th>Project No</th>
                                    <th>Venture Type</th>
                                    <th>Description</th>
                                    <th>Deadline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectData.map((item, i) => (
                                    <tr key={i} className='text-center mt-10 shadow-xl border'>
                                        <td>{i + 1}</td>
                                        <td className=''>
                                            <div className='flex items-center gap-2 ml-5'>
                                                {item.isNew && <Badge label='New' color='bg-green-500 text-white' />}
                                                <FaLink color='blue' />
                                                <p>{item.projectInfo.ventureName}</p>
                                            </div>
                                        </td>
                                        <td className=''>
                                            <p>55</p>
                                        </td>
                                        <td className='text-center'>{item.projectInfo.ventureType}</td>
                                        <td className='flex items-center justify-center gap-2'>
                                            <PiChatDotsLight />
                                            {item.projectInfo.ventureDescription}
                                        </td>
                                        <td className='bg-red-200 rounded text-red-600'>{item.projectInfo.estimatedDeliveryDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default ClientInformation;
// -------------------------- new method to filter from backend everything implimented just need to map data------------
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { InfinitySpin } from 'react-loader-spinner';

// function ClientInformation() {
//     const [loading, setLoading] = useState(false);
//     const [projectData, setProjectData] = useState([]);

//     const fetchProjects = async () => {
//       setLoading(true);
//        try {
//         // Fetched user ID from localStorage
//         const userData = localStorage.getItem('user');
//         const user = JSON.parse(userData);
//         const { _id } = user;
//         console.log(_id, "local storage id");

//         // API call to fetch projects
//         const { data } = await axios.post('/api/users/projectData', { _id });
//         const projectsInformation = data.projectsInformation
//         // const projectsInformation = data.projectsInformation.NewProjects[0].ProjectId


//         console.log(projectsInformation, "-------from api");
//         const userProjects = projectsInformation.filter(
//             (project) => project.userId === _id
//         );

//         console.log(userProjects, "------filtered data");

//         setProjectData(userProjects);

//         setLoading(false);
//     } catch (error) {
//         console.error('Error fetching projects:', error.message);
//         setLoading(false);
//     }
// };



//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     return (
//         <>
//             {loading ? (
//                 <div className='h-full flex items-center justify-center'>
//                     <div>
//                         {/* Add your loading spinner or indicator here */}
//                         <InfinitySpin width='200' color='black'/>
//                     </div>
//                 </div>
//             ) : (
//                 <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden'>
//                     <div>
//                         <h1 className='text-xl p-2 flex justify-center items-center shadow-lg bg-gray-200'>Your Projects Details</h1>
//                         <div className='flex gap-4 ml-2 py-4'>
//                         <div className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
//                                 <p>All</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='border shadow mt-4'>
//                         <table className='w-full whitespace-nowrap shadow p-3'>
//                             <thead>
//                                 <tr className='focus:outline-none h-16 border border-gray-100 rounded shadow-xl'>
//                                     <th>No</th>
//                                     <th>Builder Name</th>
//                                     <th>Project No</th>
//                                     <th>Venture Type</th>
//                                     <th>Description</th>
//                                     <th>Deadline</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
                          
// {projectData.map((item, i) => (
//     <tr key={item.NewProjects.ProjectId.projectInfo._id} className='text-center mt-10 shadow-xl border'>
//         <td>{i + 1}</td>
//         <td className=''>
//             <div className='flex items-center gap-2 ml-5'>
//                 <p>{item.NewProjects.ProjectId.projectInfo.ventureName}</p>
//             </div>
//         </td>
//         <td className=''>
//             {item.projectInfo.projectNumber}
//         </td>
//         <td className='text-center'>{item.projectInfo.ventureType}</td>
//         <td className='flex items-center justify-center gap-2'>
//             {item.projectInfo.ventureDescription}
//         </td>
//         <td className='bg-red-200 rounded text-red-600'>{item.projectInfo.estimatedDeliveryDate}</td>
//     </tr>
// ))}                               
                           
                               
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default ClientInformation;

