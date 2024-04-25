"use client"

import Link from "next/link"
import styles from "./SidebarLinks.module.css"

import { FaRegUser } from "react-icons/fa"
import { MdOutlineArticle } from "react-icons/md"
import { MdOutlineManageAccounts } from "react-icons/md"

import { MinimalButton } from "@/Components/Buttons/MinimalButton"
import { usePathname } from "next/navigation"

type SidebarLinksProps = {
	navState: boolean
	isSuperuser: boolean
}

export default function SidebarLinks({ navState, isSuperuser }: SidebarLinksProps) {
	const pathname = usePathname()

	const userLinks = [
		{
			name: "Meu Perfil",
			path: "/admin/my-profile",
			icon: FaRegUser,
		},
		{
			name: "Meus Artigos",
			path: "/admin/my-articles",
			icon: MdOutlineArticle,
		},
	]
	const adminLinks = [
		{
			name: "Contas",
			path: "/admin/management/accounts",
			icon: MdOutlineManageAccounts,
		},
	]

	return (
		<>
			<p className={styles.sectionHeader}>Sua Conta</p>
			{userLinks.map((item) => {
				return (
					<Link className={styles.container} href={item.path} key={item.name}>
						<MinimalButton.Root
							extraClassName={`${pathname === item.path && styles.active}`}
						>
							<MinimalButton.Icon
								icon={item.icon}
								extraStyles={styles.itemIcon}
							/>
							<div
								className={styles.textSpan}
								style={navState ? { opacity: "1" } : { opacity: "0" }}
							>
								<MinimalButton.Text text={item.name} />
							</div>
						</MinimalButton.Root>
					</Link>
				)
			})}
			{isSuperuser ? (
				<>
					<p className={styles.sectionHeader}>Gerência</p>
					{adminLinks.map((item) => {
						return (
							<Link
								className={styles.container}
								href={item.path}
								key={item.name}
							>
								<MinimalButton.Root
									extraClassName={`${
										pathname === item.path && styles.active
									}`}
								>
									<MinimalButton.Icon
										icon={item.icon}
										extraStyles={styles.itemIcon}
									/>
									<div
										className={styles.textSpan}
										style={
											navState ? { opacity: "1" } : { opacity: "0" }
										}
									>
										<MinimalButton.Text text={item.name} />
									</div>
								</MinimalButton.Root>
							</Link>
						)
					})}
				</>
			) : (
				<></>
			)}
		</>
	)
}
