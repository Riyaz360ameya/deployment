import React, { useEffect } from 'react';

const DevTaskOptions = ({ developers, task, setTask, workType }) => {
    // useEffect to update selected developers whenever task changes
    // useEffect(() => {
    //     console.log(task.selectedDvs); // Check if selected developers are being updated properly
    // }, [task.selectedDvs]);

    // Selecting the developers
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        // If checked, add the value to selectedDvs; otherwise, remove it
        if (checked) {
            if (!task.selectedDvs.includes(value)) {
                setTask((prevTask) => ({
                    ...prevTask,
                    selectedDvs: [...prevTask.selectedDvs, value],
                }));
            }
            console.log(task, '------checked-------task');
        } else {
            setTask((prevTask) => ({
                ...prevTask,
                selectedDvs: prevTask.selectedDvs.filter((devId) => devId !== value),
            }));
            console.log(task, '-------not checked------task');
        }
    };

    const filteredDevelopers = developers.filter((item) => item.roles.includes(workType));

    return (
        <div className=''>
            <div>
                {/* <div className='text-left text-sm'>
                <label className='font-bold' htmlFor='team'>
                    Select Developer
                </label>
                <select
                    name='developer'
                    value={task.developer || ""} // Set the initial value based on the first item in the array
                    id='developer'
                    className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md dark:text-black'
                    onChange={(e) => setTask({ ...task, developer: e.target.value })}
                    required
                >
                    <option value="" className="uppercase" disabled defaultValue  >
                        Choose  Developer
                    </option>
                    {filteredDevelopers.length > 0 ? (
                        filteredDevelopers.map((item, i) => (
                            <option key={i} value={item._id} className="uppercase">
                                {item.firstName} {item.lastName}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No developers found</option>
                    )}
                </select>
             </div> */}
                <label className='font-bold' htmlFor='developer'>
                    Select Developer
                </label>
                <div className='grid gap-2 grid-cols-2'>
                    {filteredDevelopers.length > 0 ? (
                        filteredDevelopers.map((item, i) => (
                            <div className="flex items-center" key={item._id}>
                                <input
                                    id={`checkbox-${item._id}`}
                                    type="checkbox"
                                    value={item._id}
                                    checked={task.selectedDvs.includes(item._id)} // Add checked prop
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor={`checkbox-${item._id}`} className="ms-2 text-sm font-extrabold text-gray-900 dark:text-white">
                                    {item.firstName} {item.lastName}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>No developers found</p>
                    )}
                </div>
            </div>
            <div className='text-left text-sm mt-2'>
                <label className='font-bold' htmlFor="">Importance</label>
                <select
                    value={task.importance || ""}
                    name='importance'
                    id='importance'
                    className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md dark:text-black'
                    onChange={(e) => setTask({ ...task, importance: e.target.value })}
                    required
                >
                    <option value="" className="uppercase" disabled defaultValue >
                        Choose Type
                    </option>
                    <option value="REGULAR" className="uppercase" >
                        REGULAR
                    </option>
                    <option value="MEDIUM" className="uppercase">
                        MEDIUM
                    </option>
                    <option value="URGENT" className="uppercase">
                        URGENT
                    </option>
                </select>
            </div>
            <div className='text-left text-sm mt-2'>
                <label className='font-bold' htmlFor="">Task Title</label>
                <input type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md dark:text-black'
                    id='projectTitle'
                    value={task.projectTitle}
                    onChange={(e) => setTask({ ...task, projectTitle: e.target.value })}
                    required
                />
            </div>
            <div className='text-left text-sm mt-2'>
                <label className='font-bold' htmlFor="">Description</label>
                <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md dark:text-black'
                    id='description'
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    required
                />
            </div>
            <div className='flex justify-between gap-2 mt-2'>
                <div className='text-left text-sm w-full '>
                    <label className='font-bold' htmlFor="">Start Date</label>
                    <input
                        type="date"
                        className='w-full border border-gray-400  bg-gray-200 outline-none p-2 rounded-md dark:text-black'
                        id='startDate'
                        value={task.startDate}
                        min={task.startDate}
                        onChange={(e) => setTask({ ...task, startDate: e.target.value })}
                        required
                    />
                </div>
                <div className='text-left text-sm w-full '>
                    <label className='font-bold' htmlFor="">Estimated Due Date</label>
                    <input
                        type="date"
                        className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md dark:text-black'
                        id='endDate'
                        onChange={(e) => setTask({ ...task, endDate: e.target.value })}
                        required
                        value={task.endDate}
                    />
                </div>
            </div>
            <div className='text-left text-sm mt-2'>
                <label className='font-bold' htmlFor="">Instruction to the Developer</label>
                <textarea type="text" className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md dark:text-black'
                    id='instruction'
                    value={task.instruction}
                    onChange={(e) => setTask({ ...task, instruction: e.target.value })}
                    required
                />
            </div>
        </div>
    )
}

export default DevTaskOptions