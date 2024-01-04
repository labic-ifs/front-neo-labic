"use client"

import styles from "./Navbar.module.css"
import Image from "next/image"
import Links from "./Links/Links"
import Link from "next/link"

import { PiUserCirclePlusLight } from "react-icons/pi"
import { IconContext } from "react-icons"
import { useRouter } from "next/navigation"
import { Squash as Hamburger } from "hamburger-react"
import { useState } from "react"

export default function Navbar() {
	const router = useRouter()

	const [navState, setNavState] = useState<boolean>(false)

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
		<nav
			className={styles.container}
			style={navState ? { maxHeight: "48rem" } : { maxHeight: "67px" }}
		>
			<section className={styles.left}>
				<div className={styles.logoContainer}>
					<Image src="/logo.png" alt="logo" fill />
				</div>
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
				<Link href="/sign-in">
					<IconContext.Provider
						value={{ className: styles.signInIcon, color: "#fff", size: "48px" }}
					>
						<PiUserCirclePlusLight />
					</IconContext.Provider>
				</Link>
			</section>
		</nav>
	)
}
