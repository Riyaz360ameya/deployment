"use client";
import CardDataStats from "@/app/projectManager/components/CardDataStats";
import React from "react";

const page = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG path */}
          </svg>
        </CardDataStats>
        <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG path */}
          </svg>
        </CardDataStats>
        <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG path */}
          </svg>
        </CardDataStats>
        <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG path */}
          </svg>
        </CardDataStats>
        {/* Similar CardDataStats components with different props */}
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree/> */}
        {/* <MapOne /> */}
        {/* <div className="col-span-12 xl:col-span-8"> */}
          {/* <TableOne /> */}
        {/* </div> */}
        {/* <ChatCard /> */}
      {/* </div> */}
    </>
  );
};

export default page;

// import React, { useEffect, useState } from 'react'
// import Projects from '../components/Projects'
// import Developers from '../components/Developers'
// import Calender from '../components/Calender'

// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
// const page = () => {
//     const [loader, setLoader] = useState(false)
//     const [menu, setMenu] = useState(true)

//     const [Project, setProject] = useState("Projects")
    
//     return (
//         <>
//             <div className='h-screen flex w-full '>
//                 <Sidebar setProject={setProject} menu={menu} Projects={Project} />
//                 <div className="flex flex-col flex-1">
//                     <Header setLoader={setLoader} menu={menu} setMenu={setMenu} />
//                     {
//                         Project === "Projects" ? <Projects  />
//                             : Project === "Developers" ? <Developers />
//                                 : Project === "Calender" ? <Calender />
//                                     : ""
//                     }
//                 </div>
//             </div>
//         </>
//     )
// }
// export default page