"use client"

import styles from "./PostWidget.module.css"
import "./PostWidget.css"

import Image from "next/image"

import moment from "moment"
import "moment/locale/pt-br"

import { useRouter } from "next/navigation"
import { Button } from "@/Components/Buttons/Button"

const metadataParser = require("markdown-yaml-metadata-parser")

type PostWidgetProps = {
	markdownItem: { id: string; body: string; user_id: string; created_at: Date }
}

export default function PostWidget({ markdownItem }: PostWidgetProps) {
	const { metadata } = metadataParser(markdownItem.body)
	const postDate = moment(markdownItem.created_at).locale("pt-br").format("DD [de] MMMM, YYYY")

	const router = useRouter()

	return (
		<div className={styles.container}>
			{metadata?.cover ? (
				<Image
					className={styles.postCover}
					src={metadata?.cover}
					alt="post image"
					width={300}
					height={169}
				></Image>
			) : (
				<Image
					className={styles.postCover}
					src={"/posts/blank-post.png"}
					alt="post image"
					width={300}
					height={169}
				></Image>
			)}
			<div className={styles.infoContainer}>
				<div>
					<div className={styles.titleContainer}>
						{metadata?.title ? (
							<h1 className={styles.title}>{metadata?.title}</h1>
						) : (
							<h1 className={styles.title}>Sem Título</h1>
						)}
						<Button.Root
							id={`topEditBtn`}
							onClick={() => {
								router.push(`/admin/my-articles/edit/${markdownItem.id}`)
							}}
						>
							<Button.Text text="Editar" />
						</Button.Root>
					</div>
					{metadata?.description ? (
						<p className={styles.description}>
							{metadata?.description.slice(0, 225)}
							{[...metadata?.description].reduce((a: number) => a + 1, 0) > 225 &&
								"..."}
						</p>
					) : (
						<p>Descrição não inserida.</p>
					)}
				</div>
				<p>{postDate}</p>
				<Button.Root
					id={`bottomEditBtn`}
					onClick={() => {
						router.push(`/admin/my-articles/edit/${markdownItem.id}`)
					}}
				>
					<Button.Text text="Editar" />
				</Button.Root>
			</div>
		</div>
	)
}
