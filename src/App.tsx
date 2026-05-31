import './app.css'
import React, { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoadingScreen from './pages/loading_screen'

const HomePage = React.lazy(() => import('./pages/home_page'))
const VerbExerciseConfigPage = React.lazy(() => import('./pages/verb_exercise_config_page'))
const VerbExerciseResultPage = React.lazy(() => import('./pages/verb_exercise_results_page'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/verb-conjugation" element={<VerbExerciseConfigPage />} />
          <Route path="/verb-conjugation/results" element={<VerbExerciseResultPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
