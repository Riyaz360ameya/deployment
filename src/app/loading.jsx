"use client"
import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const loading = () => {
    return (
        <main className='h-screen bg-white bg-opacity-5 flex items-center justify-center '>
            <InfinitySpin
                width='200'
                color="black"
            />
        </main>
    )
}

export default loading