"use client"

import React, { createContext, useEffect, useState } from "react"
import { setCookie, parseCookies } from "nookies"
import { useRouter } from "next/navigation"

type UserType = {
	id: number
	profile_image?: string
	email: string
	is_superuser?: boolean
}

type SignInData = {
	email: string
	password: string
}

type AuthContext = {
	isAuthenticated: boolean
	userData: UserType | null
	signIn: ({ email, password }: SignInData) => Promise<string>
}

export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter()

	const [userData, setUserData] = useState<UserType | null>(null)

	const isAuthenticated = !!userData

	useEffect(() => {
		recoverUserData()

		async function recoverUserData() {
			const { labicToken: token } = parseCookies()

			if (token && !userData) {
				const user = await fetch(`${process.env.HOST}auth/recoverUser/`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}).then((res) => res.json())

				setUserData(user)
			}
		}
	})

	async function signIn({ email, password }: SignInData) {
		const { token, user, success, error } = await fetch(
			`${process.env.HOST}auth/authenticateUser/`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: email, password: password }),
			}
		).then((res) => res.json())

		if (token) {
			setCookie(undefined, "labicToken", token.token, {
				maxAge: 60 * 60 * 72, //3 Days
			})

			setUserData(user)

			router.push("/admin/my-profile")

			return success
		} else {
			return error
		}
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, signIn, userData }}>
			{children}
		</AuthContext.Provider>
	)
}
