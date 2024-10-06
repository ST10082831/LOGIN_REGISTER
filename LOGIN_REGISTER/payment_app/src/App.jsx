import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from './Register'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import CustomerDashboard from './CustomerDashboard'

function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/customerDashboard' element={<CustomerDashboard/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
