import { useState, useEffect } from 'react'
import '../stripe.css'

import { Link } from 'react-router-dom'

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
  const [cartTotalAmt, setCartTotalAmt] = useState('0')

  console.log(cartTotalAmt)
  // console.log(error)

  const stripe = useStripe()
  const elements = useElements()

  const handlesubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      // Here you get results after succesfull payment
      // Create order and save in database for admin to process
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4))
      setError(null)
      setProcessing(false)
      setSucceeded(true)
    }
  }

  const handleChange = async (e) => {
    // Listen for changes in the card element
    // Display any errors as customre types their Creditcard details
    setDisabled(e.empty || !e.complete) //  disable pay button if errors
    setError(e.error ? e.error.message : '') // Show error message
  }

  // useEffect(() => {
  //   createPaymentIntent(fbToken.token).then((res) => {
  //     setClientSecret(res.data.client_secret)
  //   })
  // }, [])

  useEffect(() => {
    getSecret()
  }, [fbToken])

  const getSecret = async () => {
    const response = await createPaymentIntent(fbToken.token)
    setClientSecret(response.data.paymentIntent.client_secret)
    setCartTotalAmt(response.data.cartTotal)
     console.log(response)
  }

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
    <div className='text-center'>
  {cartTotalAmt !== 0  &&   <h4>Balance   {  cartTotalAmt.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</h4>}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment Successul
        <Link to='/user/history'> See your purchase history </Link>
      </p>

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

        <br />
        {error && (
          <div className='card-error text-center bg-red-200 ' role='alert'>
            {error}{' '}
          </div>
        )}
      </form>
    </div>
  )
}

export default StripeCheckout
