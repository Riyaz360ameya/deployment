import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const Loading = ({ resetLocation, success }) => {
    return (
        <div className='flex flex-col  items-center justify-center h-96 bg-slate-600 rounded '>
            {
                success ? <p className='text-2xl font-bold text-white'>Upload Success</p>: <InfinitySpin width='200' color='white' />
            }
            <button className='px-2 py-1 font-bold text-white bg-yellow-400 rounded mt-5' onClick={() => resetLocation()} >reset</button>
        </div>
    )
}

export default Loading