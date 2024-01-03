"use client"

import { Button } from "@/Components/Button"
import { Input } from "@/Components/Input"
import React, { useState } from "react"
import { PiUserCirclePlusLight } from "react-icons/pi"
import { object, string } from "yup"

type formTypes = {
	email: string
	password: string
}

let formSchema = object({
	email: string().email("Must be a valid email").required(),
	password: string().required(),
})

export default function SignIn() {
	const [formData, setFormData] = useState<formTypes>({ email: "", password: "" })

	const getValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.name)
		setFormData((prevData) => ({ ...prevData, [event.target.name]: event.target.value }))

		console.log(formData)
	}

	const handleSubmit = async () => {
		const validate = await formSchema.validate(formData)

		console.log(validate)
		console.log(formData?.email)
		console.log(formData?.password)
	}

	return (
		<div>
			<Input.Root>
				<Input.Icon icon={PiUserCirclePlusLight} />
				<Input.Tag
					name="email"
					type="email"
					placeholder="labic@gmail.com"
					getValue={getValue}
				/>
			</Input.Root>
			<Input.Root>
				<Input.Icon icon={PiUserCirclePlusLight} />
				<Input.Tag
					name="password"
					type="password"
					placeholder="senha_forte123*"
					getValue={getValue}
				/>
			</Input.Root>
			<Button.Root onClick={handleSubmit}>
				<Button.Icon icon={PiUserCirclePlusLight} />
				<Button.Text text="Submit" />
			</Button.Root>
		</div>
	)
}
