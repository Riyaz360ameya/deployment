import React from 'react';
import { useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner'

function Charts({ loading, setLoading }) {
  const handleHover = () => {
    const popover = document.getElementById('popover-hover');
    popover.style.visibility = 'visible';
    popover.style.opacity = '1';
  };

  const handleLeave = () => {
    const popover = document.getElementById('popover-hover');
    popover.style.visibility = 'hidden';
    popover.style.opacity = '0';
  };
  const cancelLoading = () => {
    setLoading(false)
  }
  useEffect(() => {
    cancelLoading()
  }, [])

  return (
    <>
      {loading ?
        <div className='  h-full flex items-center justify-center '>
          <div><InfinitySpin
            width='200'
            color="black"
          /></div>
        </div>
        :
        <div>
          <p>Charts</p>
          <button
            data-popover-target="popover-hover"
            data-popover-trigger="hover"
            type="button"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Hover popover
          </button>

          <div
            id="popover-hover"
            role="tooltip"
            className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Popover hover</h3>
            </div>
            <div className="px-3 py-2">
              <p>And here's some amazing content. It's very engaging. Right?</p>
            </div>
            <div data-popper-arrow></div>
          </div>
        </div>
      }
    </>
  );
}

export default Charts;
