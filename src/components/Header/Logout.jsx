import React, {useEffect} from 'react'
import authService from '../../appwrite/auth'
import { LoadingScreen } from "../Index";
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'

function Logout() {    
    
    const dispatch = useDispatch()

    useEffect(() => {       

    authService.logout().then(()=>{
      dispatch(logout())
        
    })}, [])
    
    
  return (
      <LoadingScreen/>    
  )
}

export default Logout