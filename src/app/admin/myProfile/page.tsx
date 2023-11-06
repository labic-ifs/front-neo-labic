'use client'

import { useRouter } from 'next/navigation'
import { AuthContext } from "@/contexts/AuthContext"
import { parseCookies } from "nookies"
import { useContext, useEffect } from "react"

const GetToken = () => {
    const { 'authToken': token } = parseCookies()

    const router = useRouter()

    useEffect(() => {
        if(!token) {
            router.push('/signin')
        }
    })
}

export default function MyProfile() {
    GetToken()
    
    const { userData, isAuthenticated } = useContext(AuthContext)

    return (
        <button>Test button</button>
    )
}