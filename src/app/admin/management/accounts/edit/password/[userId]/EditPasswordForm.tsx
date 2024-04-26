"use client"

import styles from "./EditPasswordForm.module.css"

import { Input } from "@/Components/Forms/Input"
import { useFormState } from "react-dom"
import Error from "@/Components/Forms/Error/Error"
import { useContext, useState } from "react"
import { ChangeEvent } from "react"
import { Button } from "@/Components/Buttons/Button"
import { object } from "yup"
import * as yup from "yup"
import { parseCookies } from "nookies"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/contexts/AuthContext"

type formDataTypes = {
	oldPassword?: string
	password?: string
	passwordConfirmation?: string
}

type userDataTypes = {
	userData: {
		id: string
		profile_image?: string
		email?: string
		first_name: string
		last_name: string
		username: string
		course?: string
		occupation_area?: string
		description?: string
		is_active: boolean
		is_superuser: boolean
	}
}

const formSchema = object({
	password: yup
		.string()
		.min(8, "A senha deve ter no mínimo 8 caracteres.")
		.required("A senha é obrigatória!"),
})

export default function EditPasswordForm({ userData }: userDataTypes) {
	const { userData: user } = useContext(AuthContext)
	const [formData, setFormData] = useState<formDataTypes>({})
	const [state, formAction] = useFormState(handleSubmit, undefined)

	const router = useRouter()

	const getValue = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({
			...prevData,
			[event.target.name]: event.target.value,
		}))
	}

	async function handleSubmit() {
		try {
			await formSchema.validate(formData, { abortEarly: false })

			if (formData.password !== formData.passwordConfirmation) {
				return "As senhas devem ser iguais!"
			}

			const { labicToken: token } = parseCookies()

			const finalForm = new FormData()

			finalForm.append("oldPassword", formData?.oldPassword!)
			finalForm.append("password", formData?.password!)
			finalForm.append("passwordConfirmation", formData?.passwordConfirmation!)

			const status = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}users/changePassword/${userData.id}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: finalForm,
				}
			)

			if (status.ok) {
				router.push("/admin/profile")
			} else {
				return status.statusText
			}
		} catch (err: any) {
			return err.errors
		}
	}

	return (
		<form action={formAction}>
			<div className={styles.inputContainer}>
				<p className={styles.inputLabel}>Senha Atual</p>
				<Input.Root>
					{/* <Input.Icon icon={RiLockPasswordLine} /> */}
					<Input.Tag
						name="oldPassword"
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
			</div>
			<div className={styles.doubleInput}>
				<div className={styles.inputContainer}>
					<p className={styles.inputLabel}>Nova Senha</p>
					<Input.Root>
						{/* <Input.Icon icon={RiLockPasswordLine} /> */}
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
						<Error
							text="A senha deve ter no mínimo 8 caracteres."
							fieldError
						/>
					)}
				</div>
				<div className={styles.inputContainer}>
					<p className={styles.inputLabel}>Repetir Senha</p>
					<Input.Root>
						{/* <Input.Icon icon={RiLockPasswordLine} /> */}
						<Input.Tag
							name="passwordConfirmation"
							type="password"
							placeholder="senha_forte123*"
							getValue={getValue}
						/>
					</Input.Root>
					{state?.includes("As senhas devem ser iguais!") && (
						<Error text="As senhas devem ser iguais!" fieldError />
					)}
				</div>
			</div>

			<div className={styles.finalErrorMargin}>
				{state?.includes("Unauthorized") && (
					<Error text="Usuário ou senha incorretos." />
				)}
				{state?.includes("Something went wrong.") && (
					<Error text="Algo deu errado, tente novamente mais tarde!" />
				)}
			</div>
			<div className={styles.buttonWrapper}>
				<Button.Root fullWidth>
					<Button.Text text="Alterar" />
				</Button.Root>
			</div>
		</form>
	)
}
