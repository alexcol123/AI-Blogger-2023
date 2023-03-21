import axios from 'axios'

export const createPaymentIntent = async (authtoken) =>
  await axios.post(
    '/api/create-payment-intent',
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
