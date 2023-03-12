import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'

import authRoutes from './routes/auth.js'
import blogRoutes from './routes/blog.js'

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
app.use(express.json())
app.use(morgan('dev'))

// Sample route
app.get('/users', (req, res) => {

  res.json({ data: 'Alexopolis Xersis Phersepolis ' })
})

// Routes
app.use('/api', authRoutes)
app.use('/api', blogRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log('Node server is running on port ' + port)
})
