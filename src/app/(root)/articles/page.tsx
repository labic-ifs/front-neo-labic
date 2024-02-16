import styles from "./Articles.module.css"

import PostWidget from "@/Components/Posts/PostWidgets/PostWidget"

import { cookies } from "next/headers"

export const metadata = {
	title: "Artigos",
}

const getArticles = async () => {
	const articles = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}posts/getAllArticles/`
	).then((res) => res.json())

	console.log(articles)

	return { articles: articles.reverse() }
}

type MyArticlesTypes = {
	articles: {
		id: string
		body: string
		user_id: string
		created_at: Date
		username?: string
		first_name?: string
		last_name?: string
		profile_image?: string
		slug?: string
	}[]
}

export default async function Articles() {
	const { articles }: MyArticlesTypes = await getArticles()
	return (
		<div className={styles.outerContainer}>
			<div className={styles.container}>
				<h1 className={styles.title}>Nossos Artigos</h1>
				{articles.map((item) => {
					return <PostWidget markdownItem={item} key={item.id} />
				})}
			</div>
		</div>
	)
}
