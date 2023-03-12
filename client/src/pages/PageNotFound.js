import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {

  const navigate = useNavigate()
  return (
    <div className='h-screen  w-screen  flex items-center  justify-center bg-blue-100  '>
      <div className='w-[400px] text-center bg-white py-5 rounded-sm'>
        <h1>404</h1>
        <h2>That page does not exist </h2>
        <button
        onClick={()=>navigate('/')}
          type='button'
          className='btnNormal bg-red-600 text-white px-4 shadow '
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default PageNotFound
