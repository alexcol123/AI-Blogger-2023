import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema

const blogSchema = new mongoose.Schema(
  {
    postContent: {
      type: String,
    },
    title: {
      type: String,
    },

    metaDescription: {
      type: String,
    },

    topic: {
      type: String,
    },
    respTopicType: {
      type: String,
      default: 'blog',
    
    },

    keywords: {
      type: String,
    },

    createdBy: { type: ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Blog', blogSchema)
