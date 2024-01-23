"use client"
import React from 'react'

function page() {
  return (
    <>
      <div className='flex justify-center align-items-center py-5'>
        <h1>please make the payment to proceed furthur</h1>
      </div>
      <div className='flex justify-center align-items-center py-5'>
        <form>
          <label class="block">
            <span class="sr-only">Upload your Cad file</span>
            <input type="file" class="block w-full text-sm text-gray-500
                file:me-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                file:disabled:opacity-50 file:disabled:pointer-events-none
                dark:file:bg-blue-500
                dark:hover:file:bg-blue-400
              "/>
          </label>
          <div className='my-5 flex justify-center align-items-center '>
            <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
              upload
            </button>
          </div>
        </form>

      </div>

    </>
  )
}

export default page