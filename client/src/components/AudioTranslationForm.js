import { useState } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { GiTwoCoins } from 'react-icons/gi'
import FormTextarea from './formParts/FormTextarea'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AudioTranslationForm = () => {
  const [audioRespURL, setaudioRespURL] = useState('')
  console.log(audioRespURL)

  const navigate = useNavigate()
  const [audio, setAudio] = useState('')
  console.log(audio.name)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('myMp3', audio)

      if (!audio) return toast.error('Audio  is required')

      const { data } = await axios.post('api/create-translation', productData)
      console.log(data)
      setaudioRespURL(data.text)
    } catch (error) {
     

      toast.error(error.response.data.message)
    }
  }

  return (
    <div>
      <div className='w-[400px] '>
        <form
          onSubmit={handleSubmit}
          className='basicForm  border-t-4 border-t-primary  '
        >
          <h3 className='text-center text-2xl '> AI Audio-Transcription</h3>

          {audio && (
            <h5 className='p-2 bg-yellow-700 text-white rounded max-w-fit  '>
              {audio.name}
            </h5>
          )}

          <div className='mt-6 grid gap-6'>
            <label
              className='block text-gray-500 text-md font-bold mb-2'
              htmlFor='originalAudio'
            >
              Audio File
            </label>

            <input
              className='shadow appearance-none border w-full py-2 px-3 text-gray-500  bg-primary50 leading-tight  focus:shadow-outline '
              id='originalAudio'
              type='file'
              placeholder='originalAudio'
              name='audiofile'
              onChange={(e) => setAudio(e.target.files[0])}
            />
          </div>

          <div className='mb-6 mt-12'>
            <button
              onSubmit={handleSubmit}
              className='btnFull bg-primary text-white'
            >
              Create Translation
            </button>
          </div>
        </form>

        {audioRespURL && (
          <div className='my-5 px-5 py-3 bg-white rounded-md '>
            <h4 className='text-center'>Translation</h4>
            <p>{audioRespURL}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AudioTranslationForm
