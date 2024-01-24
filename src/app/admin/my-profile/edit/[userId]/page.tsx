import styles from "./EditMyProfile.module.css"

import EditMyProfileForm from "./Form"
import GoBackButton from "@/Components/Posts/shortcuts/GoBackButton/GoBackButton"

export const metadata = {
	title: "Editar Perfil",
}

export default function EditMyProfile() {
	return (
		<main className={styles.container}>
			<div className={styles.formContainer}>
				<div className={styles.previousPageSection}>
					<GoBackButton />
				</div>
				<EditMyProfileForm />
			</div>
		</main>
	)
}
