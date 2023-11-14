"use client"
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import UploadDetails from '../components/uploadDetails'
import Header from '../components/Header'
import { InfinitySpin } from 'react-loader-spinner'

function page() {
    const [loader, setLoader] = useState(false)
    const [menu, setMenu] = useState(false)
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
                    <div className='h-screen bg-slate-500 '>
                        <div className='flex'>
                            <Sidebar menu={menu} />
                            <div className="flex flex-col flex-1">
                                <Header setLoader={setLoader} setMenu={setMenu} />
                                <UploadDetails />

                            </div>
                        </div>
                    </div>
            }
        </>


    )
}

export default page