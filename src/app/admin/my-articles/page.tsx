import styles from "./MyArticles.module.css"

import MyArticlesList from "./MyArticlesList"

import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { cookies, headers } from "next/headers"

export const metadata = {
	title: "Meus Artigos",
}

const getMyArticles = async () => {
	const token = cookies().get("labicToken")

	const user = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}auth/recoverUser/`, {
		headers: {
			Authorization: `Bearer ${token?.value}`,
		},
	}).then((res) => res.json())

	const articles = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}articles/getUserArticles/${user.id}`
	).then((res) => res.json())

	return articles[0].articles
}

export default async function MyArticles() {
	const articles = await getMyArticles()

	return (
		<main className={styles.container}>
			<MyArticlesList articles={articles} />
		</main>
	)
}
