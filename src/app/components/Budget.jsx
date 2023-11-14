import React, { useState } from 'react'

const Budgets = () => {

    const [interior, setInterior] = useState(0)
    const [exterior, setExterior] = useState(0)
    const [video, setVideo] = useState(0)
    const [totalInterior, setTotalInterior] = useState(0)
    const [totalExterior, setTotalExterior] = useState(0)
    const [totalVideo, setTotalVideo] = useState(0)
    const interiorValue = 35000;
    const exteriorValue = 25000;
    const videoValue = 5000;

    const interiorCalculation = (e) => {
        const inputValue = e.target.value;
        setInterior(inputValue);
        console.log(interior,'-------',interiorValue)
        const calculatedValue = inputValue * interiorValue;
        setTotalInterior(calculatedValue)
    }
    const exteriorCalculation = (e) => {
        const inputValue = e.target.value;
        setExterior(inputValue);
        const calculatedValue = inputValue * exteriorValue;
        setTotalExterior(calculatedValue)
    }
    const videoCalculation = (e) => {
        const inputValue = e.target.value;
        setVideo(inputValue);
        const calculatedValue = inputValue * videoValue;
        setTotalVideo(calculatedValue)
    }

    return (


        <div>
            <p className='text-lg font-bold text-left text-red-700'>
                Budget
            </p>
            <div className='text-left'>
                <label className='font-bold text-green-900' >Interior</label>
                <div className='flex justify-between gap-5'>
                    <div>
                        <label>No of view </label>
                        <input
                            type='number'
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            placeholder='No of Views'
                            onChange={interiorCalculation}
                        />
                    </div>
                    {/* <div>
                        <label>Cost Per View </label>
                        <input
                            type='number'
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            value={interiorValue}
                            readOnly
                        />
                    </div> */}
                    <div>
                        <label>Total in INR</label>
                        <input
                            type='number'
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            readOnly
                            value={totalInterior}
                        />
                    </div>
                </div>
            </div>
            <div className='text-left'>
                <label className='font-bold text-amber-900' >Exterior</label>
                <div className='flex justify-between gap-5'>
                    <div>
                        <label>No of view </label>
                        <input
                            type='number'
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            placeholder='No of Views'
                            onChange={exteriorCalculation}
                        />
                    </div>
                    {/* <div>
                        <label>Cost Per View </label>
                        <input
                            type='number'
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            value={exteriorValue}
                            readOnly
                        />
                    </div> */}
                    <div>
                        <label>Total in INR</label>
                        <input
                            type='number'
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            readOnly
                            value={totalExterior}
                        />
                    </div>
                </div>
            </div>
            <div className='text-left'>
                <label className='font-bold text-yellow-800' >Video</label>
                <div className='flex justify-between gap-5'>
                    <div>
                        <label>No of Mints</label>
                        <input
                            type='number'
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            placeholder='Minute'
                            onChange={videoCalculation}
                        />
                    </div>
                    {/* <div>
                        <label>Cost Per Mints</label>
                        <input
                            type='number'
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            value={videoValue}
                            readOnly
                        />
                    </div> */}
                    <div>
                        <label>Total in INR</label>
                        <input
                            type='number'
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            readOnly
                            value={totalVideo}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Budgets