import styles from "./Input.module.css"

import { ReactNode } from "react"

type InputRootProps = {
	children: ReactNode
}

export default function InputRoot({ children }: InputRootProps) {
	return <div className={styles.container}>{children}</div>
}
