import { ElementType } from "react"
import styles from "./MinimalButton.module.css"
import { IconContext } from "react-icons"

type MinimalButtonIconProps = {
	icon: ElementType
}

export default function MinimalButtonIcon({ icon: Icon }: MinimalButtonIconProps) {
	return (
		<IconContext.Provider value={{ color: "#fff", size: "16px" }}>
			<Icon></Icon>
		</IconContext.Provider>
	)
}
