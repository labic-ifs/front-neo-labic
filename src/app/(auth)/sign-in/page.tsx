"use client"

import Image from "next/image"
import styles from "./SignIn.module.css"

import Error from "@/Components/Forms/Error/Error"
import { Button } from "@/Components/Buttons/Button"
import { Input } from "@/Components/Forms/Input"

import { MdOutlineEmail } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import React, { useContext, useState } from "react"
import { useFormState } from "react-dom"
import { object, string } from "yup"
import { AuthContext } from "@/contexts/AuthContext"

type formTypes = {
	key?: string
	password?: string
}

let formSchema = object({
	key: string().required("O e-mail ou usuário é obrigatório!"),
	password: string()
		.min(8, "A senha deve ter no mínimo 8 caracteres.")
		.required("A senha é obrigatória!"),
})

export default function SignIn() {
	const [formData, setFormData] = useState<formTypes>({})
	const [state, formAction] = useFormState(handleSubmit, undefined)
	const { signIn } = useContext(AuthContext)

	const getValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({ ...prevData, [event.target.name]: event.target.value }))
	}

	async function handleSubmit() {
		try {
			await formSchema.validate(formData, { abortEarly: false })

			const trySignIn = await signIn(formData)

			return trySignIn
		} catch (err: any) {
			return err.errors
		}
	}

	return (
		<main className={styles.container}>
			<Image
				className={styles.imageContainer}
				src="/auth/sign-in-illustration.png"
				alt="Signin Illustration"
				width={960}
				height={1080}
			/>
			<Image
				className={styles.mobileImageContainer}
				src="/auth/mobile-sign-in-illustration.png"
				alt="Signin Illustration"
				width={1920}
				height={1048}
			/>
			<section className={styles.formContainer}>
				<form className={styles.formTag} action={formAction} noValidate>
					<h1 className={styles.title}>Entre na sua conta Labic!</h1>
					<section className={styles.inputSection}>
						<p className={styles.inputLabel}>E-mail ou Username</p>
						<Input.Root>
							<Input.Icon icon={MdOutlineEmail} />
							<Input.Tag
								name="key"
								type="text"
								placeholder="labic@gmail.com ou labic.ifs"
								getValue={getValue}
							/>
						</Input.Root>
						{state?.includes("O e-mail ou usuário é obrigatório!") && (
							<Error text="O e-mail ou usuário é obrigatório!" fieldError />
						)}
					</section>
					<section className={styles.inputSection}>
						<p className={styles.inputLabel}>Senha</p>
						<Input.Root>
							<Input.Icon icon={RiLockPasswordLine} />
							<Input.Tag
								name="password"
								type="password"
								placeholder="senha_forte123*"
								getValue={getValue}
							/>
						</Input.Root>
						{state?.includes("A senha é obrigatória!") && (
							<Error text="A senha é obrigatória!" fieldError />
						)}
						{state?.includes("A senha deve ter no mínimo 8 caracteres.") && (
							<Error text="A senha deve ter no mínimo 8 caracteres." fieldError />
						)}
					</section>
					{state?.includes("Invalid Credentials") && (
						<Error text="Usuário ou senha incorretos." />
					)}
					<Button.Root fullWidth>
						<Button.Text text="Entrar" />
					</Button.Root>
				</form>
			</section>
		</main>
	)
}
