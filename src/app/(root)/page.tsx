"use client"

import { Button } from "@/Components/Buttons/Button"
import { MinimalButton } from "@/Components/Buttons/MinimalButton"
import { AuthContext } from "@/contexts/AuthContext"

import { useRouter } from "next/navigation"
import { useContext } from "react"
import { PiUserCirclePlusLight } from "react-icons/pi"

export default function Home() {
	const router = useRouter()
	const { userData } = useContext(AuthContext)

	console.log(userData)

	return (
		<main>
			<h1>Home</h1>
			<Button.Root
				onClick={() => {
					router.push("sign-in")
				}}
			>
				<Button.Icon icon={PiUserCirclePlusLight} />
				<Button.Text text="Sign-in" />
			</Button.Root>
			<MinimalButton.Root>
				<MinimalButton.Icon icon={PiUserCirclePlusLight} />
				<MinimalButton.Text text="test" />
			</MinimalButton.Root>
		</main>
	)
}
