import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const Loading = ({ resetLocation }) => {
    return (
        <div className='flex flex-col  items-center justify-center h-96 bg-slate-600 rounded '>
            {/* <div> */}
            <InfinitySpin width='200' color='white' />
            {/* </div> */}
            <button className='p-2 font-bold text-white bg-yellow-400 rounded' onClick={()=>resetLocation()} >Completed</button>
        </div>
    )
}

export default Loading