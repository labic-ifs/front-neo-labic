import styles from "./page.module.css"

import { Button } from "@/Components/Buttons/Button"
import { MinimalButton } from "@/Components/Buttons/MinimalButton"
import { AuthContext } from "@/contexts/AuthContext"

import { useContext } from "react"
import { PiUserCirclePlusLight } from "react-icons/pi"
import HomeHero from "./HomeHero"
import AreasOfExpertise from "./AreasOfExpertise"

export const metadata = {
	title: "Início",
}

export default function Home() {
	return (
		<main className={styles.container}>
			<HomeHero />
      <AreasOfExpertise />
		</main>
	)
}
