import { useState } from 'react'
import Logo from '../components/Logo'
import FormInput from '../components/formParts/FormInput'

const Register = () => {
  const [values, setValues] = useState({
    firstName: '',
    email: '',
    password: '',
  })

  const [register, setRegister] = useState(false)

  console.log(register)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setValues({ ...values, [name]: value })
  }

  return (
    <div className='h-screen  w-screen  flex items-center  justify-center '>
      <div className='w-[400px]'>
        <form className='basicForm  border-t-4 border-t-primary '>
          <div className='flex flex-col justify-center items-center space-y-6'>
            <Logo />
            <h2 className='text-3xl'> {register ? 'Register' : 'Login'} </h2>
          </div>

          <div className='mt-6 grid gap-6'>
            {register && (
              <FormInput
                labelText={'First name'}
                labelHtmlFor={'firstName'}
                inputId={'firstName'}
                name={'firstName'}
                inputType={'text'}
                inputPlaceHolder={'First name'}
                value={values.firstName}
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
              {' '}
              {register ? 'Register' : 'Login'}
            </button>
          </div>

          <div className='mb-6'>
            <button className='btnFull bg-primary200 text-primary700'>
              Demo App
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
