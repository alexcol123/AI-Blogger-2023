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

  console.log(user)

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
      {user && (
        <div className=''>
          <div className='flex  bg-gray-200 justify-between  '>
            <h2 className='px-3'>AI Generator</h2>
            <ul className='flex  list-none  justify-center items-center space-x-5 mr-3  '>
              {user.email ? (
                <>
                  {' '}
                  <li>{user?.email?.split('@')[0] || ''}</li>
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
          <h4>{user?.email}</h4>

          <div className='m-5'>
            <div> tokens 20</div>
            <Link  to={'/payment'}  className='btnNormal bg-primary'>Buy More</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestDashboard
