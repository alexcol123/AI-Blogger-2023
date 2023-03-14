import { useState } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { GiTwoCoins } from 'react-icons/gi'
import FormTextarea from './formParts/FormTextarea'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NewDalleImageVariationForm = () => {
  const [imageRespURL, setImageRespURL] = useState('')

  const navigate = useNavigate()
  const [photo, setPhoto] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('photo', photo)

      if (!photo) return toast.error('Image  is required')

      const { data } = await axios.post(
        '/api/create-ai-image-variation',
        productData
      )

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
          <h3 className='text-center text-2xl '> AI Image Variation</h3>

          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              className=''
              alt='variation original'
            />
          )}

          <div className='mt-6 grid gap-6'>
            <label
              className='block text-gray-500 text-md font-bold mb-2'
              htmlFor='originalIMage'
            >
              Image
            </label>

            <input
              className='shadow appearance-none border w-full py-2 px-3 text-gray-500  bg-primary50 leading-tight  focus:shadow-outline '
              id='originalImage'
              type='file'
              placeholder='originalIMage'
              name='image'
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>

          <div className='mb-6 mt-12'>
            <button
              onSubmit={handleSubmit}
              className='btnFull bg-primary text-white'
            >
              Create Image Variation
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

export default NewDalleImageVariationForm
