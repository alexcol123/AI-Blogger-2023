import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

import User from '../models/user.js'
import Blog from '../models/blog.js'
import jwt from 'jsonwebtoken'
import { Configuration, OpenAIApi } from 'openai'

// FOR MP3 sound testing    =======       =======      =======     >>>
const __dirname = path.resolve()
// console.log(__dirname)

// Sample files for testing mp3 and images
const mp3Sound = path.join(__dirname, 'files/velociraptor.m4a')
const image1 = path.join(__dirname, '/img1.jpg')
const image2 = path.join(__dirname, 'man.png')
// console.log(mp3Sound)
// console.log(__dirname)
// console.log(image1)

//  Create  AI  Blog      ======      =======     =======    >>>>>>
//  Create  AI  Blog      ======      =======     =======    >>>>>>
export const create = async (req, res) => {
  try {
    let { topic, keywords } = req.body
    // view user id as alias senderID
    let { _id: senderID } = req.user

    if (!topic || !keywords) {
      res.status(422).json({ message: 'topic and keywords are required' })
    }

    // Must check if  person is a valid user and has tokens
    const userProfile = await User.findById(senderID)

    if (!userProfile?.tokensAvailable) {
      res
        .status(200)
        .json({ message: 'No tokens available, buy more to continue' })
      return
    }

    // // Lower token by 1    =======       =======      =======     >>>
    userProfile.tokensAvailable = userProfile.tokensAvailable - 1

    userProfile.save()

    // OPEN AI  SETUP    =======       =======      =======     >>>

    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(config)

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      temperature: 0,
      max_tokens: 3600,
      prompt: `Write a long and detailed SEO-friendly blog post about ${topic} that targets the following comma-deparated keywords ${keywords} . The content should be formated in SEO-friendly HTML. The response must include appropiate HTML title and meta description. The return format must be stringified JSON  in the following format:
      {
        "postContent": port content here
        "title": title goes here
        "metaDescription: meta description goes here

      } `,
    })

    // Response   =======       =======      =======     >>>

    const resp = response.data.choices[0]?.text.split('\n').join('')
    const parsedResp = await JSON.parse(resp)

    console.log(parsedResp)

    const blogPostCreated = await Blog.create({
      postContent: parsedResp?.postContent,
      title: parsedResp?.title,
      metaDescription: parsedResp?.metaDescription,
      topic,
      keywords,
      createdBy: senderID,
    })

    res.status(200).json({ post: blogPostCreated })
  } catch (error) {
    console.log(error)
  }
}

//  Create  AI  Parafrase and translate news            =======     =======    >>>>>>

export const translateAndParaphraseNewsStory = async (req, res) => {
  try {
    let { topic } = req.body
    // view user id as alias senderID
    let { _id: senderID } = req.user

    if (!topic) {
      res.status(422).json({ message: 'topic  is required' })
    }

    // Must check if  person is a valid user and has tokens
    const userProfile = await User.findById(senderID)

    if (!userProfile?.tokensAvailable) {
      res
        .status(200)
        .json({ message: 'No tokens available, buy more to continue' })
      return
    }

    // // Lower token by 1    =======       =======      =======     >>>
    userProfile.tokensAvailable = userProfile.tokensAvailable - 1

    userProfile.save()

    // OPEN AI  SETUP    =======       =======      =======     >>>

    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(config)

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      temperature: 0.7,
      max_tokens: 3600,

      prompt: `Write a long and detailed SEO-friendly news post about this topic ${topic} topic should be paraphrase with and different from the topic . The content should be formated in SEO-friendly HTML. The response must include appropiate HTML title and meta description.  and a conclusion The return format must be stringified JSON  in the following format:
      {
        "postContent": port content here
        "title": title goes here
        "metaDescription": meta description goes here
        "postConclusion": conclusion goes here
      } and should be in spanish`,
    })

    // Response   =======       =======      =======     >>>

    const resp = response.data.choices[0]?.text.split('\n').join('')
    const parsedResp = await JSON.parse(resp)

    console.log(parsedResp)

    res.status(200).json(parsedResp)

    // const blogPostCreated = await Blog.create({
    //   postContent: parsedResp?.postContent,
    //   title: parsedResp?.title,
    //   metaDescription: parsedResp?.metaDescription,
    //   topic,
    //   keywords,
    //   createdBy: senderID,
    // })

    // res.status(200).json({ post: blogPostCreated })

    // const resp = response.data.choices[0]?.text.split('\n').join('')
    // const parsedResp = await JSON.parse(resp)

    // console.log(parsedResp)

    // const blogPostCreated = await Blog.create({
    //   postContent: parsedResp?.postContent,
    //   title: parsedResp?.title,
    //   metaDescription: parsedResp?.metaDescription,
    //   topic,
    //   keywords,
    //   createdBy: senderID,
    // })

    // res.status(200).json({ post: blogPostCreated })
  } catch (error) {
    console.log(error)
  }
}

//  Create  AI  Image      ======      =======     =======    >>>>>>
export const createAiImage = async (req, res) => {
  try {
    let { topic } = req.body
    // view user id as alias senderID
    let { _id: senderID } = req.user

    if (!topic) {
      res.status(422).json({ message: 'topic and keywords are required' })
    }

    // Must check if  person is a valid user and has tokens
    const userProfile = await User.findById(senderID)

    if (!userProfile?.tokensAvailable) {
      res
        .status(200)
        .json({ message: 'No tokens available, buy more to continue' })
      return
    }
    userProfile.tokensAvailable = userProfile.tokensAvailable - 1
    userProfile.save()

    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(config)

    const response = await openai.createImage({
      prompt: topic,
      n: 1,
      size: '512x512',
    })

    let imageUrl = response.data.data[0].url

    res.status(200).json({ url: imageUrl })
  } catch (error) {
    console.log(error)
  }
}

//  Create  AI  Image  VARIATION    ======      =======     =======    >>>>>>
export const createAiImageVariation = async (req, res) => {
  try {
    // view user id as alias senderID
    let { _id: senderID } = req.user

    // Must check if  person is a valid user and has tokens
    const userProfile = await User.findById(senderID)

    if (!userProfile?.tokensAvailable) {
      res
        .status(200)
        .json({ message: 'No tokens available, buy more to continue' })
      return
    }
    userProfile.tokensAvailable = userProfile.tokensAvailable - 1
    userProfile.save()

    console.log(
      'image being prepare by SHARP  ----------------------------------------->'
    )

    const id = 'id' + Math.random().toString(16).slice(2)

    const getImage = async () => {
      let inputFile = 'img1.jpg'
      let ouptputFile = `${id}.png`
      await sharp(inputFile)
        .resize({ height: 512, width: 512 })
        .toFile(ouptputFile)

      let resp = await generateImage()

      res.status(200).json({ url: resp })
    }

    //  Super Important To Enphasize
    //   Image MUST be png of less thant 4GB  and square
    async function generateImage() {
      try {
        const config = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        })
        const openai = new OpenAIApi(config)

        const response = await openai.createImageVariation(
          fs.createReadStream(`${id}.png`),
          1,
          '512x512'
        )

        return response.data.data[0].url
      } catch (error) {
        console.log(error)
      }
    }

    getImage()
  } catch (err) {
    // console.log(JSON.stringify(err))
    console.log(err.response)
  }
}

//  WIsper   AI   Transcription     ======      =======     =======    >>>>>>
export const whisperTranscription = async (req, res) => {
  try {
    // let { topic } = req.body
    // // view user id as alias senderID
    let { _id: senderID } = req.user

    // if (!topic) {
    //   res.status(422).json({ message: 'topic and keywords are required' })
    // }

    // Must check if  person is a valid user and has tokens
    const userProfile = await User.findById(senderID)

    if (!userProfile?.tokensAvailable) {
      res
        .status(200)
        .json({ message: 'No tokens available, buy more to continue' })
      return
    }
    userProfile.tokensAvailable = userProfile.tokensAvailable - 1
    userProfile.save()

    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(config)

    const response = await openai.createTranscription(
      fs.createReadStream(mp3Sound),
      'whisper-1'
    )
    const resp = response.data

    res.status(200).json(resp)
  } catch (error) {
    // res.status(400).json({ error })
    console.log(error)
  }
}

//  WIsper   AI   Translation    ======      =======     =======    >>>>>>
export const whisperTranslation = async (req, res) => {
  try {
    console.log('translation started')
    // let { topic } = req.body
    // // view user id as alias senderID
    let { _id: senderID } = req.user

    // if (!topic) {
    //   res.status(422).json({ message: 'topic and keywords are required' })
    // }

    // Must check if  person is a valid user and has tokens
    const userProfile = await User.findById(senderID)

    if (!userProfile?.tokensAvailable) {
      res
        .status(200)
        .json({ message: 'No tokens available, buy more to continue' })
      return
    }
    userProfile.tokensAvailable = userProfile.tokensAvailable - 1
    userProfile.save()

    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(config)

    const response = await openai.createTranslation(
      fs.createReadStream(mp3Sound),
      'whisper-1'
    )
    const resp = response.data

    res.status(200).json(resp)
  } catch (error) {
    // res.status(400).json({ error })
    console.log(error)
  }
}

// Tokens Available
export const tokensAvailable = async (req, res) => {
  try {
    let { _id: senderID } = req.user
    const userTokens = await User.findById(senderID).select('tokensAvailable')
    console.log(userTokens)

    res.status(200).json(userTokens.tokensAvailable)
  } catch (error) {
    console.log(error)
  }
}

// GET All Blogs
export const allBlogsByUser = async (req, res) => {
  try {
    let { _id: senderID } = req.user
    const singleUserBlogList = await Blog.find({ createdBy: senderID }).select(
      'title _id'
    )

    res.status(200).json(singleUserBlogList)
  } catch (error) {
    console.log(error)
  }
}

// Get Single user blogs
export const singleUserBlog = async (req, res) => {
  try {
    let { _id: senderID } = req.user
    let { blogId } = req.params

    const singleUserBlog = await Blog.findOne({
      // createdBy: senderID,
      _id: blogId,
    })

    res.status(200).json(singleUserBlog)
  } catch (error) {
    console.log(error)
  }
}

// Buy Fake Tokens
export const buyFakeTokens = async (req, res) => {
  try {
    let { _id } = req.user

    console.log(_id)

    const user = await User.findById({
      _id,
    })

    user.tokensAvailable = user.tokensAvailable + 20
    user.save()

    res.status(200).json({ message: 'success' })
  } catch (error) {
    console.log(error)
  }
}
