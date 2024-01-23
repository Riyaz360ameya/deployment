import React from 'react'

const Payment = () => {
    return (
        <div className='p-2 h-full'>
            <div className='h-full bg-gray-800 flex gap-2 items-start p-2'>
                <div className='bg-black text-white text-center p-5 rounded'>
                    <div className='p-2'>
                        <h1>Project Name</h1>
                        <p>Project No</p>
                    </div>
                    <div className='grid gap-3'>
                        <div className='bg-gradient-to-r from-red-600 to-red-800 p-2 rounded'
                        //  className='bg-gradient-to-r from-red-400 to-gray-500  hover:from-pink-500 hover:to-yellow-500 p-2 rounded'
                        >
                            <p className='text-xl font-bold shadow-lg'>Payment is Not Done</p>
                        </div>
                        <div className=' bg-gradient-to-l from-green-500  p-2 rounded'>
                            <button>Make the Payment</button>
                        </div>
                    </div>
                </div>
                <div className='bg-black text-white text-center p-5 rounded'>
                    <div className='p-2'>
                        <h1>Project Name</h1>
                        <p>Project No</p>
                    </div>
                    <div className='grid gap-3'>
                        <div className='bg-gradient-to-r from-red-600 to-yellow-500 p-2 rounded'
                        //  className='bg-gradient-to-r from-red-400 to-gray-500  hover:from-pink-500 hover:to-yellow-500 p-2 rounded'
                        >
                            <p className='text-xl font-bold shadow-lg'>50% Payment is Done</p>
                        </div>
                        <div className=' bg-gradient-to-l from-green-500  p-2 rounded'>
                            <button>Make the Payment</button>
                        </div>
                    </div>

                </div>
                <div className='bg-black text-white text-center p-5 rounded'>
                    <div className='p-2'>
                        <h1>Project Name</h1>
                        <p>Project No</p>
                    </div>
                    <div className='bg-gradient-to-r from-gray-600 to-gray-900 p-5 rounded'
                    >
                        <p className='text-xl font-bold shadow-lg'>Payment is Completed</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Payment