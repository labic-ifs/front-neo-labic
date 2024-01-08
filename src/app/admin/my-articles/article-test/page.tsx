import MarkdownParser from "@/Components/Posts/MarkdownParser/MarkdownParser"

const getArticle = async () => {
	const article = await fetch(
		"http://127.0.0.1:3333/articles/getArticle/9aee8928-77a0-461d-b7a4-9384ce1ba81d"
	).then((res) => res.json())

	return article
}

export default async function ArticleTest() {
	const body = await getArticle()
	const markdownBody = body.article.body

	console.log(markdownBody)

	return <MarkdownParser markdownBody={markdownBody} />
}
