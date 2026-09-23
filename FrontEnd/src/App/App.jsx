import useInitAuth from '../Features/Auth/Hooks/useInitAuth'
import AppRoutes from '../Routes/app.routes'

const App = () => {
  useInitAuth()
  return <AppRoutes />
}

export default App
