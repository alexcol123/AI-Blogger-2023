import { useState } from 'react'
import Logo from '../components/Logo'
import Man2 from '../assets/images/man2.jpg'

const Landing = () => {
  const [values, setValues] = useState({
    firstName: '',
    email: '',
    password: '',
  })

  const [register, setRegister] = useState(false)

  console.log(register)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

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

            <button className='btnNormal px-8 bg-primary600 '>
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
