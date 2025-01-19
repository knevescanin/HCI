"use client"
import SubmenuHeader from './SubmenuHeader'
import SubmenuList from './SubmenuList'

export default function Submenu({ submenuNavigations }: SubmenuProps) {
	return (
		<ul className="w-full min-h-max px-4 font-latoRegular sticky top-0">
			{submenuNavigations.map(
				(item, index) =>
					(item.navigations.length > 0 && (
						<SubmenuList
							key={index}
							name={item.header.name}
							navigations={item.navigations}
							route={item.header.route}
							iconName={item.icon.name}
							iconColor={item.icon.color}
							/>
					)) || <SubmenuHeader key={index} name={item.header.name} route={item.header.route}/>
			)}
		</ul>
	)
}
