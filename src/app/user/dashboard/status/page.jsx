import React from 'react'
const Status = () => {
    const d1 = [
        "Project manager assignment",
        "Project scoping",
        "Document validation",
        "SLA sign off",
        "Payment I",
    ]
    const d2 = [
        "Designer picked up",
        "In Development",
        "Design Review",
        "SLA sign off",
        "Quality control",
    ]
    const d3 = [
        "Files uploaded",
        "CSAT",
        "Payment II",
    ]
    return (
        <div className='p-2 h-full' >
            <div className='text-center bg-gray-800 p-2 flex flex-col items-center border  h-full'>
                <h1 className='text-xl  font-semibold md:text-3xl text-white'>Project 6 Status</h1>
                <div className='flex gap-10 w-full'>
                    <div className='flex max-h-[300px] md:max-h-[480px] overflow-hidden ' >
                        <div className='space-y-5 cursor-pointer p-2 overflow-x-hidden ' >
                            <div className='w-10 h-10 md:w-14 md:h-14 text-white bg-slate-600 flex items-center justify-center rounded-full text-sm md:text-xl font-extrabold'>
                                <p>Pro 6</p>
                            </div>
                            <div className='w-10 h-10 md:w-14 md:h-14 bg-slate-100 flex items-center justify-center rounded-full text-sm md:text-xl font-extrabold'>
                                <p>Pro 5</p>
                            </div>
                            <div className='w-10 h-10 md:w-14 md:h-14 bg-slate-100 flex items-center justify-center rounded-full text-sm md:text-xl font-extrabold'>
                                <p>Pro 4</p>
                            </div>
                            <div className='w-10 h-10 md:w-14 md:h-14 bg-slate-100 flex items-center justify-center rounded-full text-sm md:text-xl font-extrabold'>
                                <p>Pro 3</p>
                            </div>
                            <div className='w-10 h-10 md:w-14 md:h-14 bg-slate-100 flex items-center justify-center rounded-full text-sm md:text-xl font-extrabold'>
                                <p>Pro 2</p>
                            </div>
                            <div className='w-10 h-10 md:w-14 md:h-14 bg-slate-100 flex items-center justify-center rounded-full text-sm md:text-xl font-extrabold'>
                                <p>Pro 1</p>
                            </div>
                        </div>
                    </div>
                    <div className=' w-full flex flex-col justify-around ' >
                        <div className='flex gap-2 items-center justify-around'>
                            <div className='w-10 h-10 md:w-28 md:h-28 text-white bg-slate-500 flex items-center justify-center rounded-full text-sm md:text-base font-extrabold'>
                                <p>Project kick off</p>
                            </div>
                            <div className='w-10 h-10 md:w-28 md:h-28 text-white  bg-slate-500 flex items-center justify-center rounded-full text-sm md:text-base font-extrabold'>
                                <p>In progress</p>
                            </div>
                            <div className='w-10 h-10 md:w-28 md:h-28 bg-slate-100 flex items-center justify-center rounded-full text-sm md:text-base font-extrabold'>
                                <p>Ready to Deliver</p>
                            </div>
                            <div className='w-10 h-10 md:w-28 md:h-28 bg-slate-100 flex items-center justify-center rounded-full text-sm md:text-base font-extrabold'>
                                <p>Completed</p>
                            </div>
                        </div>
                        <div className="w-full bg-white h-4 rounded-full mt-5 flex border border-black">
                            <div className="w-[45%] bg-green-500 h-3.5  text-white  text-center leading-8 rounded-full">
                                <p className='text-xs'>45%</p>
                            </div>
                        </div>
                        <div className=' flex justify-around'>
                            <div>
                                {
                                    d1.map((item, i) => {
                                        return (
                                            <div key={i} className='flex gap-2 text-lg'>
                                                <input type="checkbox" />
                                                <label htmlFor="" className=' text-white'>{item}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                {
                                    d2.map((item, i) => {
                                        return (
                                            <div key={i} className='flex gap-2 text-lg'>
                                                <input type="checkbox" />
                                                <label htmlFor="" className=' text-white'>{item}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                {
                                    d3.map((item, i) => {
                                        return (
                                            <div key={i} className='flex gap-2 text-lg'>
                                                <input type="checkbox" />
                                                <label htmlFor="" className=' text-white'>{item}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Status