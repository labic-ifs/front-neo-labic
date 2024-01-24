import styles from "./MyArticles.module.css"

import PostWidget from "@/Components/Posts/PostWidget/PostWidget"

import { Input } from "@/Components/Forms/Input"
import CreateArticleButton from "@/Components/Posts/shortcuts/CreateArticleButton/CreateArticleButton"

import { cookies } from "next/headers"

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

	return { articles: articles[0].articles.reverse() }
}

type MyArticlesTypes = {
	articles: { id: string; body: string; user_id: string; created_at: Date }[]
}

export default async function MyArticles() {
	const { articles }: MyArticlesTypes = await getMyArticles()

	return (
		<main className={styles.container}>
			<section className={styles.listContainer}>
				<div className={styles.headerContainer}>
					<h1>Meus Artigos</h1>
					<CreateArticleButton></CreateArticleButton>
				</div>
				<Input.Root>
					<Input.Icon serverSide serverSideIconType="search" />
					<Input.Tag name="search" placeholder="Robô para OBR" />
				</Input.Root>
				{articles?.map((item) => {
					return <PostWidget key={item.id} markdownItem={item} />
				})}
			</section>
		</main>
	)
}
