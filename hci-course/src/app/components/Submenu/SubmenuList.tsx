import { usePathname } from 'next/navigation'
import SubmenuListItems from './SubmenuListItems'
import { useEffect, useState } from 'react'
import Link from 'next/link'


export default function SubmenuList({
	navigations, name, route
}: {
	navigations: NavigationItem[], name: string, route: string
}) {
	const pathname = usePathname()
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (navigations.some(nav => nav.route === pathname) || pathname === route) {
			setOpen(true)
		} else {
			setOpen(false)
		}
	}
	, [pathname])

	return (
		<li>
			<details open={open}>
				<summary><Link href={route}>{name}</Link></summary>
			<SubmenuListItems navigations={navigations}/>
            </details>
		</li>
	)
}
