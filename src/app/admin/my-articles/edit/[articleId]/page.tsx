import styles from "./EditArticle.module.css"

import EditArticleWidget from "./EditArticleWidget"

export const metadata = {
	title: "Editar Artigo",
}

const getArticle = async (articleId: string) => {
	const article = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}articles/getArticle/${articleId}`,
		{ cache: "no-store" }
	).then((res) => res.json())

	return article.article
}

export default async function EditArticle({ params }: any) {
	const articleId = params.articleId
	const articleData = await getArticle(articleId)

	return (
		<main className={styles.container}>
			<EditArticleWidget markdownBody={articleData} />
		</main>
	)
}
