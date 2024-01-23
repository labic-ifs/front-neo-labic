"use client"

import { Button } from "@/Components/Buttons/Button"
import { parseCookies } from "nookies"
import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function CreateArticleButton() {
	const { userData } = useContext(AuthContext)
	const router = useRouter()

	async function createArticle() {
		const { labicToken: token } = parseCookies()

		const form = new FormData()
		form.append("user_id", userData?.id!)
		form.append("body", "---\ntitle: \ndescription: \ncover: \n---\n")

		const { articleId } = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_HOST}articles/createArticle/`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: form,
			}
		).then((res) => res.json())

		router.push(`/admin/my-articles/edit/${articleId}`)
	}
	return (
		<Button.Root onClick={createArticle}>
			<Button.Text text="Criar" />
		</Button.Root>
	)
}
