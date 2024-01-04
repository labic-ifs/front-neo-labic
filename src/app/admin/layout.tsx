import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { AuthProvider } from "@/contexts/AuthContext"
import Sidebar from "@/Components/Navigation/Sidebar/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: {
		default: "Labic",
		template: "%s | Labic",
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
