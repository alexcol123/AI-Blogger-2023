import { useState, useEffect } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { GiH2O, GiTwoCoins } from 'react-icons/gi'
import FormTextarea from './formParts/FormTextarea'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import FormSelect from './formParts/FormSelect'

const ListModels = ({}) => {
  const [topic, setTopic] = useState('')
  const [respTopicType, setRespTopicType] = useState('question')
  const [loading, setLoading] = useState(false)
  const [models, setModels] = useState([])
  const [modelSelected, setModelSelected] = useState('')
  const [sverResp, setSverResp] = useState([])

  console.log(sverResp.text)

  const getModels = async (e) => {
    try {
      const { data } = await axios.get('/api/ai-models')
      setModels(data)
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(models)

  useEffect(() => {
    getModels()
  }, [])

  const navigate = useNavigate()

  const handleNewBlogRequest = async (e) => {
    e.preventDefault()
    try {
      if (!topic || !respTopicType || !modelSelected) {
        toast.error('Topic, topic type and model are required')
        return
      }

      setLoading(true)
      const { data } = await axios.post('/api/question-model', {
        topic,
        respTopicType,
        modelSelected,
      })
      if (data.message) return toast.error(data.message)

      // setBlogPost(data.post)
      // console.log(data.post._id)
      // navigate(`singlePost/${data.post._id}`)
      setLoading(false)
      setSverResp(data)
    } catch (error) {
      setLoading(false)

      toast.error(error.response.data.message)
    }
  }

  return (
    <div>
      <div className='w-[600px] '>
        <div>
          <form
            onSubmit={handleNewBlogRequest}
            className='basicForm  border-t-4 border-t-primary  '
          >
            <h3 className='text-center text-2xl '>List Models</h3>

            {loading ? (
              <Loading />
            ) : (
              <>
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

                  {models.length > 0 && (
                    <FormSelect
                      labelText={'Select Model'}
                      labelHtmlFor='modelSelect'
                      inputId='modelSelect'
                      name={'modelsSelect'}
                      listOfOptions={models}
                      value={modelSelected}
                      handleChange={(e) => setModelSelected(e.target.value)}
                    />
                  )}

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
                  <div className='bg-gray-300 p-3 my-3'>
                    <h6>for testing i use this code</h6>
                    <h6>
                      {`var fullNames = [];
for (var i = 0; i < 50; i++) {
  fullNames.push(names[Math.floor(Math.random() * names.length)]
    + " " + lastNames[Math.floor(Math.random() * lastNames.length)]);
}`}
                    </h6>
                    <h6>model = code-crushman-001</h6>
                  </div>
                  <button
                    type='submit'
                    className='btnFull bg-primary text-white'
                  >
                    Ask Now
                  </button>
                </div>
              </>
            )}
          </form>

          <div className='bg-white p-3 m-2 '>
            <pre>
              <code> {sverResp.text}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListModels
