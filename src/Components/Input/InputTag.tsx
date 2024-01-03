import styles from "./Input.module.css"

type InputTagProps = {
	name: string
	type?: string
	value?: string
	placeholder: string
	getValue?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputTag({ name, type, value, placeholder, getValue }: InputTagProps) {
	return (
		<input
			className={styles.inputTag}
			name={name}
			type={type ? type : "text"}
			value={value && value}
			placeholder={placeholder}
			onChange={getValue && getValue}
		/>
	)
}
