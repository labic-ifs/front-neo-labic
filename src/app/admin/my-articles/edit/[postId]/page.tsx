import styles from "./EditArticle.module.css"

import EditPostWidget from "@/Components/Posts/EditPostWidget/EditPostWidget"
import GoBackButton from "@/Components/Posts/shortcuts/GoBackButton/GoBackButton"

export const metadata = {
	title: "Editar Artigo",
}

const getPost = async (postId: string) => {
	const post = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}posts/getPost/${postId}`, {
		cache: "no-store",
	}).then((res) => res.json())
	console.log(post)
	return post.post
}

export default async function EditArticle({ params }: any) {
	const postId = params.postId
	const articleData = await getPost(postId)

	return (
		<main className={styles.container}>
			<section className={styles.editorContainer}>
				<div className={styles.previousPageSection}>
					<GoBackButton />
				</div>
				<EditPostWidget markdownBody={articleData} />
			</section>
		</main>
	)
}
