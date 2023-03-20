import { useState, useEffect } from 'react'
import Logo from '../components/Logo'

import FormInput from '../components/formParts/FormInput'

import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { auth as fbAuth } from '../firebase'

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
    // password: '',
  })

  const [loading, setLoading] = useState(false)

  const [auth, setAuth] = useAuth()

  const { fbToken } = auth

  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    }

    await fbAuth
      .sendPasswordResetEmail(values.email, config)
      .then(() => {
        setValues({ email: '' })
        setLoading(false)
        toast.success(' Check your email for  a password-reset link')
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error.message)
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
            <h2 className='text-3xl'>Forgot Password </h2>
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
          </div>

          <div className='mb-6 mt-12'>
            <button
              type='submit'
              disabled={!values.email}
              className='btnFull bg-primary text-white '
            >
              {loading ? 'Loading... ' : 'Reset - Password'}
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

export default ForgotPassword
