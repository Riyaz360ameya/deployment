"use client"
import React, { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import Sidebar from '../components/sidebar'
import Header from '../components/Header'
import UploadDetails from '../components/uploadDetails'
import Status from '../components/Status'
import View from '../components/View'
import Package from '../components/Package'
import ProjectInformation from '../components/ProjectInformation'
import { useSelector } from 'react-redux'
import Transaction from '../components/Transaction'
import DataUpload from '../components/DataUpload'
import Payment from '../components/Payment'

function page() {
    const [loader, setLoader] = useState(false)
    const [menu, setMenu] = useState(true)
    const [Project, setProject] = useState("New Project")
    const user = useSelector((state) => state.user.userDetails)
    console.log(user, '-----------------user 5454')
    const stopLoading = () => {
        user._id && setLoader(false)
    }
    useEffect(() => {
        stopLoading()
    }, [user._id])

    return (
        <>
            {
                loader ?
                    <div className='flex items-center justify-center h-screen bg-white bg-opacity-5 '>
                        <InfinitySpin
                            width='200'
                            color="black"
                        />
                    </div>
                    :
                    <div className='flex w-full h-screen '>
                        <Sidebar setProject={setProject} menu={menu} Project={Project} />
                        <div className="flex flex-col flex-1">
                            <Header setLoader={setLoader} setMenu={setMenu} />
                            {
                                // Project === "New Project" ? <UploadDetails />
                                Project === "New Project" ? <DataUpload />
                                    : Project === "Project Details" ? <ProjectInformation />
                                        : Project === "Project Status" ? <Status />
                                            : Project === "Transactions" ? <Payment />
                                                : Project === "Package" ? <Package />
                                                    : Project === "View" ? <View />
                                                        : ""
                            }
                        </div>
                    </div>
            }
        </>
        // <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        //     <div className="h-16 w-16 animate-spin duration-300 rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        // </div>
    )
}

export default page