import { ElementType } from "react"
import { IconContext } from "react-icons"

type InputIconProps = {
	icon: ElementType
}

export default function InputIcon({ icon: Icon }: InputIconProps) {
	return (
		<IconContext.Provider value={{ color: "#fff", size: "1rem" }}>
			<Icon></Icon>
		</IconContext.Provider>
	)
}
