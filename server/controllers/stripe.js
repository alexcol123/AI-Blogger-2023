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
    let productTotal = 10
    // Later apply coupon
    // later calculate price

    //  1 find user
    const user = await User.findOne({ email: req.user.email })

    //  2 find user cart total

    //  create payment intent with order amount and currency

    const paymentIntent = await stripe.paymentIntents.create({
      amount: productTotal * 100,
      currency: 'usd',
    })
    console.log(paymentIntent)
    res.json({ paymentIntent, cartTotal: productTotal })
  } catch (error) {
    console.log(error)
  }
}
