"use client"

import styles from "./Sidebar.module.css"
import Image from "next/image"
import SidebarLinks from "./SidebarLinks/SidebarLinks"

import { Squash as Hamburger } from "hamburger-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Sidebar() {
	const [navState, setNavState] = useState(false)

	const router = useRouter()

	return (
		<>
			<div className={styles.navDummy}></div>
			<nav
				className={styles.container}
				style={navState ? { maxWidth: "216px" } : { maxWidth: "70px" }}
				onMouseEnter={() => setNavState((prevState) => !prevState)}
				onMouseLeave={() => setNavState((prevState) => !prevState)}
			>
				<section
					className={styles.logoSection}
					onClick={() => {
						router.push("/")
					}}
				>
					<Image src="/logo.png" alt="logo" width={48} height={48} />
					<h5
						className={styles.navTitle}
						style={navState ? { opacity: "1" } : { opacity: "0" }}
					>
						Plataforma Labic
					</h5>
				</section>
				<section className={styles.myAccountSection}>
					<SidebarLinks navState={navState} />
				</section>
			</nav>
			<div className={styles.mobileNavDummy}></div>
			<nav
				className={styles.mobileContainer}
				style={navState ? { maxHeight: "48rem" } : { maxHeight: "67px" }}
			>
				<section className={styles.top}>
					<Image
						className={styles.mobileLogo}
						src="/logo.png"
						alt="logo"
						width={48}
						height={48}
						onClick={() => {
							router.push("/")
						}}
					/>
					<Hamburger
						size={32}
						rounded
						onToggle={() => setNavState((prevState) => !prevState)}
					></Hamburger>
				</section>
				<section className={styles.bottom}>
					<SidebarLinks navState />
				</section>
			</nav>
		</>
	)
}
