import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css'
import Alluser from './Alluser'
import Createuser from './Createuser'
import Updateuser from './Updateuser'
import Login from './Login'
import Register from './Register'
import ProtectWNT from './protectRoutes/ProtectWNT'
import ProtectWHT from './protectRoutes/ProtectWHT'
import Notfound from './Notfound'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>

        <Route element={<ProtectWHT/>}>
          <Route path='/' element={<Alluser/>}></Route>
          <Route path='/create' element={<Createuser/>}></Route>
          <Route path='/update/:id' element={<Updateuser/>}></Route>
        </Route>
        
        <Route element={<ProtectWNT/>}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>

        <Route path='*' element={<Notfound/>}></Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
