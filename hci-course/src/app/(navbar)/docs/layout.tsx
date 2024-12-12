// import * as contentful from 'contentful'

import Submenu from '../../components/Submenu/Submenu'

import { submenuNavigations } from '@/app/components/Submenu/constants'
import { getSubmenuNavigations } from '@/app/components/Submenu/actions'

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	//contentful client
	// var client = contentful.createClient({
	// 	space: process.env.CONTENTFUL_SPACE_ID as string,
	// 	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
	// })

	const navs = getSubmenuNavigations(submenuNavigations)

	return (
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-2">
				<Submenu submenuNavigations={submenuNavigations} />
			</div>

			<div className="col-span-8">{children}</div>
			{/* Problem u vezi client komponente I think */}
			<div className="col-span-2">
				<Submenu submenuNavigations={navs}
				/>
			</div>
		</div>
	)
}
