import React from 'react'
import Home from './Home'
import Login from './Login'
import { Route, Routes } from 'react-router-dom'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/setting' element={<Home/>}/>
    </Routes>
  )
}

export default AllRoutes