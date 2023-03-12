import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Man2 from '../assets/images/man2.jpg'

const Landing = () => {
  const navigate = useNavigate()

  const [register, setRegister] = useState(false)

  return (
    <div className='h-screen  w-screen overflow-hidden  flex items-center  justify-center  relative'>
      <img
        src={Man2}
        alt=''
        className='absolute inset-0  min-h-screen z-0  object-cover 		'
      />

      <div className='w-[470px] z-10'>
        <div className='p-10  border-t-4 border-t-primary text-center  bg-black/80 text-white'>
          <div className='flex flex-col justify-center items-center space-y-6'>
            <Logo />
            <h2 className='py-2'>
              Generate blog posts in seconds. Our AI-powered platform helps you
              quickly create engaging content and reach more readers.
            </h2>

            <button
              onClick={() => navigate('/register')}
              className='btnNormal px-8 bg-primary600 '
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
