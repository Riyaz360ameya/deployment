import React, { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa";
import ProjectInfo from './ProjectInfo';
import ProjectOverview from './ProjectOverview';
import ContactDetails from './ContactDetails';
import FileUPload from './FileUPload';
import Loading from './Loading';
import ImageFilesUpload from './ImageFilesUpload';


const DataUpload = () => {
    const [location, setLocation] = useState([1])
    const [width, setWidth] = useState(15)
    const addToLocation = (newValue) => {
        // Use the spread operator (...) to create a new array with the existing values and append the new value
        setLocation(prevLocation => [...prevLocation, newValue]);
    };
    const removeFromLocation = (valueToRemove) => {
        setLocation(prevLocation => prevLocation.filter(item => item !== valueToRemove));
    };
    const resetLocation = () => {
        setLocation([1])
    }
    const settingWidthProgress = () => {
        const locationsLength = location.length;
        if (locationsLength === 1) {
            setWidth(15);
        } else if (locationsLength === 2) {
            console.log('.............its worked')
            setWidth(30);
        } else if (locationsLength === 3) {
            setWidth(50);
        } else if (locationsLength === 4) {
            setWidth(70);
        } else if (locationsLength === 5) {
            setWidth(90);
        }
    }
    useEffect(() => {
        // Call settingWidthProgress in the cleanup function to ensure state is updated before rendering
        settingWidthProgress();
        // return () => {
        // };
    }, [location, width]);
    useEffect(() => {
        // Log values for debugging
        console.log('Location:', location);
        console.log('Width:', width);
    }, [location, width]);

    return (
        <div className='h-full p-2'>
            <div className='h-full overflow-hidden overflow-y-scroll bg-gray-800 '>
                {/* <h1 className='text-5xl font-bold text-white'>Upload Data</h1> */}
                <div className='flex justify-around p-5'>
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${location.includes(1) ? 'text-black bg-white' : 'text-white bg-slate-600'}
    grid place-items-center rounded-full text-sm md:text-3xl font-extrabold`}>
                        <p>1</p>
                    </div>
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${location.includes(2) ? 'text-black bg-white' : 'text-white bg-slate-600'}
    grid place-items-center rounded-full text-sm md:text-3xl font-extrabold`}>
                        <p>2</p>
                    </div>
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${location.includes(3) ? 'text-black bg-white' : 'text-white bg-slate-600'}
    grid place-items-center rounded-full text-sm md:text-3xl font-extrabold`}>
                        <p>3</p>
                    </div>
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${location.includes(4) ? 'text-black bg-white' : 'text-white bg-slate-600'}
    grid place-items-center rounded-full text-sm md:text-3xl font-extrabold`}>
                        <p>4</p>
                    </div>
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${location.includes(5) ? 'text-black bg-white' : 'text-white bg-slate-600'}
    grid place-items-center rounded-full text-sm md:text-3xl font-extrabold`}>
                        <p><FaCheck /></p>
                    </div>
                </div>
                <div className='p-5'>
                    <div className="w-full h-1 mb-6 bg-neutral-200 dark:bg-neutral-600">
                        <div className={`h-1 bg-green-500`} style={{ width: `${width}%` }}></div>
                    </div>
                </div>
                <div className='p-5'>
                    {
                        location.length == 1 ? <ProjectInfo addToLocation={addToLocation} />
                            // : location.length == 2 ? <ProjectOverview addToLocation={addToLocation} removeFromLocation={removeFromLocation} />
                            : location.length == 2 ? <ContactDetails addToLocation={addToLocation} removeFromLocation={removeFromLocation} />
                                : location.length == 3 ? <FileUPload addToLocation={addToLocation} removeFromLocation={removeFromLocation} />
                                    : location.length == 4 ? <ImageFilesUpload addToLocation={addToLocation} removeFromLocation={removeFromLocation} />
                                        : location.length == 5 && <Loading resetLocation={resetLocation} />
                    }
                </div>

            </div>
        </div>
    )
}

export default DataUpload