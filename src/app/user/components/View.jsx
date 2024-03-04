// import React, { useState } from "react";
// import './View.css'
// import { TiTick } from "react-icons/ti";
// const View = () => {
//     const [location, setLocation] = useState([1])
//     const [width, setWidth] = useState(15)
//     const steps = ["Project Info", "Customer Info", "Shipping Info", "Payment", "Step 4"];
//     const [currentStep, setCurrentStep] = useState(1);
//     const [complete, setComplete] = useState(false);
//     const bgColor = width < 20 ? 'bg-red-600' : width < 40 ? 'bg-orange-500' : width < 60 ? 'bg-yellow-400' : width < 80 ? 'bg-lime-400' : 'bg-green-600';
//     return (
//         <>
//             <div className="flex justify-between">
//                 {steps?.map((step, i) => (
//                     <div
//                         key={i}
//                         className={`step-item relative flex flex-col justify-center items-center w-36 ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"
//                             } `}
//                     >
//                         <div className="step">
//                             {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
//                         </div>
//                         <p className="text-gray-800">{step}</p>
//                     </div>
//                 ))}
//             </div>
//             <div className="flex items-center justify-center gap-2">
//                 {!complete && (
//                     <>

//                         <button
//                             className="bg-slate-800  text-white p-2 px-4 rounded"
//                             onClick={() => {
//                                 setCurrentStep((prev) => prev - 1);
//                             }}
//                         >
//                             Back
//                         </button>
//                         <button
//                             className="bg-slate-800  text-white p-2 px-4 rounded"
//                             onClick={() => {
//                                 currentStep === steps.length
//                                     ? setComplete(true)
//                                     : setCurrentStep((prev) => prev + 1);
//                             }}
//                         >
//                             {currentStep === steps.length ? "Finish" : "Next"}
//                         </button>
//                     </>
//                 )}
//             </div>
//             <div className='p-5'>
//                 <div className="w-full h-1 mb-6 bg-neutral-200 dark:bg-neutral-600 rounded-full">
//                     <div
//                         className={`h-1 transition-all duration-500 ease-in-out ${bgColor} relative grid place-items-center  rounded-full`}
//                         style={{ width: `${width}%` }}>
//                         <span className={`absolute h-4 w-4 ${bgColor} rounded-full  right-0 flex items-center justify-center`}>
//                             <span className={`h-full w-full rounded-full animate-ping  ${bgColor} opacity-75`}></span>
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default View;
// // import React, { useState, useEffect } from 'react';

// // export default function View() {
// //     const [filesData, setFilesData] = useState([]);
// //     const [isLoading, setIsLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         async function fetchData() {
// //             try {
// //                 const response = await fetch('/api/fetchFilesServer');
// //                 if (!response.ok) {
// //                     throw new Error(`Failed to fetch files: ${response.statusText}`);
// //                 }
// //                 const data = await response.json();
// //                 setFilesData(data.files || []);
// //             } catch (error) {
// //                 console.error('Error fetching files:', error.message);
// //                 setError('Failed to fetch files. Please try again.');
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         }

// //         fetchData();
// //     }, []);

// //     return (
// //         <div>
// //             <h1>Files</h1>
// //             {isLoading && <p>Loading...</p>}
// //             {error && <p style={{ color: 'red' }}>{error}</p>}
// //             {!isLoading && !error && (
// //                 <ul>
// //                     {filesData.map((file, index) => (
// //                         <li key={index}>
// //                             <strong>{file.fileName}</strong>
// //                             <br />
// //                             <a
// //                                 href={`data:application/octet-stream;base64,${file.content}`}
// //                                 download={file.fileName}
// //                             >
// //                                 Download File
// //                             </a>
// //                         </li>
// //                     ))}
// //                 </ul>
// //             )}
// //         </div>
// //     );
// // }
