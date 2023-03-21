import { useState, useEffect } from 'react'
import '../stripe.css'

import { createPaymentIntent } from '../functions/stripe'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useAuth } from '../context/auth'

const StripeCheckout = () => {
  const [auth, setAuth] = useAuth()

  const { user, fbToken } = auth



  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')


  const stripe = useStripe()
  const elements = useElements()

  const handlesubmit = async (e) => {
    e.preventDefault()
  }

  const handleChange = async (e) => {}

  useEffect(() => {
    createPaymentIntent(fbToken.token).then((res) => {
      console.log('Payment Intent', res.data)
      setClientSecret(res.data.client_secret)
    })
 
  }, [fbToken])


  console.log(clientSecret)

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  return (
    <>
      <form id='payment-form' className='stipe-form' onSubmit={handlesubmit}>
        <CardElement
          id='card-element'
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className='stripe-button'
          disabled={processing || disabled || succeeded}
        >
          {' '}
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner'></div> : 'PAY'}
          </span>
        </button>
      </form>
    </>
  )
}

export default StripeCheckout
