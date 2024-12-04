import SubmenuHeader from './SubmenuHeader'
import SubmenuList from './SubmenuList'

export interface Navigation {
    name: string,
    route: string
}



interface NavigationItem {
	header: Header
	navigations: Navigation[]
}

interface SubmenuProps {
	submenuNavigations: NavigationItem[]
}

export default function Submenu({ submenuNavigations }: SubmenuProps) {
	return (
		<ul className="menu w-56 bg-base-200">
			{submenuNavigations.map(
				(item, index) =>
					(item.navigations.length > 0 && (
						<SubmenuList
							key={index}
							name={item.header.name}
							navigations={item.navigations}/>
					)) || <SubmenuHeader key={index} name={item.header.name} route={item.header.route}/>
			)}
		</ul>
	)
}
