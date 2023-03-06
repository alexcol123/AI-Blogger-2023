import { useState, useEffect } from 'react'
import axios from 'axios'
import { GiTwoCoins } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import ManFace from '../assets/images/manface.jpg'
import { useAuth } from '../context/auth'
import { BiLogOutCircle } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/formParts/FormInput'
import FormTextarea from '../components/formParts/FormTextarea'
import toast from 'react-hot-toast'
import NewBlogReqForm from '../components/NewBlogReqForm'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  // Context
  const [auth, setAuth] = useAuth()
  // State
  const [topic, setTopic] = useState('')
  const [keywords, setkeywords] = useState('')

  // const [blogPost, setBlogPost] = useState({})
  const [blogNamesList, setBlogNamesList] = useState([])

  const [availableTokensLeft, setAvailableTokensLeft] = useState(null)

  // console.log(blogPost)

  const { user } = auth

  const logout = () => {
    console.log('logout')

    setAuth({ ...auth, user: null, token: '' })
    localStorage.removeItem('auth')
    navigate('/landing')
  }

  // const handleNewBlogRequest = async (e) => {
  //   e.preventDefault()
  //   try {
  //     if (!topic) return toast.error('Blog topic is required')
  //     if (!keywords) return toast.error('Blog keywords are required')

  //     const { data } = await axios.post('/api/create', { topic, keywords })
  //     if (data.message) return toast.error(data.message)

  //     // setBlogPost(data.post)
  //     // console.log(data.post._id)
  //     navigate(`singlePost/${data.post._id}`)
  //   } catch (error) {
  //     console.log(error)
  //     toast.error('You must login to do this')
  //   }
  // }

  useEffect(() => {
    if (user) {
      getTokenAvailability()
      getListOfMyBlogsByName()
    }
  }, [user, navigate])

  const getTokenAvailability = async () => {
    try {
      const { data } = await axios.get('/api/tokens-available')
      setAvailableTokensLeft(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getListOfMyBlogsByName = async () => {
    try {
      const { data } = await axios.get('/api/myBlogList')
      setBlogNamesList(data)
    } catch (error) {
      console.log(error)
    }
  }

  // const posts = [
  //   'post number 1',
  //   'post number 2',
  //   'post number 3',
  //   'post number 4',
  //   'post number 5',
  //   'post number 6',
  //   'post number 7',
  //   'post number 1',
  //   'post number 2',
  //   'post number 3',
  //   'post number 4',
  //   'post number 5',
  //   'post number 6',
  //   'post number 7',
  // ]

  return (
    <div className='grid grid-cols-[300px_1fr] h-screen max-h-screen'>
      {/* left sidebar */}
      <div className='flex flex-col text-white overflow-hidden'>
        {/* Header  */}
        <div className='bg-gray-900 py-4 px-4 flex flex-col gap-3 items-center  '>
          <div className='flex  justify-center'>
            <Logo />
          </div>

          <Link
            to={'/dashboard/newBlog'}
            className='btnFull  bg-yellow-600 text-center px-5 mt-4'
          >
            New Post
          </Link>

          <Link
            to='/dashboard/buyTokens'
            className=' flex justify-center items-center mt-2 '
          >
            <GiTwoCoins size={25} className='text-yellow-600' />
            <span className='pl-1'>
              {availableTokensLeft || 0} tokens available
            </span>
          </Link>
        </div>

        {/* Posts  */}
        <div className='p-4  flex-1 overflow-auto bg-gradient-to-b from-gray-800 to-blue-800 flex flex-col'>
          <h2 className='text-center text-xl my-3'>Blog List</h2>
          {blogNamesList?.map((post) => (
            <Link
              key={post._id}
              to={`singlePost/${post._id}`}
              className={'mb-3'}
            >
              {post.title.substring(0, 33)}...
            </Link>
          ))}
        </div>

        {/* User Info  */}
        <div className='bg-blue-900 flex items-center gap-2 border-t border-t-black/50 h-20 px-2  '>
          <img
            src={ManFace}
            alt='a woman'
            className=' w-14 h-14 rounded-full  border border-white  '
          />

          <div className='flex-1'>
            <div className='font-bold'>{user?.name}</div>
            <div>{user?.email}</div>
          </div>

          <button
            type='button'
            onClick={logout}
            className='text-sm '
            href='/logout'
          >
            <BiLogOutCircle
              size={30}
              className='text-white bg-red-800 m-1 rounded-full hover:bg-red-500'
            />
            <p className='text-sm'>logout</p>
          </button>
        </div>
      </div>

      {/* Main */}

      <div className='w-full h-full bg-blue-100 flex flex-col justify-center items-center'>
        {/* outlet ====   ====   =====     =====   >>>>> */}
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
