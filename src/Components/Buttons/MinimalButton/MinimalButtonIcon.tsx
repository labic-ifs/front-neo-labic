"use client"

import styles from "./MinimalButton.module.css"

import { ElementType } from "react"
import { IconContext } from "react-icons"

import { FaArrowLeft } from "react-icons/fa"

type MinimalButtonIconProps = {
	icon?: ElementType
	serverSide?: boolean
	serverSideIconType?: "back-arrow"
	extraStyles?: string
}

export default function MinimalButtonIcon({
	icon: Icon,
	serverSide,
	serverSideIconType,
	extraStyles,
}: MinimalButtonIconProps) {
	return (
		<>
			{serverSide ? (
				<IconContext.Provider
					value={{ className: extraStyles, color: "#fff", size: "16px" }}
				>
					{serverSideIconType === "back-arrow" && <FaArrowLeft></FaArrowLeft>}
				</IconContext.Provider>
			) : (
				<IconContext.Provider
					value={{ className: extraStyles, color: "#fff", size: "16px" }}
				>
					{Icon && <Icon></Icon>}
				</IconContext.Provider>
			)}
		</>
	)
}
