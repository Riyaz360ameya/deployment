import React, { useEffect } from 'react';

const SelectFiles = ({ task, setTask, filesData }) => {
    // useEffect(() => {
    //     console.log(task.selectedFiles); 
    // }, [task.selectedFiles]);

    const handleCheckboxFilesChange = (e, folderName) => {
        const { value, checked } = e.target;
        // If checked, add the value to selectedFiles; otherwise, remove it
        if (checked) {
            setTask((prevTask) => {
                const folderIndex = prevTask.selectedFiles.findIndex(folder => folder.folderName === folderName);
                if (folderIndex !== -1) {
                    // If folder already exists, add fileName to existing folder
                    return {
                        ...prevTask,
                        selectedFiles: prevTask.selectedFiles.map((folder, index) => {
                            if (index === folderIndex) {
                                return {
                                    ...folder,
                                    files: [...folder.files, value]
                                };
                            }
                            return folder;
                        })
                    };
                } else {
                    // If folder doesn't exist, add a new folder entry
                    return {
                        ...prevTask,
                        selectedFiles: [
                            ...prevTask.selectedFiles,
                            {
                                folderName: folderName,
                                files: [value]
                            }
                        ]
                    };
                }
            });
        } else {
            setTask((prevTask) => ({
                ...prevTask,
                selectedFiles: prevTask.selectedFiles.map(folder => {
                    if (folder.folderName === folderName) {
                        return {
                            ...folder,
                            files: folder.files.filter(fileName => fileName !== value)
                        };
                    }
                    return folder;
                })
            }));
        }
    };
    return (
        <div>
            {filesData.length > 0 ? (
                filesData.map((file, i) => (
                    <div key={i}>
                        <div className="">
                            <div className='flex justify-between'>
                                <h2 className='text-lg font-bold text-black'>Data Uploaded: {file.folderName}</h2>
                            </div>
                            <hr />
                            <div className=''>
                                {file.data.map((item, j) => (
                                    <div className='bg-white dark:bg-boxdark dark:text-white flex items-center gap-3 py-1' key={j}>
                                        <input
                                            id={`checkbox-${item.fileName}`}
                                            type="checkbox"
                                            value={item.fileName}
                                            checked={task.selectedFiles.some((folder) => folder.folderName === file.folderName && folder.files.includes(item.fileName))}
                                            onChange={(e) => handleCheckboxFilesChange(e, file.folderName)} // Pass folderName here
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor={`checkbox-${item.fileName}`} className="text-gray-900 dark:text-white">{item.fileName}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No developers found</p>
            )}
        </div>
    );
};

export default SelectFiles;



