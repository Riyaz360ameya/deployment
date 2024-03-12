import React from 'react'
import { Chart } from "react-google-charts";


export const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
];

export const options = {
    pieHole: 0.4,
    is3D: true,
};


function DashboardCard03() {
    return (
        <div className='flex gap-4 justify-between '>
            <div>
                <h1 className='text-2xl'>Total Revenue</h1>
                <h1 className='text-4xl text-right text-white'> <span className='text-black'>2340004.68cr</span></h1>
            </div>
           
        </div>
    )
}

export default DashboardCard03