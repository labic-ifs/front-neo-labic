"use client"

import { Button } from "@/Components/Buttons/Button"
import { parseCookies } from "nookies"
import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function CreatePostButton() {
	const { userData } = useContext(AuthContext)
	const router = useRouter()

	async function createArticle() {
		const { labicToken: token } = parseCookies()

		const form = new FormData()
		form.append("user_id", userData?.id!)
		form.append("body", "---\ntitle: \ndescription: \ncover: \n---\n")
		form.append("slug", "untitled")

		const { postId } = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}posts/createPost/`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: form,
		}).then((res) => res.json())

		console.log(postId)

		router.push(`/admin/my-articles/edit/${postId}`)
	}
	return (
		<Button.Root onClick={createArticle}>
			<Button.Text text="Criar" />
		</Button.Root>
	)
}
