import React,{useState,useEffect} from "react";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


export default function AuthLayout({childern,authentication}) {

    const navigate=useNavigate()
    const authStatus=useSelector((state)=>state.auth.status)
    const [loader,setloader]=useState(true)

    useEffect(()=>{
        console.log(authStatus)
        if(authentication && authStatus !== authentication)
        {
            navigate("/login")
        }
        else if(!authentication && authStatus!==authentication)
        {
            navigate("/")
        }
        setloader(false)
    },[navigate,authentication,authStatus])

    return loader?<h1>Loading...</h1>:<>{childern}</>
}
