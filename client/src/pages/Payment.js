import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckout from '../components/StripeCheckout'

// Load stripe outside of components render to avoid recreating stripe object  on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = () => {
  return (
    <div className='flex flex-col items-center align-center mt-4  w-screen h-screen'>
      <h4>Complete Purchase</h4>
      <Elements stripe={promise}>
        <div className='w-1/2'>
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  )
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

export default Payment
