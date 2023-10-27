'use client'

import Image from "next/image"
import TextInput from "@/components/forms/TextInput"
import Head from "next/head"
import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { HiOutlineMail } from 'react-icons/hi'
import { BiLockAlt } from 'react-icons/bi'
import { AuthContext } from "@/contexts/AuthContext"

type FormData = {
    email: string;
    password: string;
}

export default function SignInPage(){
    const { register, handleSubmit } = useForm<FormData>()
    const { signIn } = useContext(AuthContext)

    const handleSignIn = handleSubmit(async (data) => {
        console.log(data)
        await signIn(data)
    })

    return(
        <main className="flex flex-col lg:flex-row text-white">
            <Head>
                <title>Entrar - Labic</title>
            </Head>
            <Image className="h-screen w-auto lg:block hidden" priority src="/signin_image.png" width={960} height={1080} alt="SignIn Image"></Image>
            <Image className=" w-full h-auto lg:hidden" priority src="/mobile_signin_image.png" width={1920} height={1010} alt="SignIn Image"></Image>
            <div className="flex w-full items-center justify-center mt-12 lg:mt-0 lg:w-[60%]">
                <form className="flex flex-col w-8/12" onSubmit={handleSignIn}>
                    <h1 className="text-4xl font-bold py-4">Entrar</h1>
                    <span>Email</span>
                    <TextInput name="email" formRegister={register} icon={<HiOutlineMail />} placeholder="example@example.com" type="email" />
                    <span>Senha</span>
                    <TextInput name="password" formRegister={register} icon={<BiLockAlt />}  placeholder="strongPasswordExample" type="password" />
                    <button className='text-white mb-4 md:mb-0 mt-2 font-bold rounded-md py-3 px-8 bg-blue-500 active:bg-blue-800 hover:bg-blue-700 ease-in-out duration-300'>Entrar</button>
                </form>
            </div>
        </main>
    )
}