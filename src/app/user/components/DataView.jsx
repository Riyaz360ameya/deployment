import React from 'react'

const DataView = ({ setView, allData }) => {
    console.log(allData, '---------------allData')
    const onClose = () => {
        setView(false)
    }
    const handleClose = (e) => {
        console.log('Event:', e);
        console.log('Target ID:', e.target.id);
        if (e.target.id === "payment") {
            onClose();
        }
    }

    return (
        <>
            <div
                id='payment'
                onClick={handleClose}
                className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm '>
                <div className='grid gap-3 p-8 rounded bg-gradient-to-r from-black to-gray-800 '>
                    <h1 className='text-xl text-center text-white'>{allData.ProjectId.projectInfo.ventureName}</h1>
                    <h1 className='text-xl text-center text-white'>{allData.ProjectId.projectInfo.ventureType}</h1>
                    <div className='flex justify-between'>
                        <button className='px-5 py-2 font-bold text-white rounded bg-gradient-to-r from-red-500'onClick={handleClose} >No</button>
                        <button className='px-5 py-2 font-bold text-white rounded bg-gradient-to-l from-green-500' onClick={handleClose} >OK</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataView