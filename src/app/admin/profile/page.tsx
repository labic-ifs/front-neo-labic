import { cookies } from "next/headers"
import styles from "./MyProfile.module.css"

import MyProfileWidget from "./MyProfileWidget"
import AdminPostWidget from "@/Components/Posts/PostWidgets/AdminPostWidget"
import Link from "next/link"
import Image from "next/image"
import CreatePostButton from "@/Components/shortcuts/CreatePostButton/CreatePostButton"
import { Button } from "@/Components/Buttons/Button"

export const metadata = {
	title: "Meu Perfil",
}

const getMyArticles = async () => {
	const token = cookies().get("labicToken")

	const user = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}auth/recoverUser/`, {
		headers: {
			Authorization: `Bearer ${token?.value}`,
		},
	}).then((res) => res.json())

	const articles = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}posts/getUserArticles/${user.id}`,
		{
			headers: {
				Authorization: `Bearer ${token?.value}`,
			},
		}
	).then((res) => res.json())

	return { articles: articles[0].posts?.reverse().slice(0, 3) }
}

type MyArticlesTypes = {
	articles: {
		id: string
		body: string
		user_id: string
		created_at: Date
		is_published: boolean
	}[]
}

export default async function MyProfile() {
	const { articles }: MyArticlesTypes = await getMyArticles()

	return (
		<main className={styles.container}>
			<MyProfileWidget />
			<section className={styles.areasContainer}>
				<section className={styles.sectionContainer}>
					<h1>Inbox</h1>
					<div className={styles.centerImageWarnContainer}>
						<div className={styles.centerImageWarnWrapper}>
							<Image
								className={styles.centerImage}
								src={"/dev/under-development-illustration.svg"}
								alt="under development illustration"
								width={500}
								height={350}
							></Image>
							<p className={styles.centerImageWarn}>Em Desenvolvimento</p>
						</div>
					</div>
				</section>
				<section className={styles.sectionContainer}>
					{articles.length !== 0 ? (
						<>
							<div className={styles.articlesSectionContainer}>
								<h1>Meus Artigos</h1>
								{articles.map((item) => {
									return (
										<AdminPostWidget
											markdownItem={item}
											key={item.id}
											isReduced
										></AdminPostWidget>
									)
								})}
							</div>
							<Link
								className={styles.seeAllArticles}
								href={"/admin/articles"}
							>
								<Button.Root fullWidth>
									<Button.Text text="Ver Todos" />
								</Button.Root>
							</Link>
						</>
					) : (
						<>
							<h1>Meus Artigos</h1>
							<div className={styles.centerImageWarnContainer}>
								<div className={styles.centerImageWarnWrapper}>
									<Image
										className={styles.centerImageNoArticles}
										src={"/utils/no-articles-found.svg"}
										alt="nothing here"
										width={200}
										height={100}
									></Image>
								</div>
							</div>
							<div className={styles.createPostButton}>
								<CreatePostButton fullWidth />
							</div>
						</>
					)}
				</section>
			</section>
		</main>
	)
}
