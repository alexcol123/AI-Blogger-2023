import express from 'express'
import formidable from 'express-formidable'
import { requireSignin } from '../middlewares/auth.js'
import {
  create,
  whisperTranscription,
  whisperTranslation,
  tokensAvailable,
  allBlogsByUser,
  singleUserBlog,
  createAiImage,
  createAiImageVariation,
  buyFakeTokens,
  translateAndParaphraseNewsStory,
  question,
  questionModel,
  listAIModels
} from '../controllers/blog.js'

const router = express.Router()

router.post('/question', requireSignin, question)
router.post('/question-model', requireSignin, questionModel)
router.post('/create', requireSignin, create)
router.post(
  '/translateAndParaphraseNewsStory',
  requireSignin,
  translateAndParaphraseNewsStory
)

router.post('/create-ai-image', requireSignin, createAiImage)
router.post('/create-ai-image-variation', requireSignin, createAiImageVariation)

router.post('/create-transcription', requireSignin, whisperTranscription)
router.post('/create-translation', requireSignin, whisperTranslation)

router.get('/tokens-available', requireSignin, tokensAvailable)
router.post('/myBlogList', requireSignin, allBlogsByUser)
router.get('/mySingleBlog/:blogId', requireSignin, singleUserBlog)

router.get('/buy-fake-tokens', requireSignin, buyFakeTokens)


// Get Open Ai Model list 
router.get('/ai-models', requireSignin, listAIModels)
export default router
