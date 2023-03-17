import { useState } from 'react'
import Logo from '../components/Logo'
import FormInput from '../components/formParts/FormInput'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { auth as fbAuth } from '../firebase'

const RegisterFB = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [auth, setAuth] = useAuth()

  const navigate = useNavigate()

  const [register, setRegister] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

  console.log(values.email)
  const handleSubmit = async (e) => {
    e.preventDefault()

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }

    await fbAuth.sendSignInLinkToEmail(values.email, config)

    toast.success(
      `Email sent to ${values.email}. Open your email and complete registration`
    )

    // save email in LS
    localStorage.setItem('emailForRegistration', values.email)

    // Clear State
    setValues({ ...values, email: '' })
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
            <h2 className='text-3xl'>Register FB</h2>
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
              handleChange={handleChange}
            />

            {/* <FormInput
              labelText={'Password'}
              labelHtmlFor={'password'}
              inputId={'password'}
              name={'password'}
              inputType={'password'}
              inputPlaceHolder={'Password'}
              value={values.password}
              handleChange={handleChange}
            /> */}
          </div>

          <div className='mb-6 mt-12'>
            <button className='btnFull bg-primary text-white'>Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterFB
