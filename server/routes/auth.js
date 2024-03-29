import express from 'express'
import { register, login, createOrUpdateUser, currentUser } from '../controllers/auth.js'
import { authCheck, requireSignin } from '../middlewares/auth.js'

const router = express.Router()

// Sample route response
// router.get('/register', (req, res) =>   res.json({ data: 'Henry Stella Karol Alex' }))

router.post('/create-or-update-user', authCheck, createOrUpdateUser)
router.post('/current-user', authCheck, currentUser)

router.post('/register', register)
router.post('/login', login)

router.get('/auth-check', requireSignin, (req, res) => res.json({ ok: true }))

router.post('/test', () => console.log('test'))

export default router
