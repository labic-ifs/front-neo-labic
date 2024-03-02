"use client"

import styles from "./MyProfileWidget.module.css"
import Image from "next/image"

import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"
import { Button } from "@/Components/Buttons/Button"
import { useRouter } from "next/navigation"

export default function MyProfileWidget() {
	const { userData } = useContext(AuthContext)
	const router = useRouter()

	return (
		<section className={styles.container}>
			<div className={styles.topContainer}>
				<div className={styles.mainInfoContainer}>
					{userData?.profile_image ? (
						<Image
							className={styles.profileImage}
							src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}users/getUserProfileImage/${userData?.id}`}
							alt="profile image"
							width={512}
							height={512}
						></Image>
					) : (
						<Image
							className={styles.profileImage}
							src={"/user/profile-image.png"}
							alt="profile image"
							width={512}
							height={512}
						></Image>
					)}
					<div className={styles.textInfoContainer}>
						<div>
							<h1 className={styles.title}>
								{userData?.first_name} {userData?.last_name}
							</h1>
							{userData?.course ? (
								<p>{userData?.course}</p>
							) : (
								<p>Curso não cadastrado</p>
							)}
						</div>
						<div>
							<p className={styles.boldText}>Áreas de atuação:</p>
							{userData?.occupation_area ? (
								<p>{userData?.occupation_area}</p>
							) : (
								<p>Áreas de atuação não cadastradas</p>
							)}
						</div>
					</div>
				</div>
				<div className={styles.otherInfoContainer}>
					<div className={styles.otherInfoHeaderContainer}>
						<h1 className={styles.title}>Dados</h1>
						<Button.Root
							onClick={() => {
								router.push(`/admin/my-profile/edit/${userData?.id}`)
							}}
						>
							<Button.Text text="Editar" />
						</Button.Root>
					</div>
					<div className={styles.otherInfoAreasContainer}>
						<div className={styles.otherInfoAreas}>
							<div className={styles.otherInfoArea}>
								<p className={styles.boldText}>Email:</p>
								<p>{userData?.email}</p>
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div>
			<div className={styles.bottomContainer}>
				<div className={styles.description}>
					<p className={styles.boldText}>Sobre:</p>
					{userData?.description ? (
						<p>{userData?.description}</p>
					) : (
						<p>Sobre não cadastrado</p>
					)}
				</div>
			</div>
		</section>
	)
}
