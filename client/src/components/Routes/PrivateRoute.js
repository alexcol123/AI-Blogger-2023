import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import Register from '../../pages/Register'

const PrivateRoute = () => {
  // Context
  const [auth, setAuth] = useAuth()

  // State
  const [ok, setOk] = useState(null)

  const authCheck = async () => {
    const { data } = await axios.get(`/api/auth-check`)

    // console.log(data)

    if (data.ok) {
      setOk(true)
    } else {
      setOk(false)
    }
  }

  useEffect(() => {
    if (auth.token !== '') authCheck()
  }, [auth?.token])

  return ok ? <Outlet /> : <Register />
}

export default PrivateRoute
