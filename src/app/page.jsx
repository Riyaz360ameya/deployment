'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Home = () => {
    const route = useRouter()
    const handleLogin = () => {
        route.push('/user/login')
    }
    const handleSignUp = () => {
        route.push('/user/register')
    }
    return (
        <main className='flex items-center justify-center h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 '>
            <div className='flex items-center flex-col'>
                {/* <h1 className='text-[100px] text-white font-extrabold'>AMEYA360.in</h1> */}
                <h1 className='text-[100px] text-white font-extrabold'>blocs.in</h1>
                <h1 className='text-[100px] text-white font-extrabold'>StudioBlocs.in</h1>
                <div className='flex items-center  gap-5'>
                    <button
                        className="text-base  hover:scale-125 focus:outline-none flex justify-center px-2 py-1 md:px-4 md:py-2 rounded font-bold cursor-pointer  hover:bg-blue-700  bg-blue-800 text-white  border duration-500 ease-in-out  border-blue-800 transition"
                        onClick={handleLogin}
                    >
                        Login ✌️
                    </button>
                    <button
                        className="text-base  hover:scale-125 focus:outline-none flex justify-center px-2 py-1 md:px-4 md:py-2 rounded font-bold cursor-pointer  hover:bg-blue-700  bg-blue-800 text-white  border duration-300 ease-in-out  border-blue-800 transition"
                        onClick={handleSignUp}
                    >
                        Signup 😃
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Home

