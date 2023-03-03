import { useState } from 'react'

const Logo = () => {
  const [logoName, setLogoName] = useState('Blog-Creator')

  return (
    <div className='flex items-center'>
      <div className='flex justify-center items-center bg-primary w-12 h-12 rounded-md'>
        <div className='text-4xl text-white text-center font-semibold capitalize'>
          {logoName.charAt(0)}
        </div>
      </div>
      <div className='text-primary text-3xl font-bold ml-3 capitalize'>
  
        {logoName}
      </div>
    </div>
  )
}

export default Logo
