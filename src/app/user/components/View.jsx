import React, { useState, useEffect } from 'react';

export default function View() {
    const [filesData, setFilesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/fetchFilesServer');
                if (!response.ok) {
                    throw new Error(`Failed to fetch files: ${response.statusText}`);
                }
                const data = await response.json();
                setFilesData(data.files || []);
            } catch (error) {
                console.error('Error fetching files:', error.message);
                setError('Failed to fetch files. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Files</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!isLoading && !error && (
                <ul>
                    {filesData.map((file, index) => (
                        <li key={index}>
                            <strong>{file.fileName}</strong>
                            <br />
                            <a
                                href={`data:application/octet-stream;base64,${file.content}`}
                                download={file.fileName}
                            >
                                Download File
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
