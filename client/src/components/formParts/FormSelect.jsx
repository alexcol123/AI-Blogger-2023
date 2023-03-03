import React from 'react'

const FormSelect = ({
  labelText,
  labelHtmlFor,
  inputId,
  name,
  listOfOptions,
  value,
  handleChange,
}) => {
  const updetedListOfOptions = ['select one', ...listOfOptions]
  return (
    <div>
      <label
        className='block text-gray-500 text-md font-bold mb-2'
        htmlFor={labelHtmlFor}
      >
        {labelText}
      </label>

      <select
        id={inputId}
        name={name}
        className='shadow  border w-full py-2 px-3 text-gray-500  bg-primary50 leading-tight  focus:shadow-outline '
        onChange={handleChange}
      >
        {updetedListOfOptions.map((itemValue, index) => (
          <option key={index} value={index === 0 ? '' : itemValue}>
            {itemValue}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FormSelect
