"use client"
import SubmenuHeader from './SubmenuHeader'
import SubmenuList from './SubmenuList'

export default function Submenu({ submenuNavigations }: SubmenuProps) {
	return (
		<ul className="w-56 px-4 font-latoRegular">
			{submenuNavigations.map(
				(item, index) =>
					(item.navigations.length > 0 && (
						<SubmenuList
							key={index}
							name={item.header.name}
							navigations={item.navigations}
							route={item.header.route}
							/>
					)) || <SubmenuHeader key={index} name={item.header.name} route={item.header.route}/>
			)}
		</ul>
	)
}
