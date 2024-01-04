"use client"

import { ElementType } from "react"
import styles from "./MinimalButton.module.css"
import { IconContext } from "react-icons"

type MinimalButtonIconProps = {
	icon: ElementType
	extraStyles?: string
}

export default function MinimalButtonIcon({ icon: Icon, extraStyles }: MinimalButtonIconProps) {
	return (
		<IconContext.Provider value={{ className: extraStyles, color: "#fff", size: "16px" }}>
			<Icon></Icon>
		</IconContext.Provider>
	)
}
