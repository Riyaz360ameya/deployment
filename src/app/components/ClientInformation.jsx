"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { FaLink } from 'react-icons/fa6';
import { PiChatDotsLight } from 'react-icons/pi';
import Badge from '../projectManager/components/Badge';
function ClientInformation() {
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState([]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/users/projectInput');
      const projectsInformation = data.projectsInformation;
      setProjectData(projectsInformation);
      console.log(projectsInformation, "fetched data");
      const updatedTasks = details.map((project) => {
        const isNew = new Date(project.date) > new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        return { ...project, isNew };
    });
     setProjectData(updatedTasks);
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
                    <div className='flex items-center gap-2 ml-5' >
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
