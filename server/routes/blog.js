import express from 'express'
import { requireSignin } from '../middlewares/auth.js'
import { create, tokensAvailable , allBlogsByUser, singleUserBlog} from '../controllers/blog.js'

const router = express.Router()

router.post('/create', requireSignin, create)
router.get('/tokens-available', requireSignin, tokensAvailable)
router.get('/myBlogList', requireSignin, allBlogsByUser)
router.get('/mySingleBlog/:blogId', requireSignin, singleUserBlog)
export default router
