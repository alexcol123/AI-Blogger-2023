import { useState } from 'react'
import Logo from '../components/Logo'
import FormInput from '../components/formParts/FormInput'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [auth, setAuth] = useAuth()

  const navigate = useNavigate()

  const [register, setRegister] = useState(false)

  console.log(register)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (register) {
      try {
        const { data } = await axios.post('/api/register', values)

        if (data.error) return toast.error(data.error)
        else {
          toast.success('Registration successful')
          localStorage.setItem('auth', JSON.stringify(data))
          setAuth(data)
          navigate('/')
        }
      } catch (error) {
        console.log(error)
        toast.error('Registration Failed. Try Again')
      }
    } else {
      try {
        const { data } = await axios.post('/api/login', values)

        if (data.error) return toast.error(data.error)
        else {
          toast.success('Login successful')

          setAuth(data)
          localStorage.setItem('auth', JSON.stringify(data))
          navigate('/user/dashboard')
        }
      } catch (error) {
        console.log(error)
        toast.error('login Failed. Try Again')
      }
    }
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
            <h2 className='text-3xl'> {register ? 'Register' : 'Login'} </h2>
          </div>

          <div className='mt-6 grid gap-6'>
            {register && (
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
            )}

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
            <button className='btnFull bg-primary text-white'>
              {register ? 'Register' : 'Login'}
            </button>
          </div>

          <p className='text-center'>
            {register ? 'Already a member? ' : 'Not a member yet? '}
            <button
              type='button'
              onClick={() => setRegister(!register)}
              className='text-primary font-semibold'
            >
              {!register ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
