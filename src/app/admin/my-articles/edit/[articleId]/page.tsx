import styles from "./EditArticle.module.css"

import EditPostWidget from "@/Components/Posts/EditPostWidget/EditPostWidget"
import Link from "next/link"
import { MinimalButton } from "@/Components/Buttons/MinimalButton"
import { revalidatePaths } from "@/lib/actions"

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

	revalidatePaths("/admin/my-articles")

	return (
		<main className={styles.container}>
			<section className={styles.editorContainer}>
				<Link className={styles.previousPageSection} href={"/admin/my-articles"}>
					<MinimalButton.Root>
						<MinimalButton.Icon serverSide serverSideIconType="back-arrow" />
						<MinimalButton.Text text="voltar" />
					</MinimalButton.Root>
				</Link>
				<EditPostWidget markdownBody={articleData} />
			</section>
		</main>
	)
}
