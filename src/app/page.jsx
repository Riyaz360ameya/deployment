'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Home = () => {
    const route = useRouter()
    const handleLogin = () => {
        route.push('/user/login')
    }
    return (
        <main className='flex items-center justify-center h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 '>
            <div className='flex items-center flex-col'>
                <h1 className='text-[100px] text-white font-extrabold'>AMEYA360.in</h1>
                <button className='bg-blue-800 rounded text-white font-bold px-4 py-2'
                    onClick={handleLogin}
                >
                    Signin ✌️
                </button>
            </div>
        </main>
    )
}

export default Home

