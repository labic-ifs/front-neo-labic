import styles from "./CreateAccount.module.css"

import CreateAccountForm from "./Form"

export default async function CreateAccount() {
	return (
		<main className={styles.container}>
			<section className={styles.sectionContainer}>
				<div className={styles.header}>
					<h1>Crie uma Conta</h1>
				</div>
				<CreateAccountForm></CreateAccountForm>
			</section>
		</main>
	)
}
