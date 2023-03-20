import User from '../models/user.js'

import jwt from 'jsonwebtoken'

//  Register
export const createOrUpdateUser = async (req, res) => {
  try {
    console.log(req.user)

    const { name, picture, email } = req.user

    const user = await User.findOneAndUpdate(
      { email },
      { name, picture },
      { new: true }
    )

    if (user) {
      console.log('backend User updated')
      res.json(user)
    } else {
      const newUser = await User.create({ name, email, picture })
      console.log('backend New User Created')
      res.json(newUser)
    }

    // res.status(200).json({ msg: 'you hit the FB create user' })

    // let { name, email, password } = req.body

    //   // console.log(name, email, password)
    //   if (!name?.trim()) return res.json({ error: 'Name is required' })
    //   if (!email?.trim()) return res.json({ error: 'Email is required' })
    //   if (!password || password?.length < 6)
    //     return res.json({
    //       error: 'Password is required and should be 6 characters or more',
    //     })

    //   // Check if user exists
    //   const userExists = await User.findOne({ email })
    //   if (userExists) {
    //     res.json({
    //       error: 'User alredy register with that email , try to login',
    //     })
    //   }

    //   // Save user to DB
    //   const user = await User.create({ name, email, password })

    //   // Create JWT
    //   const token = await user.createJWT()

    //   // Response
    //   res.status(200).json({
    //     user: {
    //       name: user.name,
    //       email: user.email,
    //       tokensAvailable: user.tokensAvailable,
    //       role: user.role,
    //     },
    //     token,
    //   })
  } catch (error) {
    console.log(error)
  }
}

//  Register
export const register = async (req, res) => {
  let { name, email, password } = req.body

  try {
    // console.log(name, email, password)
    if (!name?.trim()) return res.json({ error: 'Name is required' })
    if (!email?.trim()) return res.json({ error: 'Email is required' })
    if (!password || password?.length < 6)
      return res.json({
        error: 'Password is required and should be 6 characters or more',
      })

    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.json({
        error: 'User alredy register with that email , try to login',
      })
    }

    // Save user to DB
    const user = await User.create({ name, email, password })

    // Create JWT
    const token = await user.createJWT()

    // Response
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        tokensAvailable: user.tokensAvailable,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.log(error)
  }
}

//  Login
export const login = async (req, res) => {
  let { email, password } = req.body

  try {
    if (!email?.trim()) return res.json({ error: 'Email is required' })
    if (!password || password?.length < 6)
      return res.json({
        error: 'Password is required and should be 6 characters or more',
      })

    // Find if user exists  User
    const user = await User.findOne({ email })

    if (!user) {
      return res.json({ error: 'No user found with that email.' })
    }

    // Compare password
    const passwordMatch = await user.comparePassword(password)
    // exit if wrong pw
    if (!passwordMatch) return res.json({ error: 'wrong password' })

    // Create JWT
    const token = await user.createJWT()

    // //  How  to decode the JWT when received
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)

    // Response
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        tokensAvailable: user.tokensAvailable,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.log(error)
  }
}
