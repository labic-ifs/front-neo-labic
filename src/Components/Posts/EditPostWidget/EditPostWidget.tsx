"use client"

import styles from "./EditPostWidget.module.css"

import MarkdownParser from "@/Components/Posts/MarkdownParser/MarkdownParser"
import Error from "@/Components/Forms/Error/Error"
import { revalidatePaths } from "@/lib/actions"

import { Button } from "@/Components/Buttons/Button"
import { usePathname, useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { parseCookies } from "nookies"
import { useFormState } from "react-dom"

type EditPostWidgetProps = {
	markdownBody: { id: string; body: string; user_id: string; created_at: Date }
}

export default function EditPostWidget({ markdownBody }: EditPostWidgetProps) {
	const router = useRouter()
	const path = usePathname()
	const [textBody, setTextBody] = useState<string>(markdownBody.body)
	const [state, formAction] = useFormState(updatePost, undefined)

	useEffect(() => {
		const textAreaElement: HTMLTextAreaElement | null = document.querySelector("#textarea")
		const previewElement: HTMLDivElement | null = document.querySelector("#preview")
		if (textAreaElement && previewElement) {
			const previewSize = previewElement.offsetHeight
			textAreaElement.style.height = `calc(${previewSize}px - 2rem)`
		}
	})

	const getTextAreaValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setTextBody(event.target.value)
	}

	async function updatePost() {
		const { labicToken: token } = parseCookies()

		if (token) {
			try {
				const payload = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_HOST}posts/updatePost/${markdownBody.id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ body: textBody }),
					}
				)

				if (payload.ok) {
					revalidatePaths(path)
					revalidatePaths("/admin/my-articles")
					router.back()
				} else {
					return { error: "It was not possible to save your post." }
				}
			} catch (err) {
				return { error: "Something went wrong." }
			}
		} else {
			return { error: "User not authenticated." }
		}
	}

	return (
		<section className={styles.container}>
			<form className={styles.form} action={formAction}>
				<div className={styles.titleContainer}>
					<h1 className={styles.title}>Edite seu Post</h1>
					<Button.Root>
						<Button.Text text="salvar" />
					</Button.Root>
				</div>
				{state?.error === "User not authenticated." && (
					<Error text="Usuário não authenticado." />
				)}
				{state?.error === "It was not possible to save your post." && (
					<Error text="Não foi possível salvar seu post." />
				)}
				{state?.error === "Something went wrong." && <Error text="Algo deu errado." />}
				<div className={styles.editPreviewAreasContainer}>
					<div className={styles.editPreviewArea}>
						<p>Código</p>
						<div className={styles.textAreaContainer}>
							<textarea
								className={styles.textAreaTag}
								id="textarea"
								onChange={getTextAreaValue}
								value={textBody}
								autoComplete="false"
							></textarea>
						</div>
					</div>
					<div className={styles.editPreviewArea}>
						<p>Preview</p>
						<div id="preview" className={styles.previewWrapper}>
							<MarkdownParser markdownBody={textBody} />
						</div>
					</div>
				</div>
			</form>
		</section>
	)
}
