import Link from 'next/link'

import { Navigation } from './Submenu'


export default function SubmenuList({
	navigations, name
}: {
	navigations: Navigation[], name: string
}) {
	return (
		<li>
			<details open>
				<summary>{name}</summary>
			<ul>
				{navigations.map((navigation, index) => (
					<li key={index}>
						<Link
							href={navigation.route}
							className={''}>
							{navigation.name}
						</Link>
					</li>
				))}
			</ul>
            </details>
		</li>
	)
}
