import Link from 'next/link'


export default function SubmenuList({
	navigations, name
}: {
	navigations: NavigationItem[], name: string
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
