import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const Loading = ({ setLocation }) => {
    return (
        <div className='h-96 flex items-center justify-center '>
            {/* <div> */}
            <InfinitySpin width='200' color='white' />
            {/* </div> */}
            <button className='bg-yellow-400 p-2 rounded text-white font-bold' onClick={() => setLocation(1)} >Completed</button>
        </div>
    )
}

export default Loading