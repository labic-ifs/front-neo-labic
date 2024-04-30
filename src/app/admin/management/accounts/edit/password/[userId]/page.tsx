import styles from "./EditPassword.module.css"

import GoBackButton from "@/Components/shortcuts/GoBackButton/GoBackButton"
import EditPasswordForm from "./EditPasswordForm"
import { cookies } from "next/headers"

export const metadata = {
	title: "Alterar Senha",
}

const getUser = async (userId: string) => {
	const token = cookies().get("labicToken")

	const user = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}users/getUserData/${userId}`,
		{
			headers: {
				Authorization: `Bearer ${token?.value}`,
			},
			cache: "no-store",
		}
	).then((res) => res.json())

	return user
}

export default async function EditPassword({ params }: any) {
	const userId = params.userId
	const userData = await getUser(userId)

	return (
		<main className={styles.container}>
			<div className={styles.formContainer}>
				<div className={styles.previousPageSection}>
					<GoBackButton />
				</div>
				<div className={styles.header}>
					<h1>Alterar Senha</h1>
				</div>
				<EditPasswordForm userData={userData} />
			</div>
		</main>
	)
}
