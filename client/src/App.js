import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import Register from './pages/Register'
import SingleBlogPost from './pages/SingleBlogPost'
import NewBlogReqForm from './components/NewBlogReqForm'
import BuyTokens from './components/BuyTokens'
import NewDalleImageReqForm from './components/NewDalleImageReqForm'
import NewParaphaseTranslateForm from './components/NewParaphaseTranslateForm'
import PageNotFound from './pages/PageNotFound'

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-center' />

      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index element={<NewBlogReqForm />} />
          <Route
            path='paraphraseTranslate'
            element={<NewParaphaseTranslateForm />}
          />
          <Route path='buyTokens' element={<BuyTokens />} />
          <Route path='newAIImage' element={<NewDalleImageReqForm />} />

          <Route path='singlePost/:id' element={<SingleBlogPost />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
