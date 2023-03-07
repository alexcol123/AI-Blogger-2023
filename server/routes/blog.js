import express from 'express'
import { requireSignin } from '../middlewares/auth.js'
import {
  create,
  tokensAvailable,
  allBlogsByUser,
  singleUserBlog,
  createAiImage,
  buyFakeTokens,
} from '../controllers/blog.js'

const router = express.Router()

router.post('/create', requireSignin, create)
router.post('/create-ai-image', requireSignin, createAiImage)

router.get('/tokens-available', requireSignin, tokensAvailable)
router.get('/myBlogList', requireSignin, allBlogsByUser)
router.get('/mySingleBlog/:blogId', requireSignin, singleUserBlog)

router.get('/buy-fake-tokens', requireSignin, buyFakeTokens)
export default router
