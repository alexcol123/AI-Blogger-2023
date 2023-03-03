import React from 'react'
import { GiTwoCoins } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import ManFace from '../assets/images/manface.jpg'

const Dashboard = () => {
  const posts = [
    'post number 1',
    'post number 2',
    'post number 3',
    'post number 4',
    'post number 5',
    'post number 6',
    'post number 7',
    'post number 1',
    'post number 2',
    'post number 3',
    'post number 4',
    'post number 5',
    'post number 6',
    'post number 7',
  ]

  return (
    <div className='grid grid-cols-[300px_1fr] h-screen max-h-screen'>
      {/* left sidebar */}
      <div className='flex flex-col text-white overflow-hidden'>
        {/* Header  */}
        <div className='bg-gray-900 py-4 px-4 flex flex-col gap-3 items-center  '>
          <div className='flex  justify-center'>
            <Logo />
          </div>

          <button className='btnFull  bg-yellow-600 text-center px-5 mt-4'>
            New Post
          </button>

          <Link
            to='/buy-tokens'
            className=' flex justify-center items-center mt-2 '
          >
            <GiTwoCoins size={25} className='text-yellow-600' />
            <span className='pl-1'>20 tokens available</span>
          </Link>
        </div>

        {/* Posts  */}
        <div className='p-4  flex-1 overflow-auto bg-gradient-to-b from-gray-800 to-blue-800 flex flex-col'>
          <h2 className='text-center text-xl my-3'>Blog List</h2>
          {posts.map((post) => (
            <Link to={`/post/:1`}>{post}</Link>
          ))}
        </div>

        {/* User Info  */}
        <div className='bg-blue-800 flex items-center gap-2 border-t border-t-black/50 h-20 px-2  '>
          <img
            src={ManFace}
            alt='a woman'
            className=' w-12 h-12 rounded-full'
          />

          <div className='flex-1'>
            <div className='font-bold'>email@gmail.com</div>
            <Link className='text-sm' href='/logout'>
              Logout
            </Link>
          </div>
        </div>


      </div>

      {/* Main */}

      <div className='w-full h-full bg-blue-100 flex flex-col justify-center items-center' >
      <h2>main content</h2>
      <Link
          to='/register'
          className=' btnNormal  px-6 flex justify-center items-center mt-2 bg-red-500 '
        >
          Login now
        </Link>
      </div>

    </div>
  )
}

export default Dashboard
