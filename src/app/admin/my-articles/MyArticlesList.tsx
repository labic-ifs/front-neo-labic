"use client"

import styles from "./MyArticlesList.module.css"
import PostWidget from "@/Components/Posts/PostWidget/PostWidget"

import { Button } from "@/Components/Buttons/Button"
import { Input } from "@/Components/Forms/Input"
import { FaSearch } from "react-icons/fa"
import { parseCookies } from "nookies"
import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

type MyArticlesListProps = {
	articles: { id: string; body: string; user_id: string; created_at: Date }[]
}

export default function MyArticlesList({ articles }: MyArticlesListProps) {
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
		<section className={styles.container}>
			<div className={styles.headerContainer}>
				<h1>Meus Artigos</h1>
				<Button.Root onClick={createArticle}>
					<Button.Text text="Criar" />
				</Button.Root>
			</div>
			<Input.Root>
				<Input.Icon icon={FaSearch} />
				<Input.Tag name="search" placeholder="Robô para OBR" />
			</Input.Root>
			{articles.map((item) => {
				return <PostWidget key={item.id} markdownItem={item} />
			})}
		</section>
	)
}
