import { useState } from 'react'
import Logo from '../components/Logo'
import { FcGoogle } from 'react-icons/fc'
import FormInput from '../components/formParts/FormInput'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { auth as fbAuth, googleAuthProvider } from '../firebase'

const LoginFB = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [auth, setAuth] = useAuth()

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

      setAuth({
        user: user.email,
        fbToken: idTokenResult.token,
      })

      navigate('/dashboard-test')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

    // const config = {
    //   url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
    //   handleCodeInApp: true,
    // }

    // await fbAuth.sendSignInLinkToEmail(values.email, config)

    // toast.success(
    //   `Email sent to ${values.email}. Open your email and complete registration`
    // )

    // // save email in LS
    // localStorage.setItem('emailForRegistration', values.email)

    // // Clear State
    // setValues({ ...values, email: '' })
  }

  const googleLogin = async () => {
    const result = await fbAuth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result
        const idTokenResult = await user.getIdTokenResult()

        // To do work on my backend

        setAuth({
          user: user.email,
          fbToken: idTokenResult.token,
        })

        navigate('/dashboard-test')
      })
      .catch((err) => {
        console.log(err)
        toast.errror(err.message)
      })
  }

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

          <div className='mb-6 mt-12'>
            <button
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
