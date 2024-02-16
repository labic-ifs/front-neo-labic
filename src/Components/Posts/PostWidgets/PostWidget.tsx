"use client"

import styles from "./PostWidget.module.css"
import "./PostWidget.css"

import Image from "next/image"

import moment from "moment"
import "moment/locale/pt-br"

import Link from "next/link"

import { useRouter } from "next/navigation"
import { PiUserCircleLight } from "react-icons/pi"
import { IconContext } from "react-icons"

const metadataParser = require("markdown-yaml-metadata-parser")

type PostWidgetProps = {
	markdownItem: {
		id: string
		body: string
		user_id: string
		created_at: Date
		first_name?: string
		last_name?: string
		profile_image?: string
	}
	isReduced?: boolean
}

export default function PostWidget({ markdownItem, isReduced }: PostWidgetProps) {
	const { metadata } = metadataParser(markdownItem.body)
	const postDate = moment(markdownItem.created_at).locale("pt-br").format("DD [de] MMMM, YYYY")

	const router = useRouter()

	console.log(markdownItem)

	return (
		<div
			className={`${styles.container} ${styles.normalWidgetContainer}`}
			onClick={() => {
				router.push(`/articles/${markdownItem.id}`)
			}}
		>
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
									{[...metadata?.title].reduce((a: number) => a + 1, 0) > 24 &&
										"..."}
								</h1>
							) : (
								<h1 className={styles.title}>{metadata?.title}</h1>
							)
						) : (
							<h1 className={styles.title}>Sem Título</h1>
						)}
					</div>
					{markdownItem.profile_image ? (
						<div className={styles.authorContainer}>
							<Image
								className={styles.authorImage}
								src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}users/getUserProfileImage/${markdownItem.user_id}`}
								width={24}
								height={24}
								alt="Profile Image"
							/>
							<p
								className={styles.authorName}
							>{`${markdownItem.first_name} ${markdownItem.last_name}`}</p>
						</div>
					) : (
						<div className={styles.authorContainer}>
							<IconContext.Provider value={{ color: "#fff", size: "24px" }}>
								<PiUserCircleLight />
							</IconContext.Provider>
							<p
								className={styles.authorName}
							>{`${markdownItem.first_name} ${markdownItem.last_name}`}</p>
						</div>
					)}
					{metadata?.description ? (
						isReduced ? (
							<p className={styles.description}>
								{metadata?.description.slice(0, 125)}
								{[...metadata?.description].reduce((a: number) => a + 1, 0) > 125 &&
									"..."}
							</p>
						) : (
							<p className={styles.description}>
								{metadata?.description.slice(0, 350)}
								{[...metadata?.description].reduce((a: number) => a + 1, 0) > 350 &&
									"..."}
							</p>
						)
					) : (
						<p className={styles.description}>Descrição não inserida.</p>
					)}
				</div>
				<p className={styles.date}>{postDate}</p>
			</div>
		</div>
	)
}
