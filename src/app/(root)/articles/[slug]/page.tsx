import styles from "./SpecificArticle.module.css"

import Image from "next/image"
import MarkdownParser from "@/Components/Posts/MarkdownParser/MarkdownParser"

import moment from "moment"
import "moment/locale/pt-br"

import { PiUserCircleLight } from "react-icons/pi"

const metadataParser = require("markdown-yaml-metadata-parser")

export async function generateMetadata({ params }: any) {
	return {
		title: params.slug.charAt(5).toUpperCase() + params.slug.slice(6).replace("-", " "),
	}
}

const getArticle = async (slug: string) => {
	const article = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}posts/getPostBySlug/${slug}`,
		{
			cache: "no-store",
		}
	).then((res) => res.json())

	return { article: article }
}

type MyArticleTypes = {
	article: {
		post: {
			id: string
			body: string
			user_id: string
			created_at: Date
			slug?: string
		}
		user: [
			{
				profile_image?: string
				username?: string
				first_name?: string
				last_name?: string
			}
		]
	}
}

export default async function SpecificArticle({ params }: any) {
	const slug = params.slug
	const { article }: MyArticleTypes = await getArticle(slug)

	const { metadata } = metadataParser(article.post.body)
	const postDate = moment(article.post.created_at).locale("pt-br").format("DD [de] MMMM, YYYY")

	return (
		<div className={styles.outerContainer}>
			<div className={`${styles.container} `}>
				<div className={styles.infoContainer}>
					<div className={styles.infoWrapper}>
						<div>
							<div className={styles.titleContainer}>
								{metadata?.title ? (
									<h1 className={styles.title}>{metadata?.title}</h1>
								) : (
									<h1 className={styles.title}>Sem Título</h1>
								)}
							</div>
							{article.user[0].profile_image ? (
								<div className={styles.authorContainer}>
									<Image
										className={styles.authorImage}
										src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}users/getUserProfileImage/${article.post.user_id}`}
										width={24}
										height={24}
										alt="Profile Image"
									/>
									<p
										className={styles.authorName}
									>{`${article.user[0].first_name} ${article.user[0].last_name}`}</p>
									<p className={styles.date}> | {postDate}</p>
								</div>
							) : (
								<div className={styles.authorContainer}>
									<PiUserCircleLight size="24px" />
									<p
										className={styles.authorName}
									>{`${article.user[0].first_name} ${article.user[0].last_name}`}</p>
									<p className={styles.date}> | {postDate}</p>
								</div>
							)}
						</div>
						{metadata?.description && (
							<p className={styles.description}>{metadata?.description}</p>
						)}
					</div>
				</div>

				{metadata?.cover ? (
					<Image
						className={styles.postCover}
						src={metadata?.cover}
						alt="post image"
						width={1540}
						height={866}
					></Image>
				) : (
					<Image
						className={styles.postCover}
						src={"/posts/blank-post.png"}
						alt="post image"
						width={1540}
						height={866}
					></Image>
				)}
				<div className={styles.markdownBody}>
					<MarkdownParser markdownBody={article.post.body} noHeader />
				</div>
			</div>
		</div>
	)
}
