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
  const navigate = useNavigate()


  console.log(navigate)
  const handleNewBlogRequest = async (e) => {
    e.preventDefault()
    try {
      if (!topic) return toast.error('Blog topic is required')

      const { data } = await axios.post(
        '/api/translateAndParaphraseNewsStory',
        { topic }
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
              labelText={'Story Topic'}
              labelHtmlFor={'topic'}
              inputId={'topic'}
              name={'topic'}
              inputType={'text'}
              inputPlaceHolder={'Story goes  here '}
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
