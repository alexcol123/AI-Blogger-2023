import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const requireSignin = (req, res, next) => {
  // console.log('REQ HEADERS =>', req.headers)
  // next()

  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    )
    // console.log('REQ DECODED =>', decoded)

    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json(err)
  }
}