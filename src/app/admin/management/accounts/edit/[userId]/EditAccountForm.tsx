"use client"

import { ChangeEvent, useContext, useEffect, useState } from "react"
import styles from "./EditAccountForm.module.css"
import { AuthContext } from "@/contexts/AuthContext"
import { useFormState } from "react-dom"
import { object } from "yup"
import * as yup from "yup"
import { Input } from "@/Components/Forms/Input"
import { Button } from "@/Components/Buttons/Button"
import { LuUpload } from "react-icons/lu"
import Error from "@/Components/Forms/Error/Error"
import { IconContext } from "react-icons"
import { FaRegFileImage } from "react-icons/fa6"
import { parseCookies } from "nookies"
import { revalidatePaths } from "@/lib/actions"
import { useRouter } from "next/navigation"

type formDataTypes = {
	email?: string | null
	firstName?: string
	lastName?: string
	username?: string
	course?: string | null
	occupationArea?: string | null
	description?: string | null
	profileImage?: File | null
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

const imageSchema = object().shape({
	profileImage: yup
		.mixed()
		.test("fileFormat", "Apenas imagens são permitidas.", (value: any) => {
			if (value) {
				const supportedFormats = ["png", "jpg", "jpeg"]
				return supportedFormats.includes(value.name.split(".").pop())
			}
			return true
		})
		.test(
			"fileSize",
			"Imagem muito grande, comprima ou escolha uma imagem menor.",
			(value: any) => {
				if (value) {
					return value.size <= 3145728
				}
				return true
			}
		),
})

const formSchema = object({
	email: yup.string().email("Insira um e-mail válido."),
	firstName: yup.string().required("O nome é obrigatório."),
	lastName: yup.string().required("O sobrenome é obrigatório."),
	username: yup
		.string()
		.required("O nome de usuário é obrigatório.")
		.min(3, "Nome de usuário deve ter no mínimo 3 caracteres."),
	course: yup.string(),
	occupationArea: yup.string(),
	description: yup.string(),
})

export default function EditAccountForm({ userData }: userDataTypes) {
	const { userData: user } = useContext(AuthContext)
	const { recoverUserData } = useContext(AuthContext)
	const [formData, setFormData] = useState<formDataTypes>({})
	const [fileName, setFileName] = useState<string>()
	const [state, formAction] = useFormState(handleSubmit, undefined)

	const router = useRouter()

	useEffect(() => {
		setFormData({
			email: userData.email || "",
			firstName: userData.first_name,
			lastName: userData.last_name,
			username: userData.username,
			course: userData.course || null,
			occupationArea: userData.occupation_area || null,
			description: userData.description || null,
		})
	}, [])

	const getValue = (event: ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({
			...prevData,
			[event.target.name]: event.target.value,
		}))
	}

	const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files
		setFormData((prevData) => ({
			...prevData,
			[event.target.name]: file?.item(0),
		}))
		setFileName(file?.item(0)?.name)
	}

	async function handleSubmit() {
		try {
			await imageSchema.validate(formData, { abortEarly: false })
			await formSchema.validate(formData, { abortEarly: false })

			if (formData.username?.includes(" ")) {
				return "Nome de usuário não deve conter espaços em branco."
			}

			const finalForm = new FormData()
			finalForm.append("email", formData?.email!)
			finalForm.append("firstName", formData?.firstName!)
			finalForm.append("lastName", formData?.lastName!)
			finalForm.append("username", formData?.username!)
			finalForm.append("course", formData?.course!)
			finalForm.append("occupationArea", formData?.occupationArea!)
			finalForm.append("description", formData?.description!)
			finalForm.append("profileImage", formData?.profileImage!)

			const { labicToken: token } = parseCookies()

			const payload = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_HOST}users/updateUserData/${userData.id}/`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
					},
					body: finalForm,
				}
			).then((res) => {
				return res
			})

			if (payload.ok) {
				revalidatePaths("/")
				revalidatePaths("/admin/profile")

				recoverUserData(true)

				router.back()
			}
		} catch (err: any) {
			return err.errors
		}
	}

	return (
		<section className={styles.container}>
			<div className={styles.sectionContainer}>
				<h1>Atualize sua conta!</h1>
				<form className={styles.formTag} action={formAction} noValidate>
					<div className={styles.inputContainer}>
						<label
							htmlFor="profileImageInput"
							className={styles.fileInputLabel}
						>
							<div className={styles.innerFileInput}>
								<Error text="Alterações de foto podem levar um tempo para surtir efeito, pois necessitam de tempo para serem processadas."></Error>
								<IconContext.Provider
									value={{
										className: `${styles.fileInputIcon}`,
										color: "#fff",
										size: "64px",
									}}
								>
									<LuUpload></LuUpload>
								</IconContext.Provider>
								<p>Foto de Perfil</p>
								{fileName && (
									<div className={styles.fileInputFileName}>
										<IconContext.Provider
											value={{ color: "#fff", size: "16px" }}
										>
											<FaRegFileImage></FaRegFileImage>
										</IconContext.Provider>
										<p>{fileName}</p>
									</div>
								)}
							</div>
						</label>
						<div style={{ display: "none" }}>
							<Input.Root>
								<Input.Tag
									name="profileImage"
									id="profileImageInput"
									type="file"
									placeholder=""
									getValue={handleFile}
								/>
							</Input.Root>
						</div>
						{state?.includes("Apenas imagens são permitidas.") && (
							<Error text="Apenas imagens são permitidas." fieldError />
						)}
						{state?.includes(
							"Imagem muito grande, comprima ou escolha uma imagem menor."
						) && (
							<Error
								text="Imagem muito grande, comprima ou escolha uma imagem menor."
								fieldError
							/>
						)}
					</div>
					<div className={styles.doubleInput}>
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
								<Error
									text="O nome de usuário é obrigatório."
									fieldError
								/>
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
						<div className={styles.inputContainer}>
							<p className={styles.inputLabel}>E-mail</p>
							<Input.Root>
								<Input.Tag
									name="email"
									type="email"
									placeholder="labic@gmail.com"
									value={formData.email ? formData.email : ""}
									getValue={getValue}
								/>
							</Input.Root>
							{state?.includes("Insira um e-mail válido.") && (
								<Error text="Insira um e-mail válido." fieldError />
							)}
						</div>
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
							<p className={styles.inputLabel}>Curso</p>
							<Input.Root>
								<Input.Tag
									name="course"
									type="text"
									placeholder="Integrado em Redes de Computadores"
									value={formData.course ? formData.course : ""}
									getValue={getValue}
								/>
							</Input.Root>
						</div>
						<div className={styles.inputContainer}>
							<p className={styles.inputLabel}>Áreas de Atuação</p>
							<Input.Root>
								<Input.Tag
									name="occupationArea"
									type="text"
									placeholder="Web Design, Web Development, IoT"
									value={
										formData.occupationArea
											? formData.occupationArea
											: ""
									}
									getValue={getValue}
								/>
							</Input.Root>
						</div>
					</div>
					<div className={styles.inputContainer}>
						<p className={styles.inputLabel}>Sobre</p>
						<Input.Root>
							<Input.Tag
								name="description"
								type="text"
								placeholder="Sou um estudante do Instituto Federal de Sergipe..."
								value={formData.description ? formData.description : ""}
								getValue={getValue}
							/>
						</Input.Root>
					</div>
					<div className={styles.buttonWrapper}>
						<Button.Root
							type="button"
							onClick={() => {
								router.push(`password/${userData.id}`)
							}}
							fullWidth
						>
							<Button.Text text="Alterar Senha" />
						</Button.Root>
						<Button.Root fullWidth>
							<Button.Text text="Salvar" />
						</Button.Root>
					</div>
				</form>
			</div>
		</section>
	)
}
