import express from 'express'
import { requireSignin } from '../middlewares/auth.js'
import { create } from '../controllers/blog.js'

const router = express.Router()

router.post('/create',  requireSignin, create)

export default router
