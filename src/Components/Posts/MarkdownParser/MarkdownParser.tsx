"use client"

import styles from "./MarkdownParser.module.css"

import "./markdown.css"
import Image from "next/image"
import Markdown from "react-markdown"
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"
import remarkGfm from "remark-gfm"
import remarkGemoji from "remark-gemoji"
import supersub from "remark-supersub"
import rehypeFormat from "rehype-format"
import rehypeHighlight from "rehype-highlight"
const metadataParser = require("markdown-yaml-metadata-parser")

type MarkdownParserProps = {
	markdownBody: string
	noHeader?: boolean
}

export default function MarkdownParser({ markdownBody, noHeader }: MarkdownParserProps) {
	const data = () => {
		try {
			const { content, metadata } = metadataParser(markdownBody)

			return { content, metadata }
		} catch {
			return { content: "", metadata: { description: "Aguandando metadados." } }
		}
	}

	const { content, metadata } = data()

	return (
		<div>
			{noHeader ? null : (
				<>
					{metadata?.title ? (
						<h1 className={styles.title}>{metadata?.title}</h1>
					) : (
						<h1 className={styles.title}>Sem Título</h1>
					)}
					{metadata?.description ? (
						<p className={styles.description}>{metadata?.description}</p>
					) : (
						<p className={styles.description}>Descrição não inserida.</p>
					)}
					{metadata?.cover ? (
						<Image
							className={styles.cover}
							src={metadata?.cover}
							alt="post image"
							width={1280}
							height={720}
						></Image>
					) : (
						<Image
							className={styles.cover}
							src={"/posts/blank-post.png"}
							alt="post image"
							width={1280}
							height={720}
						></Image>
					)}
				</>
			)}
			<div className={"markdown-body"}>
				<Markdown
					remarkPlugins={[
						[remarkGfm, { singleTilde: false }],
						remarkToc,
						remarkGemoji,
						supersub,
						remarkRehype,
					]}
					rehypePlugins={[rehypeFormat, [rehypeHighlight, { detect: true }]]}
				>
					{content}
				</Markdown>
			</div>
		</div>
	)
}
