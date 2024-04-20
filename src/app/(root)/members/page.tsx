import styles from "./Members.module.css"

import { Button } from "@/Components/Buttons/Button"

import { cookies } from "next/headers"

export const metadata = {
	title: "Membros",
}

const getMembers = async () => {
	const members = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}posts/getAllMemberss/`, {
		cache: "no-store",
	}).then((res) => res.json())

	return { members: members.reverse() }
}

type MembersTypes = {
	articles: {
		id: string
		body: string
		user_id: string
		created_at: Date
		username?: string
		first_name?: string
		last_name?: string
		profile_image?: string
		slug?: string
	}[]
}


export default async function Members() {
    const { members }: MembersTypes = await getMembers()
	return (
		<div className={styles.container}>
			<h1>Conheça Nossos Membros!</h1>
			<div className={styles.members}>
                {members.map((item) => {
				    return <div className={styles.member}>
                        <p> {(item)} </p>
						<Button.Root fullWidth><Button.Text text="Quero Conhecer!"/></Button.Root>
                    </div>
			    })}
            </div>
		</div>
	)
}