import { ReactNode } from "react"
import styles from "./MinimalButton.module.css"

type MinimalButtonRootProps = {
	children: ReactNode
	extraClassName?: string
	onClick?: () => void
}

export default function MinimalButtonRoot({
	children,
	extraClassName,
	onClick,
}: MinimalButtonRootProps) {
	return (
		<button className={`${extraClassName} ${styles.container}`} onClick={onClick && onClick}>
			{children}
		</button>
	)
}
