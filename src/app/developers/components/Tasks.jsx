import React, { useState, useEffect } from 'react';
import Ongoing from '../components/Ongoing';
import { FiAlertOctagon } from "react-icons/fi";
import { PiChatDotsLight } from "react-icons/pi";
import { MdFileDownload } from "react-icons/md";
import axios from 'axios';

const Tasks = () => {
    const [task, setTask] = useState([]);
    const [showOngoing, setShowOngoing] = useState(false);

    const userDetails = async () => {
        try {
            const { data } = await axios.get("/api/task/teamLeadTask/teamLeadData");
            const details = data.task;
            setTask(details);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleStartClick = () => {
        setShowOngoing(true);
    };

    useEffect(() => {
        userDetails();
    }, []);

    return (
        <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden'>
            {showOngoing ? (
                <Ongoing />
            ) : (
                <div className='border shadow mt-4'>
                    <table className="w-full whitespace-nowrap shadow p-3">
                        <tbody>
                            <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded shadow-xl">
                                <th>No</th>
                                <th>Project Title</th>
                                <th>Importance</th>
                                <th>Comments</th>
                                <th>Deadline</th>
                                <th>Start Task</th>
                            </tr>
                            <tr className='h-5'></tr>
                            {
                                task.map((item, i) => (
                                    <tr className='text-center mt-10 shadow-xl border' key={item.id}>
                                        <td>{i + 1}</td>
                                        <td className="">
                                            <p>{item.projectTitle}</p>
                                        </td>
                                        <td className="">
                                            <div className="flex items-center justify-center">
                                                <FiAlertOctagon color='red' />
                                                <p className="text-sm text-gray-600 ml-2">Urgent</p>
                                            </div>
                                        </td>
                                        <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item.description}</td>
                                        <td className='bg-red-200 rounded text-red-600'>{item.endDate}</td>
                                        <td>
                                            <button
                                                onClick={handleStartClick}
                                                className='bg-green-800 text-white px-4 py-1 rounded'
                                            >
                                                Start
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Tasks;




















// import React, { useState, useEffect } from 'react'
// import { FaLink } from "react-icons/fa6";
// import { FiAlertOctagon } from "react-icons/fi";
// import { PiChatDotsLight } from "react-icons/pi";
// import { MdFileDownload } from "react-icons/md";
// import axios from 'axios';
// const Tasks = () => {
//     const [task, setTask] = useState([])
//     const userDetails = async () => {
//         const { data } = await axios.get("/api/task/teamLeadTask/teamLeadData")
//         console.log(data.task, '-------------data')
//         const details = data.task
//         setTask(details)
//     }
//     useEffect(() => {
//         userDetails()
//     }, [])
//     return (
//         <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden' >
//             <div className='border shadow mt-4'>
//                 <table className="w-full whitespace-nowrap shadow p-3 ">
//                     <tbody>
//                         <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded shadow-xl">
//                             <th>No</th>
//                             <th>Project Title</th>
//                             <th>Importance</th>
//                             <th>Comments</th>
//                             <th>Deadline</th>
//                             {/* <th>Download</th> */}
//                             <th>Start Task</th>
//                         </tr>
//                         <tr className='h-5'></tr>

                       
//                         {
//                             task.map((item, i) => {
//                                 return (
//                                     <tr className='text-center mt-10 shadow-xl border'>
//                                         <td>{i}</td>
//                                         <td className="">
//                                             <p>{item.projectTitle}</p>
//                                         </td>
//                                         <td className="">
//                                             <div className="flex items-center justify-center">
//                                                 <FiAlertOctagon color='red' />
//                                                 <p className="text-sm text-gray-600 ml-2">Urgent</p>
//                                             </div>
//                                         </td>
//                                         <td className='flex items-center justify-center gap-2'><PiChatDotsLight />{item.description}</td>
//                                         <td className='bg-red-200 rounded text-red-600'>{item.endDate}</td>
//                                         {/* <td className='rounded grid place-items-center text-red-600'>
//                                             <MdFileDownload className='text-2xl' />
//                                         </td> */}
//                                         <td><button className='bg-green-800 text-white px-4 py-1 rounded'>Start</button></td>
//                                     </tr>
//                                 )
//                             })
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </div >
//     )
// }
// export default Tasks