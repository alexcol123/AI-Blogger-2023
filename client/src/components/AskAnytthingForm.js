import { useState } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { GiTwoCoins } from 'react-icons/gi'
import FormTextarea from './formParts/FormTextarea'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

const AskAnytthingForm = ({}) => {
  const [topic, setTopic] = useState('')
  const [respTopicType, setRespTopicType] = useState('question')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleNewBlogRequest = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!topic) return toast.error('Blog topic is required')
      if (!respTopicType) return toast.error('Blog keywords are required')

      const { data } = await axios.post('/api/question', {
        topic,
        respTopicType,
      })
      if (data.message) return toast.error(data.message)

  
      console.log(data.post)
      // setBlogPost(data.post)
      // console.log(data.post._id)
      navigate(`singlePost/${data.post._id}`)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('You must login to do this')
    }
  }

  return (
    <div>
      <div className='w-[400px] '>
        <form
          onSubmit={handleNewBlogRequest}
          className='basicForm  border-t-4 border-t-primary  '
        >
          <h3 className='text-center text-2xl '>Ask me anithing</h3>

          {loading ? (
            <Loading />
          ) : (
            <>
              {' '}
              <div className='mt-6 grid gap-6'>
                <FormTextarea
                  labelText={'Type Of Response (ex Blog or News)'}
                  labelHtmlFor={'respTopicType'}
                  inputId={'respTopicType'}
                  name={'respTopicType'}
                  inputType={'text'}
                  inputPlaceHolder={'Ex  (ex Blog News, or question)'}
                  value={respTopicType}
                  handleChange={(e) => setRespTopicType(e.target.value)}
                  rows={2}
                />

                <FormTextarea
                  labelText={'Question '}
                  labelHtmlFor={'topic'}
                  inputId={'topic'}
                  name={'topic'}
                  inputType={'text'}
                  inputPlaceHolder={'Ask your question here'}
                  value={topic}
                  handleChange={(e) => setTopic(e.target.value)}
                  rows={10}
                />
              </div>
              <div className='mb-6 mt-12'>
                <button
                  onSubmit={handleNewBlogRequest}
                  className='btnFull bg-primary text-white'
                >
                  Ask Now
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default AskAnytthingForm
