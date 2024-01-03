"use client"

import Image from "next/image"
import styles from "./SignIn.module.css"

import Error from "@/Components/Forms/Error/Error"
import { Button } from "@/Components/Button"
import { Input } from "@/Components/Forms/Input"

import React, { useContext, useState } from "react"
import { useFormState } from "react-dom"
import { PiUserCirclePlusLight } from "react-icons/pi"
import { object, string } from "yup"
import { AuthContext } from "@/contexts/AuthContext"

type formTypes = {
	email: string
	password: string
}

let formSchema = object({
	email: string().email("Insira um e-mail válido!").required("O e-mail é obrigatório!"),
	password: string().required("A senha é obrigatória!"),
})

export default function SignIn() {
	const [formData, setFormData] = useState<formTypes>({ email: "", password: "" })
	const [state, formAction] = useFormState(handleSubmit, undefined)
	const { signIn } = useContext(AuthContext)

	const getValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({ ...prevData, [event.target.name]: event.target.value }))
	}

	async function handleSubmit() {
		try {
			const validate = await formSchema.validate(formData, { abortEarly: false })

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
					<h1>Entre na sua conta Labic!</h1>
					<section className={styles.inputSection}>
						<p className={styles.inputLabel}>E-mail</p>
						<Input.Root>
							<Input.Icon icon={PiUserCirclePlusLight} />
							<Input.Tag
								name="email"
								type="email"
								placeholder="labic@gmail.com"
								getValue={getValue}
							/>
						</Input.Root>
						{state?.includes("O e-mail é obrigatório!") && (
							<Error text="O e-mail é obrigatório!" fieldError />
						)}
						{state?.includes("Insira um e-mail válido!") && (
							<Error text="Insira um e-mail válido!" fieldError />
						)}
					</section>
					<section className={styles.inputSection}>
						<p className={styles.inputLabel}>Senha</p>
						<Input.Root>
							<Input.Icon icon={PiUserCirclePlusLight} />
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
