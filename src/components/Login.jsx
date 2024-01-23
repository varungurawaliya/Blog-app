import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo, LoadingScreen } from "./Index"
import { useDispatch } from "react-redux"
import service from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const login = async(data) => {

        setError("")
        setLoading(true)

        try {            
            const session = await service.login(data)

            if (session) {

                const userData = await service.getCurrentUser()
                if (userData)                     
                    dispatch(authLogin({userData}))                               
            }       

        } catch (error) {
            setError(error.message)
        }

        setLoading(false)
    }

  return loading ? <LoadingScreen/> : (
    
    <div className='flex items-center justify-center w-full'>

        <div className={`mx-auto w-full max-w-lg bg-[#f89344]/[0.6] rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">

                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="w-full" height="h-auto" />
                    </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;

                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>

            <div className='space-y-5'>

                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />

                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />

                <Button
                type="submit"
                className="w-full hover:bg-[#ee4540]/[0.6]"
                >Sign in</Button>
                
            </div>
        </form>
        </div>
    </div>
    
    
  )
}

export default Login