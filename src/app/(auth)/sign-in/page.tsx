import Image from "next/image"
import styles from "./SignIn.module.css"
import Form from "./Form"

export const metadata = {
	title: "Sign-in",
}

export default function SignIn() {
	return (
		<main className={styles.container}>
			<Image
				className={styles.imageContainer}
				src="/auth/sign-in-illustration.png"
				alt="Signin Illustration"
				width={960}
				height={1080}
			/>
			<Image
				className={styles.mobileImageContainer}
				src="/auth/mobile-sign-in-illustration.png"
				alt="Signin Illustration"
				width={1920}
				height={1048}
			/>
			<Form />
		</main>
	)
}
