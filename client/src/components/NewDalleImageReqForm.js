import { useState } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { GiTwoCoins } from 'react-icons/gi'
import FormTextarea from './formParts/FormTextarea'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NewDalleImageReqForm = () => {
  const [topic, setTopic] = useState('')

  const [imageRespURL, setImageRespURL] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!topic) return toast.error('Image topic is required')

      const { data } = await axios.post('/api/create-ai-image', { topic })

      setImageRespURL(data.url)
    } catch (error) {
      console.log(error)
      toast.error('You must login to do this image')
    }
  }

  return (
    <div>
      <div className='w-[400px] '>
        <form
          onSubmit={handleSubmit}
          className='basicForm  border-t-4 border-t-primary  '
        >
          <h3 className='text-center text-2xl '>New AI Image</h3>
          <div className='mt-6 grid gap-6'>
            <FormTextarea
              labelText={'AI Image Topic'}
              labelHtmlFor={'topic'}
              inputId={'topic'}
              name={'topic'}
              inputType={'text'}
              inputPlaceHolder={
                'ex: monkey driving a red convertible car in Miami beach '
              }
              value={topic}
              handleChange={(e) => setTopic(e.target.value)}
              rows={10}
            />
          </div>

          <div className='mb-6 mt-12'>
            <button
              onSubmit={handleSubmit}
              className='btnFull bg-primary text-white'
            >
              Create Image
            </button>
          </div>
        </form>

        {imageRespURL && (
          <div className='mt-5'>
            <img className='bg-cover' src={imageRespURL} alt='' />
          </div>
        )}
      </div>
    </div>
  )
}

export default NewDalleImageReqForm
