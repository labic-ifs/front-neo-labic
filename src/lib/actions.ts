"use server"

import { revalidatePath } from "next/cache"

export const revalidatePaths = async (path: string) => {
	revalidatePath(path, "page")
}
