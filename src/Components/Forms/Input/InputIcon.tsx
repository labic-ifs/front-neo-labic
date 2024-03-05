"use client"

import { ElementType } from "react"
import { IconContext } from "react-icons"

import { FaSearch } from "react-icons/fa"

type InputIconProps = {
	icon?: ElementType
	serverSide?: boolean
	serverSideIconType?: "search"
}

export default function InputIcon({ icon: Icon, serverSide, serverSideIconType }: InputIconProps) {
	return (
		<>
			{serverSide ? (
				<IconContext.Provider value={{ color: "#fff", size: "1rem" }}>
					{serverSideIconType === "search" && <FaSearch></FaSearch>}
				</IconContext.Provider>
			) : (
				<IconContext.Provider value={{ color: "#fff", size: "1rem" }}>
					{Icon && <Icon></Icon>}
				</IconContext.Provider>
			)}
		</>
	)
}
