import styles from "./Button.module.css"

import { ReactNode } from "react"

type NotificationRootProps = {
	children: ReactNode
	fullWidth?: boolean
	extraClassName?: string
	id?: string
	onClick?: () => void
}

export default function ButtonRoot({
	children,
	fullWidth,
	onClick,
	id,
	extraClassName,
}: NotificationRootProps) {
	return (
		<button
			id={id && id}
			className={`${fullWidth ? styles.fullWidth : null} ${styles.btnColor} ${
				styles.container
			} ${extraClassName && extraClassName}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
