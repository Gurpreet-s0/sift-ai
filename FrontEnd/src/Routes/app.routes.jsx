import React from 'react'
import {Route, Routes} from "react-router-dom"
import Login from '../Features/Auth/Pages/Login'
import Register from '../Features/Auth/Pages/Register'
const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Login/>}/>
    </Routes>
  )
}

export default AppRoutes