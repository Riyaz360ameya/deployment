import React from 'react'
import { useEffect } from 'react'
import { InfinitySpin } from 'react-loader-spinner'

function Calender({ loading, setLoading }) {
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
          />
          </div>
        </div>
        :
        <div>Calender</div>
      }
    </>
  )
}

export default Calender