import React from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
// import firebase from 'firebase/compat/app'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'

const TestDashboard = () => {
  // Ctx
  const [auth, setAuth] = useAuth()

  const fbAuth = getAuth()

  //
  const navigate = useNavigate()

  const logout = () => {
    signOut(fbAuth)
      .then(() => {
        // Sign-out successful..
        console.log('Sign-out successful. ')
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      })

    setAuth({
      user: null,
      token: '',
      fbToken: '',
    })

    navigate('/')
  }

  return (
    <div>
      <div className='flex  bg-gray-200 justify-between px-4'>
        <h4>AI Generator</h4>
        <ul className='flex  list-none space-x-6 '>
          <li>Ai Blog</li>
          <li onClick={logout}>
            <BiLogOutCircle size={30} className='text-red-500' />
          </li>
        </ul>
      </div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default TestDashboard
