"use client"
import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import Projects from '../components/Projects'
import Leads from '../components/Leads'
import Developers from '../components/Developers'
import Charts from '../components/Charts'
import Calender from '../components/Calender'
import Clients from '../components/Clients'
import Authorization from '../components/Authorization'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { pmAllProjects } from '../pmAPIs/projectApis'
import { useDispatch } from 'react-redux'
import { pmCompletedProjects, pmNewProjects, pmOngoingProjects } from '@/app/redux/projectManager/pmProSlice'
const page = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    const [menu, setMenu] = useState(true)
    const [Project, setProject] = useState("Projects")
    const [loading, setLoading] = useState(true);

    const getAllPmProjects = async() => {
        setLoading(true);
        try {
            const { data } = await pmAllProjects()
            dispatch(pmNewProjects(data.PmProjects.newProjects))
            dispatch(pmOngoingProjects(data.PmProjects.onGoingProjects))
            dispatch(pmCompletedProjects(data.PmProjects.completedProjects))
            // setProjects(data.PmProjects.newProjects)
            console.log(data.PmProjects.newProjects[0], '------------------new One')
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        getAllPmProjects()
    }, [])

    return (
        <>
            <div className='h-screen flex w-full '>
                <Sidebar setLoading={setLoading} Project={Project} setProject={setProject} menu={menu} />
                <div className="flex flex-col flex-1">
                    <Header setLoader={setLoader} menu={menu} setMenu={setMenu} />
                    {
                        Project === "Dashboard" ? <Dashboard loading={loading} setLoading={setLoading} />
                            : Project === "Projects" ? <Projects loading={loading} setLoading={setLoading} />
                                : Project === "Team Leads" ? <Leads loading={loading} setLoading={setLoading} />
                                    : Project === "Developers" ? <Developers loading={loading} setLoading={setLoading} />
                                        : Project === "Calender" ? <Calender loading={loading} setLoading={setLoading} />
                                            : Project === "Clients" ? <Clients loading={loading} setLoading={setLoading} />
                                                : Project === "Charts" ? <Charts loading={loading} setLoading={setLoading} />
                                                    : Project === "Authorization" ? <Authorization loading={loading} setLoading={setLoading} />
                                                        : ""
                    }
                </div>
            </div>
        </>
    )
}
export default page

// "use client"
// import React, { useState } from 'react';
// import Dashboard from '../components/Dashboard';
// import Projects from '../components/Projects';
// import Leads from '../components/Leads';
// import Developers from '../components/Developers';
// import Charts from '../components/Charts';
// import Calender from '../components/Calender';
// import Clients from '../components/Clients';
// import Authorization from '../components/Authorization';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';

// const pageComponents = {
//     Dashboard,
//     Projects,
//     'Team Leads': Leads,
//     Developers,
//     Calender,
//     Clients,
//     Charts,
//     Authorization,
// };

// const Page = () => {
//     const [loader, setLoader] = useState(false);
//     const [menu, setMenu] = useState(true);
//     const [project, setProject] = useState("Projects");
//     const [loading, setLoading] = useState(true);

//     const PageComponent = pageComponents[project];

//     return (
//         <>
//             <div className='h-screen flex w-full '>
//                 <Sidebar setLoading={setLoading} Project={project} setProject={setProject} menu={menu} />
//                 <div className="flex flex-col flex-1">
//                     <Header setLoader={setLoader} menu={menu} setMenu={setMenu} />
//                     {PageComponent && <PageComponent loading={loading} setLoading={setLoading} />}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Page;
