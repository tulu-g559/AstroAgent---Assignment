import { Routes, Route, useNavigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import LandingPage from './pages/LandingPage'
import AppPage from './pages/AppPage'
import AppShell from './components/layout/AppShell'

function App() {
  const navigate = useNavigate()

  return (
    <AppProvider>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage onNavigateToApp={() => navigate('/app')} />
          }
        />
        <Route
          path="/app"
          element={
            <AppShell>
              <AppPage />
            </AppShell>
          }
        />
      </Routes>
    </AppProvider>
  )
}

export default App
