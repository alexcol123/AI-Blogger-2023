import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    trim: true,
    required: true,
  },

  tokensAvailable: {
    type: Number,
    default: 3,
  },

  role: {
    type: Number,
    default: 0,
  },
})

//  encrypt password before saving it to DB
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Compare Password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

// Create JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign({ _id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

export default mongoose.model('User', UserSchema)
