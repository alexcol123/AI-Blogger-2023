import React from 'react'

const FormTextarea = ({
  labelText,
  labelHtmlFor,
  inputId,
  name,
  inputType,
  inputPlaceHolder,
  value,
  handleChange,rows
}) => {
  if (inputType === undefined) inputType = 'text'

  return (
    <div>
      <label
        className='block text-gray-500 text-md font-bold mb-2'
        htmlFor={labelHtmlFor}
      >
        {labelText}
      </label>

      <textarea
        className='shadow appearance-none border w-full py-2 px-3 text-gray-500  bg-primary50 leading-tight  focus:shadow-outline  resize-none'
        id={inputId}
        type={inputType}
        placeholder={inputPlaceHolder}
        value={value}
        name={name}
        onChange={handleChange}
        rows={rows}
      />
    </div>
  )
}

export default FormTextarea


