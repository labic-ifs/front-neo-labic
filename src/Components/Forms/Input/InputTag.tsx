import styles from "./Input.module.css"

type InputTagProps = {
	name: string
	type?: string
	value?: string
	id?: string
	placeholder: string
	getValue?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputTag({ name, type, value, id, placeholder, getValue }: InputTagProps) {
	return (
		<input
			className={styles.inputTag}
			name={name}
			type={type ? type : "text"}
			value={value && value}
			id={id && id}
			placeholder={placeholder}
			onChange={getValue && getValue}
		/>
	)
}
