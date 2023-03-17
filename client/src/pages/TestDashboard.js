import React from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
// import firebase from 'firebase/compat/app'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { Link } from 'react-router-dom'

const TestDashboard = () => {
  // Ctx
  const [auth, setAuth] = useAuth()

  const { user } = auth

  const fbAuth = getAuth()

  // first part of email
  let userNameFromEmail = user?.email.split('@')[0] || ''

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
    <div className=''>
      <div className='flex  bg-gray-200 justify-between  '>
        <h2 className='px-3'>AI Generator</h2>
        <ul className='flex  list-none  justify-center items-center space-x-5 mr-3  '>
          {user ? (
            <>
              {' '}
              <li>{userNameFromEmail}</li>
              <li onClick={logout}>
                <BiLogOutCircle
                  size={30}
                  className='text-red-500 bg-white rounded-full '
                />
              </li>{' '}
            </>
          ) : (
            <>
              {' '}
              <li>
                <Link to='/loginfb'> Login</Link>
              </li>
              <li>
                <Link to='/loginfb'> Register</Link>
              </li>{' '}
            </>
          )}
        </ul>
      </div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default TestDashboard
