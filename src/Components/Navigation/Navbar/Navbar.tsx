"use client"

import styles from "./Navbar.module.css"
import Image from "next/image"
import Links from "./Links/Links"
import Link from "next/link"

import { PiUserCirclePlusLight } from "react-icons/pi"
import { IconContext } from "react-icons"
import { Squash as Hamburger } from "hamburger-react"
import { useContext, useEffect, useState } from "react"
import { HiOutlineUserCircle } from "react-icons/hi2"
import { AuthContext } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { PiUserCircleLight } from "react-icons/pi"
import { CiLogout, CiLogin } from "react-icons/ci"
import { destroyCookie } from "nookies"
import { revalidatePaths } from "@/lib/actions"

export default function Navbar() {
	const [navState, setNavState] = useState<boolean>(false)

	const { userData, signIn } = useContext(AuthContext)

	const router = useRouter()

	const switchNav = () => {
		if (navState) {
			document.querySelector("#center")?.classList.toggle(`${styles.showFlex}`)
			document.querySelector("#right")?.classList.toggle(`${styles.show}`)

			setNavState((prevState) => !prevState)
		} else {
			document.querySelector("#center")?.classList.toggle(`${styles.showFlex}`)
			document.querySelector("#right")?.classList.toggle(`${styles.show}`)

			setNavState((prevState) => !prevState)
		}
	}

	const switchDropdown = () => {
		document.querySelector("#dropdown-content")?.classList.toggle(`${styles.show}`)
	}

	const logout = () => {
		destroyCookie(undefined, "labicToken")

		signIn({})
		router.refresh()
	}

	useEffect(() => {
		window.onclick = (event: any) => {
			if (
				!event.target.matches("#dropdown-button") &&
				!event.target.matches("#user-profile-image")
			) {
				let dropdownContent = document.getElementsByClassName(
					`${styles.dropdownContent}`
				)

				for (let i = 0; i < dropdownContent?.length; i++) {
					let openDropdown = dropdownContent[i]

					if (openDropdown.classList.contains(`${styles.show}`)) {
						openDropdown.classList.remove(`${styles.show}`)
					}
				}
			}
		}
	})

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
						<Hamburger size={32} rounded onToggle={switchNav}></Hamburger>
					</div>
				</section>
				<section id="center" className={styles.center}>
					<Links links={links} />
				</section>
				<section id="right" className={styles.right}>
					<div className={styles.dropdownContainer}>
						{!userData?.id ? (
							<button
								id="dropdown-button"
								className={styles.dropdownButton}
								onClick={switchDropdown}
							>
								<IconContext.Provider
									value={{
										className: styles.signInIcon,
										color: "#fff",
										size: "48px",
									}}
								>
									<PiUserCirclePlusLight id="user-profile-image" />
								</IconContext.Provider>
							</button>
						) : userData?.profile_image ? (
							<button
								id="dropdown-button"
								className={styles.dropdownButton}
								onClick={switchDropdown}
							>
								<Image
									id="user-profile-image"
									className={styles.userProfileImage}
									src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}users/getUserProfileImage/${userData?.profile_image}`}
									alt="profile image"
									width={48}
									height={48}
								/>
							</button>
						) : (
							<button
								id="dropdown-button"
								className={styles.dropdownButton}
								onClick={switchDropdown}
							>
								<IconContext.Provider
									value={{
										className: styles.signInIcon,
										color: "#fff",
										size: "48px",
									}}
								>
									<PiUserCircleLight id="user-profile-image" />
								</IconContext.Provider>
							</button>
						)}
						<div id="dropdown-content" className={styles.dropdownContent}>
							{userData?.id ? (
								<div>
									<Link
										href="/admin/profile"
										className={styles.dropdownItemContainer}
									>
										<IconContext.Provider
											value={{
												color: "#fff",
												size: "20px",
											}}
										>
											<HiOutlineUserCircle />
										</IconContext.Provider>
										<p>Minha Conta</p>
									</Link>

									<button
										onClick={logout}
										className={styles.dropdownItemContainer}
									>
										<IconContext.Provider
											value={{
												color: "#fff",
												size: "20px",
											}}
										>
											<CiLogout />
										</IconContext.Provider>
										<p>Sair</p>
									</button>
								</div>
							) : (
								<Link
									href="/sign-in"
									className={styles.dropdownItemContainer}
								>
									<IconContext.Provider
										value={{
											color: "#fff",
											size: "20px",
										}}
									>
										<CiLogin />
									</IconContext.Provider>
									<p>Entrar</p>
								</Link>
							)}
						</div>
					</div>
				</section>
			</nav>
		</>
	)
}
