"use client"

import { useContext } from "react"
import styles from "./UsersTable.module.css"

import { IconContext } from "react-icons"

import { FaRegCheckCircle } from "react-icons/fa"
import { RxCrossCircled } from "react-icons/rx"
import { AuthContext } from "@/contexts/AuthContext"
import { Button } from "@/Components/Buttons/Button"
import Link from "next/link"
import { FaRegEdit } from "react-icons/fa"

type UserTableTyper = {
	users: {
		id: string
		profile_image: string
		email: string
		first_name: string
		last_name: string
		username: string
		course: string
		occupation_area: string
		is_active: number
		is_superuser: number
	}[]
}

export default function UserTable({ users }: UserTableTyper) {
	const { userData } = useContext(AuthContext)

	return (
		<>
			<table className={styles.table}>
				<thead className={styles.tableHeader}>
					<tr>
						<td className={styles.tableData}>Nome de Usuário</td>
						<td className={styles.tableData}>Nome</td>
						<td className={styles.tableData}>E-mail</td>
						<td className={styles.tableData}>Curso</td>
						<td className={styles.tableData}>Status</td>
						<td className={styles.tableData}>Editar</td>
					</tr>
				</thead>
				<tbody className={styles.tableBody}>
					{userData?.is_superuser &&
						users.map((user) => {
							return (
								<tr key={user.id}>
									<td className={styles.tableData}>{user.username}</td>
									<td
										className={styles.tableData}
									>{`${user.first_name} ${user.last_name}`}</td>
									<td className={styles.tableData}>{user.email}</td>
									<td className={styles.tableData}>{user.course}</td>
									<td
										className={`${styles.tableData} ${styles.isActive}`}
									>
										{user.is_active ? (
											<IconContext.Provider
												value={{ color: "#3dff77", size: "20px" }}
											>
												<FaRegCheckCircle></FaRegCheckCircle>
											</IconContext.Provider>
										) : (
											<IconContext.Provider
												value={{ color: "#e63535", size: "20px" }}
											>
												<RxCrossCircled></RxCrossCircled>
											</IconContext.Provider>
										)}
									</td>
									<td className={styles.tableData}>
										<Link href={`accounts/edit/${user.id}`}>
											<IconContext.Provider
												value={{ color: "#fff", size: "20px" }}
											>
												<FaRegEdit></FaRegEdit>
											</IconContext.Provider>
										</Link>
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</>
	)
}
