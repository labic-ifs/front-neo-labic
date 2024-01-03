"use client"

import { Button } from "@/Components/Button"

import { useRouter } from "next/navigation"
import { PiUserCirclePlusLight } from "react-icons/pi"

export default function Home() {
	const router = useRouter()

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
		</main>
	)
}
