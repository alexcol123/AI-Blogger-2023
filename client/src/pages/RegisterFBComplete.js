import { useState, useEffect } from 'react'
import Logo from '../components/Logo'
import FormInput from '../components/formParts/FormInput'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { auth as fbAuth } from '../firebase'

const RegisterFBComplete = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (localStorage.getItem('emailForRegistration')) {
      setValues({
        ...values,
        email: localStorage.getItem('emailForRegistration'),
      })
    }
  }, [])

  const [auth, setAuth] = useAuth()

  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('  submitd ++++   >> ')
    try {
      // Validation

      if (!values.email) {
        toast.error('Email id required ')
        return
      }
      if (!values.password) {
        toast.error('Password id required ')
        return
      }

      if (values.password.length < 6) {
        toast.error('Password must be atleast 6 characters long')
        return
      }

      // Firebase

      const result = await fbAuth.signInWithEmailLink(
        values.email,
        window.location.href
      )

      // Make sure email was verified
      if (result.user.emailVerified) {
        // Remove email from LS
        localStorage.removeItem('emailForRegistration')
        let user = fbAuth.currentUser
        await user.updatePassword(values.password)
        // get user id token
        const idTokenResult = await user.getIdTokenResult()

        // console.log(idTokenResult.token)
        // console.log(idTokenResult.claims.email)

        // Save to  Auth Context
        setAuth({
          ...auth,
          user: idTokenResult.claims.email,
          fbToken: idTokenResult.token,
          token: ''
        })

        // redirect
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

    // if (register) {
    //   try {
    //     const { data } = await axios.post('/api/register', values)

    //     if (data.error) return toast.error(data.error)
    //     else {
    //       toast.success('Registration successful')
    //       localStorage.setItem('auth', JSON.stringify(data))
    //       setAuth(data)
    //       navigate('/')
    //     }
    //   } catch (error) {
    //     console.log(error)
    //     toast.error('Registration Failed. Try Again')
    //   }
    // } else {
    //   try {
    //     const { data } = await axios.post('/api/login', values)

    //     if (data.error) return toast.error(data.error)
    //     else {
    //       toast.success('Login successful')

    //       setAuth(data)
    //       localStorage.setItem('auth', JSON.stringify(data))
    //       navigate('/user/dashboard')
    //     }
    //   } catch (error) {
    //     console.log(error)
    //     toast.error('login Failed. Try Again')
    //   }
    // }
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
            <h2 className='text-3xl'> Complete Registration</h2>
          </div>

          <div className='mt-6 grid gap-6'>
            {/* {register && (
              <FormInput
                labelText={'name'}
                labelHtmlFor={'name'}
                inputId={'name'}
                name={'name'}
                inputType={'text'}
                inputPlaceHolder={'Name'}
                value={values.name}
                handleChange={handleChange}
              />
            )} */}

            <FormInput
              labelText={'Email'}
              labelHtmlFor={'email'}
              inputId={'email'}
              name={'email'}
              inputType={'email'}
              inputPlaceHolder={'Email'}
              value={values.email}

              //  handleChange={handleChange}
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
            <button className='btnFull bg-primary text-white'>
              Complete Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterFBComplete
