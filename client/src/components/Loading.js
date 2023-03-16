import { useEffect, useState } from 'react'

const Loading = () => {
  let [counter, setCounter] = useState(0)

  // console.log('outside counter ', counter)
  const [dataArr, setDataArr] = useState([
    'Analyzing',
    'Collecting Data',
    'Processing',
    'Responding',
    'Finalizing',
  ])

  // console.log('counter =', counter)
  // console.log(dataArr.length)

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((currentCount) => ++currentCount)
    }, 2000)

    if (counter === dataArr.length - 1) {
      clearInterval(interval)
      return
    }

    return () => clearInterval(interval)
  }, [counter])

  return (
    <div className='flex align-center justify-center text-primary '>
      <div className='animate-ping text-lg font-bold '>{dataArr[counter]}</div>
    </div>
  )
}

export default Loading
