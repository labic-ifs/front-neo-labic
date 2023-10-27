'use client'

import { AuthContext } from "@/contexts/AuthContext"
import { api } from "@/services/api"
import { GetServerSideProps } from "next"
import { useRouter } from "next/navigation"
import { parseCookies } from "nookies"
import { useContext } from "react"

const getToken = async () => {
    const { 'authToken': token } = parseCookies()

    if(!token){
        useRouter().push('/signin')
    }

    return {}
}

export default function MyProfile() {
    const { userData, isAuthenticated } = useContext(AuthContext)
    getToken()

    async function testFunc() {
        console.log((await api.get('auth/recoverUser/')).data)
    }

    return (
        <button onClick={testFunc}>aaa</button>
    )
}