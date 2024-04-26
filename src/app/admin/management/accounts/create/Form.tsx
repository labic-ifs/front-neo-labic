"use client"

import styles from "./Form.module.css"

import { AuthContext } from "@/contexts/AuthContext"
import { ChangeEvent, useContext, useState } from "react"
import { useFormState } from "react-dom"
import { object } from "yup"
import { Input } from "@/Components/Forms/Input"
import { Button } from "@/Components/Buttons/Button"
import Error from "@/Components/Forms/Error/Error"
import * as yup from "yup"
import { parseCookies } from "nookies"
import { revalidatePaths } from "@/lib/actions"
import { useRouter } from "next/navigation"

type formDataTypes = {
	firstName?: string
	lastName?: string
	username?: string
	password?: string
	passwordConfirmation?: string
}

const formSchema = object({
	firstName: yup.string().required("O nome é obrigatório."),
	lastName: yup.string().required("O sobrenome é obrigatório."),
	username: yup
		.string()
		.required("O nome de usuário é obrigatório.")
		.min(3, "Nome de usuário deve ter no mínimo 3 caracteres."),
	password: yup
		.string()
		.min(8, "A senha deve ter no mínimo 8 caracteres.")
		.required("A senha é obrigatória!"),
})

export default function CreateAccountForm() {
	// Remove user if not superuser
	const { userData } = useContext(AuthContext)

	const router = useRouter()

	if (!userData?.is_superuser) {
		router.push("/admin/profile")
	}

	const [formData, setFormData] = useState<formDataTypes>({})
	const [state, formAction] = useFormState(handleSubmit, undefined)

	const getValue = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({
			...prevData,
			[event.target.name]: event.target.value,
		}))
	}

	async function handleSubmit() {
		try {
			await formSchema.validate(formData, { abortEarly: false })

			if (formData.username?.includes(" ")) {
				return "Nome de usuário não deve conter espaços em branco."
			}

			if (formData.password !== formData.passwordConfirmation) {
				return "As senhas devem ser iguais!"
			}

			const { labicToken: token } = parseCookies()

			const finalForm = new FormData()
			finalForm.append("firstName", formData?.firstName!)
			finalForm.append("lastName", formData?.lastName!)
			finalForm.append("username", formData?.username!)
			finalForm.append("password", formData?.password!)
			finalForm.append("passwordConfirmation", formData?.passwordConfirmation!)

			const payload = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}auth/createUser/`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: finalForm,
				}
			).then((res) => {
				return res
			})

			if (payload.ok) {
				revalidatePaths("/admin/management/accounts/")

				router.push("/admin/management/accounts/")
			} else {
				return "Something went wrong."
			}
		} catch (err: any) {
			return err.errors
		}
	}

	return (
		<>
			<form action={formAction}>
				<div className={styles.inputContainer}>
					<p className={styles.inputLabel}>Nome de Usuário</p>
					<Input.Root>
						<Input.Tag
							name="username"
							type="text"
							placeholder="labic.ifs"
							value={formData.username ? formData.username : ""}
							getValue={getValue}
						/>
					</Input.Root>
					{state?.includes("O nome de usuário é obrigatório.") && (
						<Error text="O nome de usuário é obrigatório." fieldError />
					)}
					{state?.includes(
						"Nome de usuário não deve conter espaços em branco."
					) && (
						<Error
							text="Nome de usuário não deve conter espaços em branco."
							fieldError
						/>
					)}
					{state?.includes(
						"Nome de usuário deve ter no mínimo 3 caracteres."
					) && (
						<Error
							text="Nome de usuário deve ter no mínimo 3 caracteres."
							fieldError
						/>
					)}
				</div>
				<div className={styles.doubleInput}>
					<div className={styles.inputContainer}>
						<p className={styles.inputLabel}>Nome</p>
						<Input.Root>
							<Input.Tag
								name="firstName"
								type="text"
								placeholder="Stephanie"
								value={formData.firstName ? formData.firstName : ""}
								getValue={getValue}
							/>
						</Input.Root>
						{state?.includes("O nome é obrigatório.") && (
							<Error text="O nome é obrigatório." fieldError />
						)}
					</div>
					<div className={styles.inputContainer}>
						<p className={styles.inputLabel}>Sobrenome</p>
						<Input.Root>
							<Input.Tag
								name="lastName"
								type="text"
								placeholder="Kamarry Alves"
								value={formData.lastName ? formData.lastName : ""}
								getValue={getValue}
							/>
						</Input.Root>
						{state?.includes("O sobrenome é obrigatório.") && (
							<Error text="O sobrenome é obrigatório." fieldError />
						)}
					</div>
				</div>
				<div className={styles.doubleInput}>
					<div className={styles.inputContainer}>
						<p className={styles.inputLabel}>Senha</p>
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
					{state?.includes("Something went wrong.") && (
						<Error text="Algo deu errado, tente novamente mais tarde!" />
					)}
				</div>
				<div className={styles.buttonWrapper}>
					<Button.Root fullWidth>
						<Button.Text text="Criar" />
					</Button.Root>
				</div>
			</form>
		</>
	)
}
