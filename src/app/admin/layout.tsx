import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { AuthProvider } from "@/contexts/AuthContext"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Sidebar from "@/Components/Navigation/Sidebar/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: {
		default: "Labic",
		template: "%s | Labic",
	},
}

const verifyUser = () => {
	const token = cookies().get("labicToken")

	if (!token) {
		redirect("/sign-in")
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	verifyUser()

	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<Sidebar />
					{children}
				</AuthProvider>
			</body>
		</html>
	)
}
