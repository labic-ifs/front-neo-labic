"use server"

import { revalidatePath } from "next/cache"

export const revalidatePathAfterSendAticle = async () => {
	revalidatePath("/admin/my-articles/")
}
