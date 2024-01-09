"use client"

import styles from "./MarkdownParser.module.css"

import "./markdown.css"
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
}

export default function MarkdownParser({ markdownBody }: MarkdownParserProps) {
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
			{metadata?.title ? (
				<h1 className={styles.title}>{metadata?.title}</h1>
			) : (
				<h1 className={styles.title}>Sem Título</h1>
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
