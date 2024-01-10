"use client"

import { useRouter } from "next/navigation"

export default function CreateUser() {
	const router = useRouter()

	async function handleSubmit() {
		const form = new FormData()
		form.append("email", "admin@admin.com")
		form.append("password", "123456789")
		form.append("passwordConfirmation", "123456789")
		form.append("name", "Felipe")
		form.append("surname", "Carvalho Leal")

		const options = {
			method: "POST",
			body: form,
		}

		fetch("http://api.labic.dev.br/auth/createUser/", options).then((res) => res.json())

		router.push("/sign-in")
	}

	return (
		<main>
			<form action={handleSubmit}>
				<button>Enviar</button>
			</form>
		</main>
	)
}
