import User from '../models/user.js'
import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

// console.log(Stripe)
console.log('=====================================================')

const stripe = Stripe(process.env.STRIPE_SECRET)
console.log(stripe)

//  Register
export const createPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: 'usd',
    })
    res.json(paymentIntent)
  } catch (error) {
    console.log(error)
  }
}
