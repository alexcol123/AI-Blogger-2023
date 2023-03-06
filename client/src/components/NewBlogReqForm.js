import { useState } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { GiTwoCoins } from 'react-icons/gi'
import FormTextarea from './formParts/FormTextarea'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NewBlogReqForm = ({}) => {
  const [topic, setTopic] = useState('')
  const [keywords, setkeywords] = useState('')

  const navigate = useNavigate()

  const handleNewBlogRequest = async (e) => {
    e.preventDefault()
    try {
      if (!topic) return toast.error('Blog topic is required')
      if (!keywords) return toast.error('Blog keywords are required')

      const { data } = await axios.post('/api/create', { topic, keywords })
      if (data.message) return toast.error(data.message)

      // setBlogPost(data.post)
      // console.log(data.post._id)
      navigate(`singlePost/${data.post._id}`)
    } catch (error) {
      console.log(error)
      toast.error('You must login to do this')
    }
  }

  return (
    <div>
      <div className='w-[400px]'>
        <form
          onSubmit={handleNewBlogRequest}
          className='basicForm  border-t-4 border-t-primary  '
        >
          <h3 className='text-center text-2xl '>New Blog Post</h3>
          <div className='mt-6 grid gap-6'>
            <FormTextarea
              labelText={'Topic'}
              labelHtmlFor={'topic'}
              inputId={'topic'}
              name={'topic'}
              inputType={'text'}
              inputPlaceHolder={'Blog Topic'}
              value={topic}
              handleChange={(e) => setTopic(e.target.value)}
              rows={10}
            />

            <FormTextarea
              labelText={'keywords (comma separated)'}
              labelHtmlFor={'keywords'}
              inputId={'keywords'}
              name={'keywords'}
              inputType={'text'}
              inputPlaceHolder={'Ex art, history, science '}
              value={keywords}
              handleChange={(e) => setkeywords(e.target.value)}
              rows={2}
            />
          </div>

          <div className='mb-6 mt-12'>
            <button
              onSubmit={handleNewBlogRequest}
              className='btnFull bg-primary text-white'
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewBlogReqForm
