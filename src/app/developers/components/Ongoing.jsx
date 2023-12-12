import React, { useState } from 'react';
import Completed from './Completed';

function Ongoing() {
  const [showcomplete, setShowcomplete] = useState(false);

  const handleStartClick = () => {
    setShowcomplete(true);
  };

  return (
    <div className='flex justify-center'>
      <button
        className='bg-green-800 text-white px-4 py-1 rounded'
        onClick={handleStartClick}
      >
        Completed
      </button>

      {showcomplete ? <Completed /> : ''}
    </div>
  );
}

export default Ongoing;
