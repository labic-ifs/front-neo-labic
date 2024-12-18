"use client"

import styles from "./Form.module.css"
import Error from "@/Components/Forms/Error/Error"

import { Button } from "@/Components/Buttons/Button"
import { Input } from "@/Components/Forms/Input"

import { MdOutlineEmail } from "react-icons/md"
import { RiLockPasswordLine } from "react-icons/ri"
import { AuthContext } from "@/contexts/AuthContext"
import { useFormState } from "react-dom"
import { ChangeEvent, useContext, useState } from "react"
import { object, string } from "yup"
import { useRouter } from "next/navigation"

type formTypes = {
	key?: string
	password?: string
}

const formSchema = object({
	key: string().required("O e-mail ou usuário é obrigatório!"),
	password: string()
		.min(8, "A senha deve ter no mínimo 8 caracteres.")
		.required("A senha é obrigatória!"),
})

export default function SignInForm() {
	const [formData, setFormData] = useState<formTypes>({})
	const [state, formAction] = useFormState(handleSubmit, undefined)
	const { signIn } = useContext(AuthContext)

	const router = useRouter()

	const getValue = (event: ChangeEvent<HTMLInputElement>) => {
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
		<section className={styles.container}>
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
	)
}
