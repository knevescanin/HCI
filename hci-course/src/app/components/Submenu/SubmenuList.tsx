import { usePathname } from 'next/navigation'
import SubmenuListItems from './SubmenuListItems'
import { useEffect, useState } from 'react'


export default function SubmenuList({
	navigations, name
}: {
	navigations: NavigationItem[], name: string
}) {
	const pathname = usePathname()
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (navigations.some(nav => nav.route === pathname)) {
			setOpen(true)
		} else {
			setOpen(false)
		}
	}
	, [])

	return (
		<li>
			<details open={open}>
				<summary>{name}</summary>
			<SubmenuListItems navigations={navigations}/>
            </details>
		</li>
	)
}
