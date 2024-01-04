import { ElementType } from "react"
import { IconContext } from "react-icons"

type ButtonIconProps = {
	icon: ElementType
}

export default function ButtonIcon({ icon: Icon }: ButtonIconProps) {
	return (
		<IconContext.Provider value={{ color: "#fff", size: "16px" }}>
			<Icon></Icon>
		</IconContext.Provider>
	)
}
