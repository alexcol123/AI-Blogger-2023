import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/auth' 
import { useParams } from 'react-router-dom'


const SingleBlogPost = () => {
  const [blogPost, setBlogPost] = useState({})
  const [auth, setAuth] = useAuth()
  const { user } = auth
  const params = useParams()

  console.log(params)

  useEffect(() => {
    if (user) {
      getSingleBlogsPost()
    }
  }, [params])

  const getSingleBlogsPost = async () => {
    try {
      const { data } = await axios.get(`/api/mySingleBlog/${params.id}`)
      setBlogPost(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='max-w-screen-sm mx-auto bg-white p-6 rounded-md my-10'>
      <div className='text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm'>
        Blog Post
      </div>

      <div className='text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm'>
        SEO title and meta description
      </div>

      <div className='p-4 my-2 border border-stone-200 rounded-md'>
        <div className='text-blue-600 text-2xl font-bold'>
          {blogPost?.title}
        </div>
        <div className='mt-2'>{blogPost?.metaDescription}</div>
      </div>

      <div className='text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm'>
        Keywords
      </div>
      {/* 
        <div className='flex flex-wrap pt-2 gap-1'>
          {blogPost?.keywords &&
            blogPost?.keyword.split(',').map((keyword, i) => (
              <div
                key={i}
                className='  px-4   rounded-full bg-slate-800 text-white '
              >
                # {keyword}
              </div>
            ))}
        </div> */}

      {/* Blog post body */}
      <div
        className='mt-4'
        dangerouslySetInnerHTML={{ __html: blogPost?.postContent || '' }}
      />
    </div>
  )
}

export default SingleBlogPost
