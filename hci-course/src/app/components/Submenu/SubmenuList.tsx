import { usePathname } from 'next/navigation'
import SubmenuListItems from './SubmenuListItems'
import { useState } from 'react'
import Image from 'next/image'

import CollapseArrowImage from '@/../public/collapse-arrow.png'

export default function SubmenuList({
	navigations,
	name,
	route,
}: {
	navigations: NavigationItem[]
	name: string
	route: string
}) {
	const pathname = usePathname()
	const [open, setOpen] = useState(false)

	return (
		<li
			className="cursor-pointer"
			>
				<details open={navigations.some(nav => nav.route === pathname) || pathname === route}>
					<summary onClick={() => setOpen(!open)} className="flex hover:bg-[#f0f0f0] hover:rounded-lg py-2 px-4 justify-between">
						{name}
						<Image
							className={
								open
									? `rotate-180 transition-all ease-in-out`
									: `rotate-0 transition-all ease-in-out`
							}
							src={CollapseArrowImage}
							alt="collapse-arrow"
							width={20}
							height={20}
						/>
					</summary>

					<SubmenuListItems navigations={navigations} />
				</details>
		
		</li>
	)
}
