import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {Button,Input,Logo} from './index'
import { login as authLogin  } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import {useForm} from "react-hook-form"

function Login(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [error,seterror]=useState("")
    const{register,handleSubmit}=useForm()

    const login=async(data)=>{
        seterror("")
        try {
            const session=await authService.login(data)
            if(session)
            {
                const userData=await authService.getCurrentuser()
                if(userData)
                {
                    dispatch(authLogin(userData));
                    navigate("/")
                }
            }
        } 
        catch (error) {
            seterror(error.message)
            
        }
    }

    return (
        <div
    className='flex items-center justify-center w-full py-32 '
    >
        <div className={`mx-auto w-full max-w-lg bg-slate-700 text-neutral-200 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center ">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email :"
                type="email"
                palaceholder="Enter Your Email Id"
                {...register("email",{
                    required:true,
                    validate:{
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password :"
                type="password"
                palaceholder="Enter Your Password"
                {...register("password",{
                    required:true,
                })}
                />
                <Button
                type="Submit"
                className=""
                >Sign In</Button>
            </div>
          </form>
        </div>
     </div>
          
    )
}

export default Login