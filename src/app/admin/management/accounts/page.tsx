import { Button } from "@/Components/Buttons/Button"
import styles from "./AccountManagement.module.css"
import { cookies } from "next/headers"
import UserTable from "@/Components/Users/UserTable/UsersTable"
import Link from "next/link"

export const metadata = {
	title: "Contas",
}

const getUsersData = async () => {
	const token = cookies().get("labicToken")

	const users = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}admin/getAllUsersData/`,
		{
			headers: {
				Authorization: `Bearer ${token?.value}`,
			},
		}
	).then((res) => res.json())

	return users
}

export default async function AccountsManagement() {
	const usersData = await getUsersData()

	return (
		<main className={styles.container}>
			<section className={styles.sectionContainer}>
				<div className={styles.header}>
					<h1>Gerenciamento de membros</h1>
					<Link style={{ textDecoration: "none" }} href={"accounts/create/"}>
						<Button.Root>
							<Button.Text text="Adicionar Membro" />
						</Button.Root>
					</Link>
				</div>
				<div className={styles.table}>
					<UserTable users={usersData}></UserTable>
				</div>
			</section>
		</main>
	)
}
