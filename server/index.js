import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import path from 'path'

import authRoutes from './routes/auth.js'
import blogRoutes from './routes/blog.js'
import stripeRoutes from './routes/stripe.js'

import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'

const __dirname = path.resolve()

dotenv.config()
const app = express()

// DB
mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Error ==>' + err))

// Middlewares
app.use(cors())

app.use(express.static('./public'))
app.use(fileUpload({ useTempFiles: true, tempFileDir: '' }))
// app.use(fileUpload({ useTempFiles: true }))
app.use(bodyParser.json())

app.use(express.json())

app.use(morgan('dev'))

// Sample route
app.get('/users', (req, res) => {
  res.json({ data: 'Alexopolis Xersis Phersepolis ' })
})

// Routes
app.use('/api', authRoutes)
app.use('/api', blogRoutes)
app.use('/api', stripeRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log('Node server is running on port ' + port)
})
