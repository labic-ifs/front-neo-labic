"use server"

import { revalidatePath } from "next/cache"

export const revalidatePathAfterSendAticle = async (path: string) => {
	revalidatePath(path)
	revalidatePath("/admin/my-articles/")
}
