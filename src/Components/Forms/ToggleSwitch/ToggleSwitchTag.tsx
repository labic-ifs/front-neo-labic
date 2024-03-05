import { number } from "yup"
import styles from "./ToggleSwitch.module.css"

import { ReactNode } from "react"

type ToggleSwitchTagProps = {
	name: string
	id?: string
	isChecked?: boolean
	getValue?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ToggleSwitchTag({ name, isChecked, id, getValue }: ToggleSwitchTagProps) {
	return (
		<>
			<input
				className={styles.tag}
				name={name}
				type="checkbox"
				id={id && id}
				onChange={getValue && getValue}
				defaultChecked={isChecked && true}
			/>
			<span className={`${styles.slider} ${styles.round}`}></span>
		</>
	)
}
