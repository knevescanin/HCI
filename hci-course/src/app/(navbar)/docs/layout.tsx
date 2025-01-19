import Submenu from '../../components/Submenu/Submenu'

import { submenuNavigations } from '@/app/components/Submenu/constants'
// import { getSubmenuNavigations } from '@/app/components/Submenu/actions'

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// const navs = getSubmenuNavigations(submenuNavigations)

	return (
		<div className="grid grid-cols-12 min-h-screen">
			<div className="col-span-3 text-black relative overflow-y-auto" >
				<Submenu submenuNavigations={submenuNavigations} />
			</div>

			<div className="col-start-4 col-end-13">{children}</div>
			{/* Problem u vezi client komponente I think */}
			{/* <div className="col-span-2 text-black">
				<Submenu submenuNavigations={navs}
				/>
			</div> */}
		</div>
	)
}
