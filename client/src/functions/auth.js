import axios from 'axios'

export const createOrUpdateUser = async (authtoken) => {
  // const { data } = await axios.post('/api/register', values)

  return await axios.post(
    '/api/create-or-update-user',
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
}

export const currentUser = async (authtoken) => {
  // const { data } = await axios.post('/api/register', values)

  return await axios.post(
    '/api/current-user',
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  )
}


