"use client"

import styles from "./MyArticlesList.module.css"
import PostWidget from "@/Components/Posts/PostWidget/PostWidget"

import { Button } from "@/Components/Buttons/Button"
import { Input } from "@/Components/Forms/Input"
import { FaSearch } from "react-icons/fa"

type MyArticlesListProps = {
	articles: { id: string; body: string; user_id: string; created_at: Date }[]
}

export default function MyArticlesList({ articles }: MyArticlesListProps) {
	return (
		<section className={styles.container}>
			<div className={styles.headerContainer}>
				<h1>Meus Artigos</h1>
				<Button.Root>
					<Button.Text text="Criar" />
				</Button.Root>
			</div>
			<Input.Root>
				<Input.Icon icon={FaSearch} />
				<Input.Tag name="search" placeholder="Robô para OBR" />
			</Input.Root>
			{articles.map((item) => {
				return <PostWidget markdownItem={item} />
			})}
		</section>
	)
}
