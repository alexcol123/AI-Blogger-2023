import express from 'express'
import { requireSignin } from '../middlewares/auth.js'
import { create, tokensAvailable } from '../controllers/blog.js'

const router = express.Router()

router.post('/create', requireSignin, create)
router.get('/tokens-available', requireSignin, tokensAvailable)

export default router
