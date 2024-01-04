import styles from "./Links.module.css"
import Link from "next/link"

import { MinimalButton } from "@/Components/Buttons/MinimalButton"
import { usePathname } from "next/navigation"

type LinksProps = {
	links: Array<{ name: string; path: string }>
}

export default function Links({ links }: LinksProps) {
	const pathname = usePathname()

	return (
		<>
			{links.map((item) => {
				return (
					<Link className={styles.linkAnchor} key={item.name} href={item.path}>
						<MinimalButton.Root
							extraClassName={`${pathname === item.path && styles.active}`}
						>
							<MinimalButton.Text text={item.name} />
						</MinimalButton.Root>
					</Link>
				)
			})}
		</>
	)
}
