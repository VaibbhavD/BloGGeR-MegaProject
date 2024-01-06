import React from "react"
import {logout} from '../../store/authSlice'
import authService from '../../appwrite/auth'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom"

function LogoutBtn(){
    const dispatch=useDispatch()
    const navigate=useNavigate();

    const logoutHandler=()=>{
        authService.logout().then(()=>{
        dispatch(logout())
         navigate("/")
        
        })
    }

    return(
        <button onClick={logoutHandler}  className="inline-block px-6 py-2 duration-200 rounded-lg text-neutral-200 bg-orange-600  hover:cursor-pointer active:bg-neutral-200 active:text-orange-600">LogOut</button>
    )
}

export default LogoutBtn