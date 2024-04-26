import styles from "./CreateAccount.module.css"

import CreateAccountForm from "./Form"
import GoBackButton from "@/Components/shortcuts/GoBackButton/GoBackButton"

export const metadata = {
	title: "Criar Conta",
}

export default async function CreateAccount() {
	return (
		<main className={styles.container}>
			<section className={styles.sectionContainer}>
				<div className={styles.previousPageSection}>
					<GoBackButton />
				</div>
				<div className={styles.header}>
					<h1>Crie uma Conta</h1>
				</div>
				<CreateAccountForm></CreateAccountForm>
			</section>
		</main>
	)
}
