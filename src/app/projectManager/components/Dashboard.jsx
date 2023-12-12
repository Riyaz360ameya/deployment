import React from 'react'
import { useEffect } from 'react';
import { FaUsers } from "react-icons/fa";
import { InfinitySpin } from 'react-loader-spinner'
const Dashboard = ({ loading, setLoading }) => {
    const boardData = [
        { name: 'Total Clients', count: '150', icon: <FaUsers /> },
        { name: 'Total Projects', count: '400', icon: <FaUsers /> },
        { name: 'Ongoing Projects', count: '200', icon: <FaUsers /> },
        { name: 'Pending Projects', count: '90', icon: <FaUsers /> },
        { name: 'Completed Projects', count: '100', icon: <FaUsers /> },
        { name: 'Payment Pending', count: '10', color: 'red-600', icon: <FaUsers /> }
    ]
    const cancelLoading = () => {
        setLoading(false)
    }
    useEffect(() => {
        cancelLoading()
    }, [])

    return (
        <>
            {loading ?
                <div className='  h-full flex items-center justify-center '>
                    <div><InfinitySpin
                        width='200'
                        color="black"
                    /></div>
                </div>
                :
                <div className='p-2 h-full overflow-hidden overflow-y-scroll' >
                    <div className='text-center  p-2  flex flex-col items-start gap-5 '>
                        <div className='bg-gray-400 text-black font-bold w-[50%] rounded p-5 text-left shadow-lg '>
                            <h1 className='text-2xl'>Total Revenue</h1>
                            <h1 className='text-4xl text-right text-white'>5121.25 <span className='text-black'>cr</span></h1>
                        </div>
                        <div className='grid grid-cols-3 gap-4 w-full'>
                            {boardData.map((item, i) => {
                                return (
                                    <div className='flex items-center  justify-between  p-2 bg-slate-500 rounded px-8 shadow-lg' key={i}>
                                        <div className=''>
                                            <h1 className='font-bold text-lg'>{item.name}</h1>
                                            <p className='text-2xl font-bold text-white'>{item.count}</p>
                                        </div>
                                        <div className='text-6xl'>
                                            {item.icon}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Dashboard