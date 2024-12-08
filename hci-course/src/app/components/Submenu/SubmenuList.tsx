import Link from 'next/link'
import SubmenuListItems from './SubmenuListItems'


export default function SubmenuList({
	navigations, name
}: {
	navigations: NavigationItem[], name: string
}) {
	return (
		<li>
			<details open>
				<summary>{name}</summary>
			<SubmenuListItems navigations={navigations}/>
            </details>
		</li>
	)
}
