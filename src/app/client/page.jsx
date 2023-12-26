"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import UploadDetails from '../components/uploadDetails'
import Header from '../components/Header'
import { InfinitySpin } from 'react-loader-spinner'
import Status from '../components/Status'
import Payment from '../components/Payment'
import View from '../components/View'
import Package from '../components/Package'
import ClientInformation from '../components/ClientInformation'
function page() {
    const [loader, setLoader] = useState(false)
    const [menu, setMenu] = useState(true)
    const [Project, setProject] = useState("New Project")
    return (

        <>
            {
                loader ?
                    <div className='h-screen bg-white bg-opacity-5 flex items-center justify-center '>
                        <InfinitySpin
                            width='200'
                            color="black"
                        />
                    </div>
                    :
                    <div className='h-screen flex w-full '>
                        <Sidebar setProject={setProject} menu={menu} />
                        <div className="flex flex-col flex-1">
                            <Header setLoader={setLoader} setMenu={setMenu} />
                            {
                                Project === "New Project" ? <UploadDetails />
                                    : Project === "Project Details" ? <ClientInformation/>
                                    : Project === "Project Status" ? <Status />
                                            : Project === "Payment" ? <Payment />
                                                : Project === "View" ? <View />
                                                    : Project === "Package" ? <Package/>
                                                        : ""
                            }

                        </div>
                    </div>
            }
        </>


    )
}

export default page