import User from '../models/user.js'
import Blog from '../models/blog.js'
import jwt from 'jsonwebtoken'
import { Configuration, OpenAIApi } from 'openai'

//  Register
export const create = async (req, res) => {
  // let { topic, keywords } = req.body
  // let { senderId : _id} = req.user
  // console.log(topic, keywords)
  // console.log(req.user)

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
