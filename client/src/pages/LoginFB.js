import { useState, useEffect } from 'react'
import Logo from '../components/Logo'
import { FcGoogle } from 'react-icons/fc'
import FormInput from '../components/formParts/FormInput'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { auth as fbAuth, googleAuthProvider } from '../firebase'
import { createOrUpdateUser } from '../functions/auth'

const LoginFB = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [auth, setAuth] = useAuth()
  const { fbToken } = auth

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const result = await fbAuth.signInWithEmailAndPassword(
        values.email,
        values.password
      )

      const { user } = result
      const idTokenResult = await user.getIdTokenResult()

      // Talk to our backend
      createOrUpdateUser(idTokenResult.token)
        .then((res) =>
          setAuth({
            user: {
              name: res.data.name,
              picture: res.data.picture,
              email: res.data.email,
              role: res.data.role,
              _id: res.data._id,
            },
            fbToken: idTokenResult.token,
          })
        )
        .catch((err) => console.log(err))

      console.log('created  frontend ---------')

      // setAuth({
      //   user: { email: user?.email },
      //   fbToken: idTokenResult.token,
      // })

      navigate('/dashboard-test')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const googleLogin = async () => {
    const result = await fbAuth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result
        const idTokenResult = await user.getIdTokenResult()

        // To do work on my backend

        console.log(idTokenResult)

        // Talk to our backend
        createOrUpdateUser(idTokenResult.token)
          .then((res) =>
            setAuth({
              user: {
                name: res.data.name,
                picture: res.data.picture,
                email: res.data.email,
                role: res.data.role,
                _id: res.data._id,
              },
              fbToken: idTokenResult.token,
            })
          )
          .catch()

        navigate('/dashboard-test')
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message)
      })
  }

  useEffect(() => {
    if (fbToken) navigate('/dashboard-test')
  }, [fbToken])

  return (
    <div className='h-screen  w-screen  flex items-center  justify-center bg-blue-100  '>
      <div className='w-[400px]'>
        <form
          onSubmit={handleSubmit}
          className='basicForm  border-t-4 border-t-primary  '
        >
          <div className='flex flex-col justify-center items-center space-y-6'>
            <Logo />
            <h2 className='text-3xl'>Login FB</h2>
          </div>

          <div className='mt-6 grid gap-6'>
            <FormInput
              labelText={'Email'}
              labelHtmlFor={'email'}
              inputId={'email'}
              name={'email'}
              inputType={'email'}
              inputPlaceHolder={'Email'}
              value={values.email}
              handleChange={handleChange}
            />

            <FormInput
              labelText={'Password'}
              labelHtmlFor={'password'}
              inputId={'password'}
              name={'password'}
              inputType={'password'}
              inputPlaceHolder={'Password'}
              value={values.password}
              handleChange={handleChange}
            />
          </div>

          {/* Forgot Password */}
          <p className='text-end'>
            <Link
              to={'/forgot/password'}
              className='text-primary text-end font-semibold ml-3'
            >
              Forgot Password?
            </Link>
          </p>

          <div className='mb-6 mt-12'>
            <button
              type='submit'
              disabled={loading}
              className='btnFull bg-primary text-white '
            >
              {loading ? 'Loading... ' : 'Login'}
            </button>
          </div>

          <div className='mb-6 mt-6'>
            <button
              type='button'
              onClick={googleLogin}
              disabled={loading}
              className='btnFull bg-white text-gray-700  border border-md border-black/10 flex justify-center items-center '
            >
              <FcGoogle className='mr-3' size={25} />
              Continue with Google
            </button>
          </div>

          <p className='text-center'>
            Not a member Yet?
            <button
              type='button'
              onClick={() => navigate('/registerfb')}
              className='text-primary font-semibold ml-3'
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginFB
