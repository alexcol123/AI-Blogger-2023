import jwt from 'jsonwebtoken'
import User from '../models/user.js'

import admin from 'firebase-admin'
import serviceAccount from '../config/serviceAccountKey.json' assert { type: 'json' }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https:/ai-blog-2023.firebaseio.com',
})

// console.log(admin)
// import {firebaseConf} from '../firebase/index.js'

// console.log(firebaseConf)

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

// check FB token
export const authCheck = async (req, res, next) => {
  try {
    //  Token sent form Front end  location

    if (req.headers.authtoken) {
      const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken)

      // console.log('Firebase user in authcheck', firebaseUser)

      req.user = firebaseUser

      next()
    }
  } catch (err) {
    // return res.status(401).json({ err: 'Invalid or expired token' })
    console.log(err)
  }
}
