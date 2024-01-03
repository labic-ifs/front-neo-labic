import styles from "./Button.module.css"

type ButtonTextPros = {
	text: string
}

export default function ButtonText({ text }: ButtonTextPros) {
	return <p className={styles.text}>{text}</p>
}
