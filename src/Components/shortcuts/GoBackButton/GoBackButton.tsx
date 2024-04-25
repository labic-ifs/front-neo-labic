"use client"

import { MinimalButton } from "@/Components/Buttons/MinimalButton"
import { useRouter } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa"

export default function GoBackButton() {
	const router = useRouter()
	return (
		<MinimalButton.Root
			onClick={() => {
				router.back()
			}}
		>
			<MinimalButton.Icon icon={FaArrowLeft} />
			<MinimalButton.Text text="voltar" />
		</MinimalButton.Root>
	)
}
