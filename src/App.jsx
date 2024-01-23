import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header, LoadingScreen } from "./components/Index"
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.userData)
 
  useEffect(() => {

    authService.getCurrentUser().then((userData) => {

      if (userData) dispatch(login({userData}))
 
      else dispatch(logout())
      
    })

    .finally(() => setLoading(false))

  }, [])

  
  
  return !loading ? (

    <div className='min-h-screen flex flex-wrap content-between bg-[#f4f4f4]'>
      <div className='w-full block'>

        <Header />

          <main>   
          <div className='font-mono font-extrabold text-xl py-2 px-3'>Welcome, {userData ? userData.name : `User`}</div>    <Outlet />
          </main>

        <Footer />
      </div>
    </div>
  ) 
  
  : <div>
      <LoadingScreen/>
    </div>
}

export default App