
import { useEffect, useState } from 'react'
import Login from '../Features/Auth/Pages/Login'
import Register from '../Features/Auth/Pages/Register'

const authPages = { '/register': Register, '/login': Login }
const getCurrentPath = () => (authPages[window.location.pathname] ? window.location.pathname : '/login')

const App = () => {
  const [path, setPath] = useState(getCurrentPath)
  useEffect(() => {
    if (!authPages[window.location.pathname]) window.history.replaceState({}, '', '/login')
    const handlePopState = () => setPath(getCurrentPath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  const navigate = (to) => { window.history.pushState({}, '', to); setPath(to) }
  const Page = authPages[path]
  return <Page navigate={navigate} />
}

export default App
