import styles from "./ToggleSwitch.module.css"

import { ReactNode } from "react"

type ToggleSwitchRootProps = {
	children: ReactNode
	htmlFor?: string
}

export default function ToggleSwitchRoot({ children, htmlFor }: ToggleSwitchRootProps) {
	return (
		<label htmlFor={htmlFor && htmlFor} className={styles.switch}>
			{children}
		</label>
	)
}
