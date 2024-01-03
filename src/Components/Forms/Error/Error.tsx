import styles from "./Error.module.css"

type ErrorProps = {
	text: string
	fieldError?: boolean
}

export default function Error({ text, fieldError }: ErrorProps) {
	return <p className={`${fieldError && styles.fieldError} ${styles.container}`}>{text}</p>
}
