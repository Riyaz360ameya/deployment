import React, { useState } from 'react'
import { FaCheck } from "react-icons/fa";
import ProjectInfo from './ProjectInfo';
import ProjectOverview from './ProjectOverview';
import ContactDetails from './ContactDetails';
import FileUPload from './FileUPload';
import Loading from './Loading';


const DataUpload = () => {
    const [location, setLocation] = useState(1)

    return (
        <div className='p-2 h-full'>
            <div className='h-full bg-gray-800 overflow-hidden overflow-y-scroll '>
                {/* <h1 className='text-white font-bold text-5xl'>Upload Data</h1> */}
                <div className='p-5 flex justify-around'>
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${location === 1 ? 'text-black bg-white' : 'text-white bg-slate-600'}
        grid place-items-center rounded-full text-sm md:text-3xl font-extrabold`}>
                        <p>1</p>
                    </div>
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${location === 2 ? 'text-black bg-white' : 'text-white bg-slate-600'}
        grid place-items-center rounded-full text-sm md:text-3xl font-extrabold`}>
                        <p>2</p>
                    </div>
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${location === 3 ? 'text-black bg-white' : 'text-white bg-slate-600'}
        grid place-items-center rounded-full text-sm md:text-3xl font-extrabold`}>
                        <p>3</p>
                    </div>
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${location === 4 ? 'text-black bg-white' : 'text-white bg-slate-600'}
        grid place-items-center rounded-full text-sm md:text-3xl font-extrabold`}>
                        <p>4</p>
                    </div>
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${location === 5 ? 'text-black bg-white' : 'text-white bg-slate-600'}
        grid place-items-center rounded-full text-sm md:text-3xl font-extrabold`}>
                        <p><FaCheck /></p>
                    </div>
                </div>

                <div className='p-5'>
                    {
                        location === 1 ? <ProjectInfo setLocation={setLocation} />
                            : location === 2 ? <ProjectOverview setLocation={setLocation} />
                                : location === 3 ? <ContactDetails setLocation={setLocation} />
                                    : location === 4 ? <FileUPload setLocation={setLocation} />
                                        : location === 5 && <Loading setLocation={setLocation} />
                    }
                </div>

            </div>
        </div>
    )
}

export default DataUpload