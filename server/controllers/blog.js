import User from '../models/user.js'
import jwt from 'jsonwebtoken'

//  Register
export const create = async (req, res) => {
  let { topic, keywords } = req.body

  console.log(topic, keywords)
  console.log(req.user)

  try {
    // Must check if  person is login and if person has tokens

    // // console.log(name, email, password)
    // if (!name?.trim()) return res.json({ error: 'Name is required' })
    // if (!email?.trim()) return res.json({ error: 'Email is required' })
    // if (!password || password?.length < 6)
    //   return res.json({
    //     error: 'Password is required and should be 6 characters or more',
    //   })
    // // Check if user exists
    // const userExists = await User.findOne({ email })
    // if (userExists) {
    //   res.json({
    //     error: 'User alredy register with that email , try to login',
    //   })
    // }
    // // Save user to DB
    // const user = await User.create({ name, email, password })
    // // Create JWT
    // const token = await user.createJWT()
    // // Response
    // res.status(200).json({
    //   user: {
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //   },
    //   token,
    // })

    res.status(200).json({ post: 'jelo' })
  } catch (error) {
    console.log(error)
  }
}
