import { ClassicComponentClass } from "react"
import styles from "./MinimalButton.module.css"

type MinimalButtonTextProps = {
	text: string
}

export default function MinimalButtonText({ text }: MinimalButtonTextProps) {
	return <p className={styles.text}>{text} </p>
}
