import { useState } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { GiTwoCoins } from 'react-icons/gi'
import FormTextarea from './formParts/FormTextarea'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NewParaphaseTranslateForm = () => {
  const [topic, setTopic] = useState('')
  const [respTopicType, setRespTopicType] = useState('')

  const navigate = useNavigate()

  console.log(navigate)
  const handleNewBlogRequest = async (e) => {
    e.preventDefault()
    try {
       if (!respTopicType) return toast.error('Topic is required ex: blog, news')
      if (!topic) return toast.error('Blog topic is required')

      const { data } = await axios.post(
        '/api/translateAndParaphraseNewsStory',
        { topic , respTopicType}
      )
      if (data.message) return toast.error(data.message)

      navigate(`/singlePost/${data.post._id}`)
    } catch (error) {
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
          <h3 className='text-center text-2xl '>
            Paraphrase + Translate News Story
          </h3>
          <div className='mt-6 grid gap-6'>

          <FormTextarea
              labelText={'Type Of Response (ex Blog or News)'}
              labelHtmlFor={'respTopicType'}
              inputId={'respTopicType'}
              name={'respTopicType'}
              inputType={'text'}
              inputPlaceHolder={'Ex  (ex Blog or  News,) '}
              value={respTopicType}
              handleChange={(e) => setRespTopicType(e.target.value)}
              rows={2}
            />

            <FormTextarea
              labelText={'Paste Story Topic'}
              labelHtmlFor={'topic'}
              inputId={'topic'}
              name={'topic'}
              inputType={'text'}
              inputPlaceHolder={'Story must be pasted  here '}
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
              Write Story
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewParaphaseTranslateForm
