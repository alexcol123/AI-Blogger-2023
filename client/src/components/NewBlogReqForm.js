import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { GiTwoCoins } from 'react-icons/gi'
import FormTextarea from './formParts/FormTextarea'

const NewBlogReqForm = ({
  handleNewBlogRequest,
  topic,
  setTopic,
  keywords,
  setkeywords,
}) => {
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
            <button className='btnFull bg-primary text-white'>
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewBlogReqForm
