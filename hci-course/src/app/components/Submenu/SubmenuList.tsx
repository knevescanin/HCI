import { usePathname } from 'next/navigation'
import SubmenuListItems from './SubmenuListItems'
import { useEffect, useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function SubmenuList({
	navigations,
	name,
	route,
	iconName,
	iconColor,
}: {
	navigations: NavigationItem[]
	name: string
	route: string
	iconName: string
	iconColor: string
}) {
	const pathname = usePathname()
	const detailsRef = useRef<HTMLDetailsElement>(null)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (detailsRef.current?.open) {
			setOpen(true)
		}
		else {
			setOpen(false)
		}
	
	}, [])

	return (
		<li className="cursor-pointer">
			<details
				ref={detailsRef}
				open={
					navigations.some((nav) => nav.route === pathname) ||
					pathname === route
				}
				>
				<summary
					onClick={() => {setOpen(!open), console.log(open)}}
					className="grid grid-cols-[1fr,3fr,auto] hover:bg-[#f0f0f0] hover:rounded-lg py-2 px-4">
					<FontAwesomeIcon
						className="col-start-1 col-end-2 self-center justify-self-start pr-3"
						icon={Icons[iconName as keyof typeof Icons] as Icons.IconDefinition}
						color={iconColor}
						size="lg"
					/>
					<p className="col-start-2 col-end-3 self-center">{name}</p>
					<FontAwesomeIcon
						className={
							'col-start-3 col-end-4 self-center ' +
							(open
								? `rotate-180 transition-all ease-in-out`
								: `rotate-0 transition-all ease-in-out`)
						}
						icon={Icons.faChevronDown}
						color="#333333"
					/>
				</summary>

				<SubmenuListItems navigations={navigations} />
			</details>
		</li>
	)
}
