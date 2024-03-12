import React from 'react'
import { Chart } from "react-google-charts";
import DashboardCard02 from './DashboardCard02';
export const data = [
    ["Task", "Hours per Day"],
    ["ongoing Projects", 11],
    ["delayed projects", 2],
    ["Completed Projects", 2],
   
];
export const options = {
    title: "Projects",
};
function DashboardCard01() {
    return (
        <div>
            <div className="flex">
                <div className=' text-black font-bold w-[50%] rounded p-5 text-left shadow-lg'>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"100%"}
                        height={"400px"}
                    />
                </div>
               <DashboardCard02/>
            </div>
        </div>
    )
}

export default DashboardCard01