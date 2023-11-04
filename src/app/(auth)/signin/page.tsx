'use client'

import Image from "next/image"
import TextInput from "@/components/forms/TextInput"
import FieldError from "@/components/forms/FieldError"
import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { HiOutlineMail } from 'react-icons/hi'
import { BiLockAlt } from 'react-icons/bi'
import { AuthContext } from "@/contexts/AuthContext"

type FormData = {
    email: string;
    password: string;
}

type ErrorsTypes = {
    email?: string,
    password?: string,
    credentials?: string,
}

export default function SignInPage(){
    const [ errors, setErrors ] = useState<ErrorsTypes>({})
    const [ isFormValid, setIsFormValid ] = useState(false)
    const [ watchChanges, setWatchChanges ] = useState({})
    const { register, handleSubmit, getValues, watch } = useForm<FormData>()
    const { signIn } = useContext(AuthContext)

    useEffect(() => {
        validateForm()

        const subscription = watch((data) => {setWatchChanges(data)})
        return () => subscription.unsubscribe()
    }, [watchChanges]); 

    const validateForm = () => {
        const data: FormData = getValues()
        let errors: ErrorsTypes = {}

        if(!data.email) {
            errors.email = 'Insira um e-mail!'
        }

        if(!data.password) {
            errors.password = 'Insira uma senha!'
        } else if (data.password.length <= 8) {
            errors.password = 'Senha muito curta!'
        }

        setErrors(errors)
        setIsFormValid(Object.keys(errors).length === 0)
    }

    const handleSignIn = handleSubmit(async (data) => {
        let errors: ErrorsTypes = {}

        if(isFormValid) {
            const signInStatus = await signIn(data)

            if(signInStatus === 'Invalid Credentials') {
                errors.credentials = 'E-mail ou senha inválidos!'
            }

            setErrors(errors)
        }
    })

    return(
        <main className="flex flex-col lg:flex-row text-white">
            <Head>
                <title>Entrar - Labic</title>
                <meta property="og:title" content="Entrar - Labic" key="title" />
            </Head>
            <Image className="h-screen w-auto lg:block hidden" priority src="/neo_signin_image.png" width={960} height={1080} alt="SignIn Image"></Image>
            <Image className=" w-full h-auto lg:hidden" priority src="/neo_mobile_signin_image.png" width={1920} height={1010} alt="SignIn Image"></Image>
            <div className="flex w-full items-center justify-center my-12 lg:mt-0 lg:w-[60%]">
                <form className="flex flex-col lg:w-8/12 w-10/12" onSubmit={handleSignIn}>
                    <h1 className="text-4xl font-bold py-4">Entrar</h1>
                    <span>Email</span>
                    <TextInput name="email" formRegister={register} icon={<HiOutlineMail />} placeholder="example@example.com" type="email" />
                    { errors.email ? <FieldError text={errors.email}></FieldError> : <></>}
                    <span>Senha</span>
                    <TextInput name="password" formRegister={register} icon={<BiLockAlt />}  placeholder="strongPasswordExample" type="password" />
                    { errors.password ? <FieldError text={errors.password}></FieldError> : <></>}
                    { errors.credentials ? <FieldError text={errors.credentials}></FieldError> : <></>}
                    <button className='text-white mb-4 md:mb-0 mt-2 font-bold rounded-md py-3 px-8 bg-admin_accent active:bg-admin_accent_active hover:bg-admin_accent_hover ease-in-out duration-300'>Entrar</button>
                </form>
            </div>
        </main>
    )
}