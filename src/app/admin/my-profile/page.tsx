import styles from "./MyProfile.module.css"

import MyProfileWidget from "./MyProfileWidget"

export const metadata = {
	title: "Meu Perfil",
}

export default function MyProfile() {
	return (
		<main className={styles.container}>
			<MyProfileWidget />
		</main>
	)
}
