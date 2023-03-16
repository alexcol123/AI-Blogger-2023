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
import AskAnytthingForm from './components/AskAnytthingForm'
import NewDalleImageVariationForm from './components/NewDalleImageVariationForm'
import AudioTranscriptionForm from './components/AudioTranscriptionForm'
import AudioTranslationForm from './components/AudioTranslationForm'
import PrivateRoute from './components/Routes/PrivateRoute'
import ListModels from './components/ListModels'

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-center' />
      <Routes>
        <Route path='/user' element={<PrivateRoute />}>
          <Route path='dashboard' element={<Dashboard />}>
            <Route index  element={<AskAnytthingForm />} />

            <Route path='models'  element={<ListModels />} />
            {/* AI */}

            <Route path='blog' element={<NewBlogReqForm />} />
            <Route
              path='paraphraseTranslate'
              element={<NewParaphaseTranslateForm />}
            />

            {/* Images */}
            <Route path='newAIImage' element={<NewDalleImageReqForm />} />
            <Route
              path='imageVariation'
              element={<NewDalleImageVariationForm />}
            />
            {/* Audio */}
            <Route
              path='audioTranscription'
              element={<AudioTranscriptionForm />}
            />
            <Route path='audioTranslation' element={<AudioTranslationForm />} />

            <Route path='singlePost/:id' element={<SingleBlogPost />} />
            <Route path='buyTokens' element={<BuyTokens />} />1
          </Route>

          {/* Others */}


        </Route>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

const oldrutes = (
  <Routes>
    <Route path='/' element={<Dashboard />}>
      {/* AI */}
      <Route index element={<AskAnytthingForm />} />
      <Route path='blog' element={<NewBlogReqForm />} />
      <Route
        path='paraphraseTranslate'
        element={<NewParaphaseTranslateForm />}
      />

      {/* Images */}
      <Route path='newAIImage' element={<NewDalleImageReqForm />} />
      <Route path='imageVariation' element={<NewDalleImageVariationForm />} />
      {/* Audio */}
      <Route path='audioTranscription' element={<AudioTranscriptionForm />} />
      <Route path='audioTranslation' element={<AudioTranslationForm />} />

      {/* Others */}
      <Route path='buyTokens' element={<BuyTokens />} />
      <Route path='singlePost/:id' element={<SingleBlogPost />} />
    </Route>
    <Route path='*' element={<PageNotFound />} />
    <Route path='/register' element={<Register />} />
    <Route path='/landing' element={<Landing />} />
  </Routes>
)
