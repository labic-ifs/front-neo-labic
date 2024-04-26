"use client"

import React, { createContext, useEffect, useState } from "react"
import { setCookie, parseCookies } from "nookies"
import { useRouter } from "next/navigation"

type UserType = {
	id: string
	profile_image?: string
	email: string
	first_name: string
	last_name: string
	username?: string
	course?: string
	occupation_area?: string
	description?: string
	is_superuser?: boolean
	is_active?: boolean
}

type SignInData = {
	key?: string
	password?: string
}

type AuthContext = {
	isAuthenticated: boolean
	userData: UserType | null
	signIn: ({ key, password }: SignInData) => Promise<string>
	recoverUserData: (forced?: boolean) => Promise<void>
}

export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter()

	const [userData, setUserData] = useState<UserType | null>(null)

	const isAuthenticated = !!userData

	async function recoverUserData(forced?: boolean) {
		const { labicToken: token } = parseCookies()

		if ((token && !userData) || forced) {
			const user = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}auth/recoverUser/`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			).then((res) => res.json())

			setUserData(user)
		}
	}

	useEffect(() => {
		recoverUserData()
	})

	async function signIn({ key, password }: SignInData) {
		if (!key && !password) {
			setUserData(null)
		}

		const { token, user, success, error } = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_HOST}auth/authenticateUser/`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ key: key, password: password }),
			}
		).then((res) => res.json())

		if (token) {
			setCookie(undefined, "labicToken", token.token, {
				maxAge: 60 * 60 * 72, //3 Days
			})

			setUserData(user)

			router.push("/admin/profile")

			return success
		} else {
			return error
		}
	}

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, signIn, userData, recoverUserData }}
		>
			{children}
		</AuthContext.Provider>
	)
}
