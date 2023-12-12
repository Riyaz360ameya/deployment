
// import React, { useState, useEffect } from 'react'
// import { FaLink } from "react-icons/fa6";
// import { BsTag } from "react-icons/bs";
// import { FiAlertOctagon } from "react-icons/fi";
// import { PiChatDotsLight } from "react-icons/pi";
// import TaskAssignModal from './TaskAssignModal';
// import axios from 'axios';
// import { InfinitySpin } from 'react-loader-spinner';

// const Projects = ({ loading, setLoading }) => {
//   const [tasks, setTasks] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [isTaskAssigned, setIsTaskAssigned] = useState(false);

//   const fetchTasks = async () => {
//     try {
//       const { data } = await axios.get('/api/projectManager/projectDetails');
//       const details = data.projectData[0].Details;

//       setTasks(details);
//       console.log(details, 'projectdata');
//     } catch (error) {
//       console.error('Error fetching tasks:', error.message);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//     setLoading(false);
//   }, []);

//   const handleAssign = () => {
//     setModal(true);
//   };

//   const handleTaskAssigned = (assigned) => {
//     setIsTaskAssigned(assigned);
//   };

//   return (
//     <>
//       {loading ? (
//         <div className='h-full flex items-center justify-center'>
//           <div>
//             <InfinitySpin width='200' color='black' />
//           </div>
//         </div>
//       ) : (
//         <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden'>
//           <div>
//             <h1 className='text-xl p-2'>Projects</h1>
//             <div className='flex gap-4 ml-2'>
//               <div className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
//                 <p>All</p>
//               </div>
//               <div className='py-2 px-8  hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
//                 <p>Done</p>
//               </div>
//               <div className='py-2 px-8 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
//                 <p>Pending</p>
//               </div>
//             </div>
//           </div>
//           <div className='border shadow mt-4'>
//             <table className='w-full whitespace-nowrap shadow p-3 '>
//               <tbody>
//                 <tr tabIndex='0' className='focus:outline-none h-16 border border-gray-100 rounded shadow-xl'>
//                   <th>No</th>
//                   <th>Select</th>
//                   <th>Builder Name</th>
//                   <th>Project No</th>
//                   <th>Venture Type</th>
//                   <th>Description</th>
//                   <th>Deadline</th>
//                   <th>Status</th>
//                   <th>Task</th>
//                   <th>Options</th>
//                 </tr>
//                 <tr className='h-5'></tr>
//                 {tasks.map((item, i) => {
//                   return (
//                     <tr key={i} className='text-center mt-10 shadow-xl border'>
//                       <td>{i + 1}</td>
//                       <td className='text-center flex justify-center items-center h-10 '>
//                         <div className='bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative'>
//                           <input
//                             placeholder='checkbox'
//                             type='checkbox'
//                             className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full '
//                           />
//                         </div>
//                       </td>
//                       <td className=''>
//                         <div className='flex items-center gap-2 ml-5' onClick={() => setModal(true)}>
//                           {item.isNew && <Badge label='New' color='bg-green-500 text-white' />}
//                           <FaLink color='blue' />
//                           <p>{item.ventureName}</p>
//                         </div>
//                       </td>
//                       <td className=''>
//                         <p>55</p>
//                       </td>
//                       <td className='text-center'>{item.ventureType}</td>
//                       <td className='flex items-center justify-center gap-2'>
//                         <PiChatDotsLight />
//                         {item.ventureDescription}
//                       </td>
//                       <td className='bg-red-200 rounded text-red-600'>{item.estimatedDelivaryDate}</td>
//                       <td>50%</td>
//                       <td>          {isTaskAssigned && <p className="text-green-500 text-center font-bold">Assigned</p>}
// </td>
//                       <td className='flex gap-2 items-center justify-center'>
//                         <button className='px-3 bg-blue-600 text-white rounded'>E</button>
//                         <button className='px-3 bg-red-600 text-white rounded'>D</button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//           {modal ? <TaskAssignModal setModal={setModal} onTaskAssigned={handleTaskAssigned} /> : ''}
//           {isTaskAssigned && <p className="text-green-500 text-center font-bold">Assigned</p>}
//         </div>
//       )}
//     </>
//   );
// };

// export default Projects;

import React, { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { PiChatDotsLight } from 'react-icons/pi';
import TaskAssignModal from './TaskAssignModal';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import Badge from './Badge'; // Update the path to your Badge component

const Projects = ({ loading, setLoading }) => {
    const [projectId, setProjectId] = useState()
    const [tasks, setTasks] = useState([]);
    const [modal, setModal] = useState(false);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('/api/projectManager/projectDetails');
            const details = data.projectData[0].Details;

            const updatedTasks = details.map((project) => {
                const isNew = new Date(project.date) > new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
                return { ...project, isNew };
            });

            setTasks(updatedTasks);
            console.log(updatedTasks, 'projectdata');
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        }
    };

    useEffect(() => {
        fetchTasks();
        setLoading(false);
    }, []);

    const handleAssign = (id) => {
        setModal(true);
        setProjectId(id)
    };

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
                        <h1 className='text-xl p-2'>Projects</h1>
                        <div className='flex gap-4 ml-2'>
                            <div className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>All</p>
                            </div>
                            <div className='py-2 px-8  hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>Done</p>
                            </div>
                            <div className='py-2 px-8 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className='border shadow mt-4'>
                        <table className='w-full whitespace-nowrap shadow p-3 '>
                            <tbody>
                                <tr tabIndex='0' className='focus:outline-none h-16 border border-gray-100 rounded shadow-xl'>
                                    <th>No</th>
                                    <th>Select</th>
                                    <th>Builder Name</th>
                                    <th>Project No</th>
                                    <th>Venture Type</th>
                                    <th>Description</th>
                                    <th>Deadline</th>
                                    <th>Work</th>
                                    <th>Status</th>
                                    <th>Options</th>
                                </tr>
                                <tr className='h-5'></tr>
                                {tasks.map((item, i) => {
                                    return (
                                        <tr key={i} className='text-center mt-10 shadow-xl border'>
                                            <td>{i + 1}</td>
                                            <td className='text-center flex justify-center items-center h-10 '>
                                                <div className='bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative'>
                                                    <input
                                                        placeholder='checkbox'
                                                        type='checkbox'
                                                        className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full '
                                                    />
                                                </div>
                                            </td>
                                            <td className=''>
                                                <div className='flex items-center gap-2 ml-5' >
                                                    {item.isNew && <Badge label='New' color='bg-green-500 text-white' />}
                                                    <FaLink color='blue' />
                                                    <p>{item.ventureName}</p>
                                                </div>
                                            </td>
                                            <td className=''>
                                                <p>55</p>
                                            </td>
                                            <td className='text-center'>{item.ventureType}</td>
                                            <td className='flex items-center justify-center gap-2'>
                                                <PiChatDotsLight />
                                                {item.ventureDescription}
                                            </td>
                                            <td className='bg-red-200 rounded text-red-600'>{item.estimatedDelivaryDate}</td>
                                            <td>assigned</td>
                                            <td>{item.status}</td>
                                            <td className='flex gap-2 items-center justify-center'>
                                                {
                                                    item.status === "New Task" ?
                                                        <>
                                                            <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={() => handleAssign(item._id)} >Assign Task to</button>
                                                        </>
                                                        :
                                                        <>
                                                            <button className='px-3 bg-blue-600 text-white rounded'>E</button>
                                                            <button className='px-3 bg-red-600 text-white rounded'>D</button>
                                                        </>
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {modal ? <TaskAssignModal projectId={projectId} setModal={setModal} /> : ''}
                </div>
            )}
        </>
    );
};

export default Projects;

// import React, { useState, useEffect } from 'react'
// import { FaLink } from "react-icons/fa6";
// import { BsTag } from "react-icons/bs";
// import { FiAlertOctagon } from "react-icons/fi";
// import { PiChatDotsLight } from "react-icons/pi";
// import TaskAssignModal from './TaskAssignModal';
// import ProjectInformation from './projectInformation';
// import axios from 'axios';
// import { InfinitySpin } from 'react-loader-spinner'
// const Projects = ({ loading, setLoading }) => {
//     const [tasks, setTasks] = useState([])
//     const [modal, setModal] = useState(false)
//     const [modals,setModals] = useState(false)
//     const handleAssign = () => {
//         setModal(true)
//     }
//     const fetchTasks = async () => {
//         try {
//             const { data } = await axios.get('/api/projectManager/projectDetails');
//             const details = data.projectData[0].Details;
//             setTasks(details);
//             console.log(details, "projectdata")
//         } catch (error) {
//             console.error('Error fetching tasks:', error.message);
//         }
//     };
//     useEffect(() => {
//         fetchTasks();
//         setLoading(false)

//     }, []);
//     const handleHover = () => {
//         const popover = document.getElementById('popover-hover');
//         popover.style.visibility = 'visible';
//         popover.style.opacity = '1';
//     };

//     const handleLeave = () => {
//         const popover = document.getElementById('popover-hover');
//         popover.style.visibility = 'hidden';
//         popover.style.opacity = '0';
//     };
//     return (
//         <>
//             {loading ?
//                 <div className='  h-full flex items-center justify-center '>
//                     <div><InfinitySpin
//                         width='200'
//                         color="black"
//                     /></div>
//                 </div>
//                 :
//                 <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden' >
//                     <div className=''>
//                         <h1 className='text-xl p-2'>Projects</h1>
//                         <div className='flex gap-4 ml-2'>
//                             <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl">
//                                 <p>All</p>
//                             </div>
//                             <div className="py-2 px-8  hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl">
//                                 <p>Done</p>
//                             </div>
//                             <div className="py-2 px-8 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl">
//                                 <p>Pending</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='border shadow mt-4'>
//                         <table className="w-full whitespace-nowrap shadow p-3 ">
//                             <tbody>
//                                 <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded shadow-xl">
//                                     <th>No</th>
//                                     <th>Select</th>
//                                     <th>Builder Name</th>
//                                     <th>Project No</th>
//                                     <th>Venture Type</th>
//                                     <th>Description</th>
//                                     <th>Deadline</th>
//                                     <th>Status</th>
//                                     <th>Options</th>
//                                 </tr>
//                                 <tr className='h-5'></tr>
//                                 {tasks.map((item, i) => {
//                                     return (
//                                         <tr key={i} className='text-center mt-10 shadow-xl border'>
//                                             <td>{i + 1}</td>
//                                             <td className='text-center flex justify-center items-center h-10 '>
//                                                 <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                                     <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full " />
//                                                 </div>
//                                             </td>
//                                             <td className="">
//                                                 <div className="flex items-center gap-2  ml-5"onClick={() => setModal(true)}>
//                                                     <FaLink color='blue' />
//                                                     <p>{item.ventureName}</p>
//                                                 </div>
//                                             </td>
//                                             <td className="">
//                                                 <p>55</p>
//                                             </td>
//                                             <td className='text-center'>{item.ventureType}</td>
//                                             <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item.ventureDescription}</td>
//                                             <td className='bg-red-200 rounded text-red-600'>{item.estimatedDelivaryDate}</td>
//                                             <td>50%</td>
//                                             <td className='flex gap-2 items-center justify-center'>
//                                                 <button className='px-3 bg-blue-600 text-white rounded'>E</button>
//                                                 <button className='px-3 bg-red-600 text-white rounded'>D</button>
//                                             </td>
//                                         </tr>
//                                     )
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                     {
//                         modal ? <TaskAssignModal setModal={setModal} /> : ""
//                     }
//                 </div >
//             }
//         </>
//     )
// }
// export default Projects



















// -----------------------------------------------------------------------
// import React, { useState, useEffect } from 'react'
// import { FaLink } from "react-icons/fa6";
// import { BsTag } from "react-icons/bs";
// import { FiAlertOctagon } from "react-icons/fi";
// import { PiChatDotsLight } from "react-icons/pi";
// import TaskAssignModal from './TaskAssignModal';
// import ProjectInformation from './projectInformation';
// import axios from 'axios';
// import { InfinitySpin } from 'react-loader-spinner'
// const Projects = ({ loading, setLoading }) => {
//     const [tasks, setTasks] = useState([])
//     const [modal, setModal] = useState(false)
//     const [modals,setModals] = useState(false)
//     const handleAssign = () => {
//         setModal(true)
//     }
//     const fetchTasks = async () => {
//         try {
//             const { data } = await axios.get('/api/projectManager/projectDetails');
//             const details = data.projectData[0].Details;
//             setTasks(details);
//             console.log(details, "projectdata")
//         } catch (error) {
//             console.error('Error fetching tasks:', error.message);
//         }
//     };
//     useEffect(() => {
//         fetchTasks();
//         setLoading(false)

//     }, []);
//     const handleHover = () => {
//         const popover = document.getElementById('popover-hover');
//         popover.style.visibility = 'visible';
//         popover.style.opacity = '1';
//     };

//     const handleLeave = () => {
//         const popover = document.getElementById('popover-hover');
//         popover.style.visibility = 'hidden';
//         popover.style.opacity = '0';
//     };
//     return (
//         <>
//             {loading ?
//                 <div className='  h-full flex items-center justify-center '>
//                     <div><InfinitySpin
//                         width='200'
//                         color="black"
//                     /></div>
//                 </div>
//                 :
//                 <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden' >
//                     <div className=''>
//                         <h1 className='text-xl p-2'>Projects</h1>
//                         <div className='flex gap-4 ml-2'>
//                             <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl">
//                                 <p>All</p>
//                             </div>
//                             <div className="py-2 px-8  hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl">
//                                 <p>Done</p>
//                             </div>
//                             <div className="py-2 px-8 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl">
//                                 <p>Pending</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='border shadow mt-4'>
//                         <table className="w-full whitespace-nowrap shadow p-3 ">
//                             <tbody>
//                                 <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded shadow-xl">
//                                     <th>No</th>
//                                     <th>Select</th>
//                                     <th>Builder Name</th>
//                                     <th>Project No</th>
//                                     <th>Venture Type</th>
//                                     <th>Description</th>
//                                     <th>Deadline</th>
//                                     <th>Status</th>
//                                     <th>Options</th>
//                                 </tr>
//                                 <tr className='h-5'></tr>
//                                 {/* <tr className='text-center mt-10 shadow-xl border'>
//                                     <td>11</td>
//                                     <td className='text-center flex justify-center items-center h-10 '>
//                                         <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                             <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full " />
//                                         </div>
//                                     </td>
//                                     <td className="">
//                                         <div className="flex items-center gap-2 ml-5" onClick={() => setModal(true)}>
//                                             <FaLink color='blue' />
//                                              <p data-popover-target="popover-hover"
//                                                 data-popover-trigger="hover"
//                                                 type="button"
//                                                 onMouseEnter={handleHover}
//                                                 onMouseLeave={handleLeave} className="text-base font-medium  text-gray-700 ">Sandro</p>
//                                             <div
//                                                 id="popover-hover"
//                                                 role="tooltip"
//                                                 className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
//                                                 onMouseEnter={handleHover}
//                                                 onMouseLeave={handleLeave}
//                                             >
//                                                 <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
//                                                     <h3 className="font-semibold text-gray-900 dark:text-white">Project information</h3>
//                                                 </div>

//                                                 <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

//                                                     <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy</h5>
//                                                     <p class="font-normal text-gray-700 dark:text-gray-400">the biggest enterprise technology.</p>
//                                                 </a>

//                                                 <div data-popper-arrow></div>
//                                             </div>
//                                             <h1>Riyaz</h1>
//                                         </div>
//                                     </td>
//                                     <td className="">
//                                         <p>5</p>
//                                     </td>
//                                     <td colSpan="8" className="text-center">
//                                         <button className='bg-blue-600 px-3 py-1 rounded text-white' onClick={handleAssign} >Assign Task to</button>
//                                     </td>
//                                 </tr> */}
//                                 {/* <tr className='text-center mt-10 shadow-xl border'>
//                                     <td>2</td>
//                                     <td className='text-center flex justify-center items-center h-10 '>
//                                         <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                             <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full " />
//                                         </div>
//                                     </td>
//                                     <td className="">
//                                         <div className="flex items-center gap-2  ml-5" >
//                                             <FaLink color='blue' />
//                                             <button className="text-base font-medium  text-gray-700 ">{ }</button>

//                                         </div>

//                                     </td>
//                                     <td className="">
//                                         <p>55</p>
//                                     </td>
//                                     <td className="">
//                                         <div className="flex items-center justify-center">
//                                             <FiAlertOctagon color='red' />
//                                             <p className="text-sm text-gray-600 ml-2">Urgent</p>
//                                         </div>
//                                     </td>
//                                     <td className='text-center'>Tony Stark</td>
//                                     <td className='flex items-center justify-center gap-2'><PiChatDotsLight />2 msg</td>
//                                     <td className='bg-red-200 rounded text-red-600'>hello</td>
//                                     <td>50%</td>
//                                     <td className='flex gap-2 items-center justify-center'>
//                                         <button className='px-3 bg-blue-600 text-white rounded'>E</button>
//                                         <button className='px-3 bg-red-600 text-white rounded'>D</button>
//                                     </td>
//                                 </tr> */}
//                                 {tasks.map((item, i) => {
//                                     return (
//                                         <tr key={i} className='text-center mt-10 shadow-xl border'>
//                                             <td>{i + 1}</td>
//                                             <td className='text-center flex justify-center items-center h-10 '>
//                                                 <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
//                                                     <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full " />
//                                                 </div>
//                                             </td>
//                                             <td className="">
//                                                 <div className="flex items-center gap-2  ml-5"onClick={() => setModal(true)}>
//                                                     <FaLink color='blue' />
//                                                     <p>{item.ventureName}</p>
//                                                 </div>
//                                             </td>
//                                             <td className="">
//                                                 <p>55</p>
//                                             </td>
//                                             {/* <td className="">
//                                                 <div className="flex items-center justify-center">
//                                                     <FiAlertOctagon color='red' />
//                                                     <p className="text-sm text-gray-600 ml-2">h</p>
//                                                 </div>
//                                             </td> */}
//                                             <td className='text-center'>{item.ventureType}</td>
//                                             <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item.ventureDescription}</td>
//                                             <td className='bg-red-200 rounded text-red-600'>{item.estimatedDelivaryDate}</td>
//                                             <td>50%</td>
//                                             <td className='flex gap-2 items-center justify-center'>
//                                                 <button className='px-3 bg-blue-600 text-white rounded'>E</button>
//                                                 <button className='px-3 bg-red-600 text-white rounded'>D</button>
//                                             </td>
//                                         </tr>
//                                     )
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                     {
//                         modal ? <TaskAssignModal setModal={setModal} /> : ""
//                     }

//                     {/* {
//                           modals ? <ProjectInformation setModals={setModals} /> : ""
//                     } */}
//                 </div >
//             }
//         </>
//     )
// }
// export default Projects
