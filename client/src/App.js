import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import Register from './pages/Register'
import SingleBlogPost from './pages/SingleBlogPost'
import NewBlogReqForm from './components/NewBlogReqForm'

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-center' />

      <Routes>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='newBlog' element={<NewBlogReqForm />} />
          <Route path='singlePost/:id' element={<SingleBlogPost />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
