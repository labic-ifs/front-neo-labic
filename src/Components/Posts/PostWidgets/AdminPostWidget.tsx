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
	isReduced?: boolean
}

export default function AdminPostWidget({ markdownItem, isReduced }: PostWidgetProps) {
	const { metadata } = metadataParser(markdownItem.body)
	const postDate = moment(markdownItem.created_at)
		.locale("pt-br")
		.format("DD [de] MMMM, YYYY")

	const router = useRouter()

	return (
		<div className={styles.container}>
			<div className={styles.postCoverContainer}>
				{metadata?.cover ? (
					<Image
						className={styles.postCover}
						src={metadata?.cover}
						alt="post image"
						fill
					></Image>
				) : (
					<Image
						className={styles.postCover}
						src={"/posts/blank-post.png"}
						alt="post image"
						fill
					></Image>
				)}
			</div>
			<div className={styles.infoContainer}>
				<div>
					<div className={styles.titleContainer}>
						{metadata?.title ? (
							isReduced ? (
								<h1 className={styles.title}>
									{metadata?.title.slice(0, 24)}
									{[...metadata?.title].reduce(
										(a: number) => a + 1,
										0
									) > 24 && "..."}
								</h1>
							) : (
								<h1 className={styles.title}>{metadata?.title}</h1>
							)
						) : (
							<h1 className={styles.title}>Sem Título</h1>
						)}
						<Button.Root
							id={`topEditBtn`}
							onClick={() => {
								router.push(`management/articles/edit/${markdownItem.id}`)
							}}
						>
							<Button.Text text="Editar" />
						</Button.Root>
					</div>
					{metadata?.description ? (
						isReduced ? (
							<p className={styles.description}>
								{metadata?.description.slice(0, 125)}
								{[...metadata?.description].reduce(
									(a: number) => a + 1,
									0
								) > 125 && "..."}
							</p>
						) : (
							<p className={styles.description}>
								{metadata?.description.slice(0, 450)}
								{[...metadata?.description].reduce(
									(a: number) => a + 1,
									0
								) > 450 && "..."}
							</p>
						)
					) : (
						<p className={styles.description}>Descrição não inserida.</p>
					)}
				</div>
				<p>{postDate}</p>
				<Button.Root
					id={`bottomEditBtn`}
					onClick={() => {
						router.push(`management/articles/edit/${markdownItem.id}`)
					}}
				>
					<Button.Text text="Editar" />
				</Button.Root>
			</div>
		</div>
	)
}
