import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../Features/Auth/Pages/Login'
import Register from '../Features/Auth/Pages/Register'
import Protected from './Protected'
import Public from './Public'
import Dashboard from '../Features/Chat/Pages/Dashboard'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Public><Login /></Public>} />
      <Route path="/register" element={<Public><Register /></Public>} />
      <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes
