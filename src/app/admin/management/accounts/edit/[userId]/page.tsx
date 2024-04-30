import styles from "./EditAccount.module.css"

import EditAccountForm from "./EditAccountForm"
import GoBackButton from "@/Components/shortcuts/GoBackButton/GoBackButton"
import { cookies } from "next/headers"

export const metadata = {
	title: "Editar Conta",
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

export default async function EditAccount({ params }: any) {
	const userId = params.userId
	const userData = await getUser(userId)

	return (
		<main className={styles.container}>
			<div className={styles.formContainer}>
				<div className={styles.previousPageSection}>
					<GoBackButton />
				</div>
				<EditAccountForm userData={userData} />
			</div>
		</main>
	)
}
