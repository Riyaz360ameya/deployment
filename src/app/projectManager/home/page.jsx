"use client"
import React, { useState } from 'react'
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
const page = () => {
    const [loader, setLoader] = useState(false)
    const [menu, setMenu] = useState(true)
    const [Project, setProject] = useState("Team Leads")
    const [loading, setLoading] = useState(true);
    return (
        <>
            <div className='h-screen flex w-full '>
                <Sidebar setLoading={setLoading}  Project={Project} setProject={setProject} menu={menu} />
                <div className="flex flex-col flex-1">
                    <Header setLoader={setLoader} menu={menu} setMenu={setMenu} />
                    {
                        Project === "Dashboard" ? <Dashboard loading={loading} setLoading={setLoading}  />
                            : Project === "Projects" ? <Projects loading={loading} setLoading={setLoading}  />
                                : Project === "Team Leads" ? <Leads loading={loading} setLoading={setLoading} />
                                    : Project === "Developers" ? <Developers loading={loading} setLoading={setLoading}  />
                                        : Project === "Calender" ? <Calender loading={loading} setLoading={setLoading}  />
                                            : Project === "Clients" ? <Clients loading={loading} setLoading={setLoading}  />
                                                : Project === "Charts" ? <Charts loading={loading} setLoading={setLoading}  />
                                                    : Project === "Authorization" ? <Authorization loading={loading} setLoading={setLoading}  />
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
