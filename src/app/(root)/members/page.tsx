import styles from "./Members.module.css"
import { Button } from "@/Components/Buttons/Button"

import Image from "next/image"
import { cookies } from "next/headers"

export const metadata = {
	title: "Membros",
}

const getMembers = async () => {
	const members = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_HOST}users/getAllActiveUsersData/`,
		{
			cache: "no-store",
		}
	).then((res) => res.json())

	return { members: members }
}

type MembersTypes = {
	members: {
		id: string
		username: string
		first_name: string
		last_name: string
		profile_image: string | null
		occupation_area: string | null
	}[]
}

export default async function Members() {
	const { members }: MembersTypes = await getMembers()

	return (
		<div className={styles.outerContainer}>
			<div className={styles.container}>
				<h1 className={styles.header}>Conheça Nossos Membros!</h1>
				<div className={styles.members}>
					{members.map((item) => {
						return (
							<div className={styles.member}>
								<div className={styles.membersInfoContainer}>
									{item.profile_image ? (
										<Image
											className={styles.profileImage}
											src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}users/getUserProfileImage/${item.profile_image}`}
											alt="profile image"
											width={250}
											height={250}
										></Image>
									) : (
										<Image
											className={styles.profileImage}
											src={"/user/profile-image.png"}
											alt="profile image"
											width={250}
											height={250}
										></Image>
									)}
									<h2 className={styles.profileName}>
										{item.first_name} {item.last_name}
									</h2>
									<hr />
									{item.occupation_area ? (
										<p className={styles.profileInfo}>
											<strong>Atuação:</strong>{" "}
											{item.occupation_area}
										</p>
									) : (
										<p className={styles.profileInfo}>
											<strong>Atuação:</strong> Não cadastrado.
										</p>
									)}
								</div>
								<Button.Root fullWidth>
									<Button.Text text="Quero Conhecer!" />
								</Button.Root>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
