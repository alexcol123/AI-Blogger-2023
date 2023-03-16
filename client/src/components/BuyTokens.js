import { useState } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { GiTwoCoins } from 'react-icons/gi'
import FormTextarea from './formParts/FormTextarea'
import FormInput from './formParts/FormInput'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, Toast } from 'react-hot-toast'

const BuyTokens = ({
  handleNewBlogRequest,
  topic,
  setTopic,
  keywords,
  setkeywords,
}) => {
  const [fullName, setfullName] = useState('')
  const [creditcardNumber, setCreditcardNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!fullName || !creditcardNumber) {
        toast.error('Full name and Creditcard Number are required')
        return
      }

      setLoading(true)
      const { data } = await axios.get('/api/buy-fake-tokens')
      console.log(data.message)
      setLoading(false)
      if (data.message === 'success') {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='w-[400px]'>
        <form
          onSubmit={handleSubmit}
          className='basicForm  border-t-4 border-t-primary  '
        >
          <h3 className='text-center text-2xl '>Buy More Tokens</h3>
          <div className='mt-6 grid gap-6'>
            <FormInput
              labelText={'Full Name'}
              labelHtmlFor={'fullName'}
              inputId={'fullName'}
              name={'fullName'}
              inputType={'text'}
              inputPlaceHolder={'ex Jason Bourne'}
              value={fullName}
              handleChange={(e) => setfullName(e.target.value)}
            />

            <FormInput
              labelText={'Creditcard Number'}
              labelHtmlFor={'creditcardNumber'}
              inputId={'creditcardNumber'}
              name={'creditcardNumber'}
              inputType={'text'}
              inputPlaceHolder={'ex 4442 5541 5541 1021'}
              value={creditcardNumber}
              handleChange={(e) => setCreditcardNumber(e.target.value)}
            />
          </div>

          <div className='mb-6 mt-12'>
            <button className='btnFull bg-primary text-white'>
              {!loading ? 'Buy Tokens' : 'Loading...'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BuyTokens
