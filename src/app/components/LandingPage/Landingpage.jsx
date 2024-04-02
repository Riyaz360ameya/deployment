import React from 'react';

function LandingPage({ title, content, onClose }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to our project Management tool</h1>
        <p className="text-lg">Coming soon😊</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
      </div>
    </div>
  );
}

export default LandingPage;
