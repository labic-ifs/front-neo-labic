"use client"

import styles from "./Navbar.module.css"
import Image from "next/image"
import Links from "./Links/Links"
import Link from "next/link"

import { PiUserCirclePlusLight } from "react-icons/pi"
import { IconContext } from "react-icons"
import { Squash as Hamburger } from "hamburger-react"
import { useContext, useState } from "react"
import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { PiUserCircleLight } from "react-icons/pi"

export default function Navbar() {
	const [navState, setNavState] = useState<boolean>(false)

	const { userData } = useContext(AuthContext)

	const router = useRouter()

	const links = [
		{
			name: "Início",
			path: "/",
		},
		{
			name: "Membros",
			path: "/members",
		},
		{
			name: "Artigos",
			path: "/articles",
		},
		{
			name: "Quem Somos",
			path: "/about-us",
		},
	]

	return (
		<>
			<div className={styles.navDummy}></div>
			<nav
				className={styles.container}
				style={navState ? { maxHeight: "48rem" } : { maxHeight: "67px" }}
			>
				<section className={styles.left}>
					<Image
						className={styles.logoImage}
						src="/logo.png"
						alt="logo"
						width={48}
						height={48}
						onClick={() => {
							router.push("/")
						}}
					/>
					<div className={styles.navToggle}>
						<Hamburger
							size={32}
							rounded
							onToggle={() => setNavState((prevState) => !prevState)}
						></Hamburger>
					</div>
				</section>
				<section className={styles.center}>
					<Links links={links} />
				</section>
				<section className={styles.right}>
					{!userData?.id ? (
						<Link href="/sign-in">
							<IconContext.Provider
								value={{
									className: styles.signInIcon,
									color: "#fff",
									size: "48px",
								}}
							>
								<PiUserCirclePlusLight />
							</IconContext.Provider>
						</Link>
					) : userData?.profile_image ? (
						<Link href="/admin/my-profile">
							<Image
								className={styles.userProfileImage}
								src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}users/getUserProfileImage/${userData?.id}`}
								alt="profile image"
								width={48}
								height={48}
							/>
						</Link>
					) : (
						<Link href="/admin/my-profile">
							<IconContext.Provider
								value={{
									className: styles.signInIcon,
									color: "#fff",
									size: "48px",
								}}
							>
								<PiUserCircleLight />
							</IconContext.Provider>
						</Link>
					)}
				</section>
			</nav>
		</>
	)
}
