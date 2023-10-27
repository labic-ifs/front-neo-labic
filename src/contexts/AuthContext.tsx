'use client'

import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from 'next/navigation'
import { host } from "../../env";

type UserType = {
    id: number;
    profile_image?: string;
    email: string;
    is_superuser?: boolean;
}

type SignInData = {
    email: string;
    password: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    userData: UserType | null;
    signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children, }: {children: React.ReactNode}){
    const router = useRouter()

    const [userData, setUserData] = useState<UserType | null>(null)

    const isAuthenticated = !!userData;

    useEffect(() => {
        recoverData()

        async function recoverData() {
            const { 'authToken': token } = parseCookies()

            if(token && !userData) {
                const user = await fetch(`${host}auth/recoverUser/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => res.json())

                setUserData(user)
            }
        }
    })

    async function signIn({ email, password }: SignInData) {
        const { token, user } = await fetch(`${host}auth/authenticateUser/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'email': email, 'password': password })
        }).then((res) => { return res.json() })

        setCookie(undefined, 'authToken', token.token, {
            maxAge: 60 * 60 * 72 // 3 days
        })

        setUserData(userData)

        router.push('/admin/myProfile')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, userData }}>
            {children}
        </AuthContext.Provider>
    )
}