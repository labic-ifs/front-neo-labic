import styles from "./Button.module.css"

import { ReactNode } from "react"

type NotificationRootProps = {
	children: ReactNode
	fullWidth?: boolean
	onClick?: () => void
}

export default function ButtonRoot({ children, fullWidth, onClick }: NotificationRootProps) {
	return (
		<button
			className={`${fullWidth ? styles.fullWidth : null} ${styles.btnColor} ${
				styles.container
			}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
