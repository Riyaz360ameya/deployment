import React from 'react'
const Package = () => {
    return (
        <div className='p-2 bg-gray h-full' >
            <div className='text-center bg-gray-800 p-2 flex flex-col items-center border border-red-400 gap-2 h-full'>
                <h1 className='text-xl  font-semibold md:text-3xl text-white'>Price List</h1>
                <div className="flex justify-between items-center gap-3">
                    <div className="bg-gradient-to-r from-blue-900 to-gray-500 rounded p-3 w-[350px]  text-center flex flex-col items-center justify-around">
                        <h1 className='text-xl  font-semibold md:text-3xl'>Basic</h1>
                        <div className='h-1 w-full rounded-full bg-white shadow-2xl shadow-red-500'></div>
                        <div>
                            <div className='flex items-center justify-between gap-4'>
                                <h1 className='text-[100px] text-white'>₹ </h1>
                                <h1 className='text-4xl font-bold  '>4.8 lakhs <br /> <span className='text-sm text-white'>special price</span></h1>
                            </div>
                            <div className='flex gap-3 items-center justify-center'>
                                <div className='flex flex-col gap-3'>
                                    <input type="checkbox" checked readOnly className='w-5 h-5' />
                                    <input type="checkbox" checked readOnly className='w-5 h-5' />
                                    <input type="checkbox" checked readOnly className='w-5 h-5' />
                                </div>
                                <div>
                                    <h2 className='text-2xl font-bold '>12</h2>
                                    <h2 className='text-2xl font-bold '>5</h2>
                                    <h2 className='text-2xl font-bold '>1</h2>
                                </div>
                                <div>
                                    <h2 className='text-2xl font-bold '>Exterior</h2>
                                    <h2 className='text-2xl font-bold '>Interior</h2>
                                    <h2 className='text-2xl font-bold '>Video</h2>
                                </div>
                            </div>
                        </div>
                        <button className='px-5 py-2 rounded-full font-extrabold mt-2 bg-white'
                            style={{ boxShadow: '0 0 5px 0px rgba(255, 255, 255, 1)' }}
                        >Get Stated</button>
                    </div>
                    <div className="bg-gradient-to-r from-blue-900 to-gray-500 rounded p-3 w-[350px]  text-center flex flex-col items-center justify-around">
                        <h1 className='text-xl  font-semibold md:text-3xl'>Standard</h1>
                        <div className='h-1 w-full rounded-full bg-white shadow-2xl shadow-red-500'></div>
                        <div>
                            <div className='flex items-center justify-between gap-4'>
                                <h1 className='text-[100px] text-white'>₹ </h1>
                                <h1 className='text-4xl font-bold  '>9.15 lakhs <br /> <span className='text-sm text-white'>special price</span></h1>
                            </div>
                            <div className='flex gap-3 items-center justify-center'>
                                <div className='flex flex-col gap-3'>
                                    <input type="checkbox" checked readOnly className='w-5 h-5' />
                                    <input type="checkbox" checked readOnly className='w-5 h-5' />
                                    <input type="checkbox" checked readOnly className='w-5 h-5' />
                                </div>
                                <div>
                                    <h2 className='text-2xl font-bold '>25</h2>
                                    <h2 className='text-2xl font-bold '>8</h2>
                                    <h2 className='text-2xl font-bold '>2</h2>
                                </div>
                                <div>
                                    <h2 className='text-2xl font-bold '>Exterior</h2>
                                    <h2 className='text-2xl font-bold '>Interior</h2>
                                    <h2 className='text-2xl font-bold '>Video</h2>
                                </div>
                            </div>
                        </div>
                        <button className='px-5 py-2 rounded-full font-extrabold mt-2 bg-white'
                            style={{ boxShadow: '0 0 5px 0px rgba(255, 255, 255, 1)' }}
                        >Get Stated</button>
                    </div>
                    <div className="bg-gradient-to-r from-blue-900 to-gray-500 rounded p-3 w-[350px] h-[358px]  text-center flex flex-col items-center ">
                        <h1 className='text-xl  font-semibold md:text-3xl'>Premium</h1>
                        <div className='h-1 w-full rounded-full bg-white shadow-2xl shadow-red-500'></div>
                        <div className='flex flex-col justify-between h-full'>
                            <div className='flex items-center justify-between gap-4'>
                                <h1 className='text-[100px] text-white'>₹ </h1>
                                <h1 className='text-4xl font-bold  '>*** <br /> <span className='text-sm text-white'>special price</span></h1>
                            </div>
                            <div className='flex gap-3 items-center justify-center'>
                                <h1 className='text-red-500 font-bold text-4xl'>Customize</h1>
                            </div>
                            <div>
                                <button className='px-5 py-2 rounded-full font-extrabold mt-2 bottom-0 bg-white'
                                    style={{ boxShadow: '0 0 5px 0px rgba(255, 255, 255, 1)' }}
                                >Get Stated</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="bg-orange-500 rounded p-3 mt-3">
                    <div>
                        <h2 className='text-white'>Choose What You Need</h2>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
export default Package