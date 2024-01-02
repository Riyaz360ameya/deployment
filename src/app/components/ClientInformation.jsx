import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';

function ClientInformation() {
    const [loading, setLoading] = useState(false);
    const [projectData, setProjectData] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [complete, setComplete] = useState([]);
    const fetchCompletedProjectRecords = async() => {
        setLoading(true);
        try {
            // Fetched user ID from localStorage
            const userData = localStorage.getItem('user');
            const user = JSON.parse(userData);
            const { _id } = user;

            // API call to fetch projects
            const response = await axios.post('/api/users/projectData', { _id });
            const projectsInformation = response.data.projectsInformation.completedProjects;
            console.log(projectsInformation,"ongoing projects")
            // Filter projects based on user ID
            const userProjects = projectsInformation.filter(
                (project) => project.ProjectId.userId === _id
            );
            console.log(userProjects,"---------------user")
            setProjectData(userProjects);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error.message);
            setLoading(false);
        }
    }
    const completedProjectsHandleClick = () => {
        fetchCompletedProjectRecords()
    }
    const fetchOngoingHistoryRecord = async() => {
        setLoading(true);
        try {
            // Fetched user ID from localStorage
            const userData = localStorage.getItem('user');
            const user = JSON.parse(userData);
            const { _id } = user;

            // API call to fetch projects
            const response = await axios.post('/api/users/projectData', { _id });
            const projectsInformation = response.data.projectsInformation.onGoingProjects;
            console.log(projectsInformation,"ongoing projects")
            // Filter projects based on user ID
            const userProjects = projectsInformation.filter(
                (project) => project.ProjectId.userId === _id
            );
            console.log(userProjects,"---------------user")
            setProjectData(userProjects);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error.message);
            setLoading(false);
        }
    }
    const handleOngoingClick = () => {
        fetchOngoingHistoryRecord();
    };

    const fetchProjects = async () => {
        setLoading(true);
        try {
            // Fetched user ID from localStorage
            const userData = localStorage.getItem('user');
            const user = JSON.parse(userData);
            const { _id } = user;

            // API call to fetch projects
            const response = await axios.post('/api/users/projectData', { _id });
            const projectsInformation = response.data.projectsInformation.NewProjects;
            console.log(projectsInformation,"--------")
            // Filter projects based on user ID
            const userProjects = projectsInformation.filter(
                (project) => project.ProjectId.userId === _id
            );
            console.log(userProjects,"---------------user")
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
    const allProjectsRecords = () => {
        fetchProjects();
    }
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
                        <h1 className='text-xl p-2 flex justify-center items-center shadow-lg bg-gray-200'>
                            Your Projects Details
                        </h1>
                        <div className='flex gap-4 ml-2 py-4'>
                            <div  onClick={allProjectsRecords} className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>All</p>
                            </div>
                            <div onClick={handleOngoingClick}  className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>ongoing</p>
                            </div>
                            <div onClick={completedProjectsHandleClick}  className='py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl'>
                                <p>complete</p>
                            </div>
                        </div>
                    </div>
                    <div className='border shadow mt-4'>
                        <table className='w-full whitespace-nowrap shadow p-3'>
                            <thead>
                                <tr className='focus:outline-none h-16 border border-gray-100 rounded shadow-xl'>
                                    <th>No</th>
                                    <th>Venture Name</th>
                                    <th>Project No</th>
                                    <th>Venture Type</th>
                                    <th>Description</th>
                                    <th>Deadline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectData.map((item, i) => (
                                    <tr key={item._id} className='text-center mt-10 shadow-xl border'>
                                        <td>{i + 1}</td>
                                        <td className=''>
                                            <div className='flex items-center gap-2 ml-5'>
                                                <p>{item.ProjectId.projectInfo.ventureName}</p>
                                            </div>
                                        </td>
                                        <td className=''>{item.ProjectId.userId.slice(0,8)}</td>
                                        <td className='text-center'>{item.ProjectId.projectInfo.ventureType}</td>
                                        <td className='flex items-center justify-center gap-2'>
                                            {item.ProjectId.projectInfo.ventureDescription}
                                        </td>
                                        <td className='bg-red-200 rounded text-red-600'>
                                            {item.ProjectId.projectInfo.estimatedDeliveryDate}
                                        </td>
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

