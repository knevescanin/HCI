import * as contentful from 'contentful'

import Submenu from '../../components/Submenu'

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	//contentful client
	var client = contentful.createClient({
		space: process.env.CONTENTFUL_SPACE_ID as string,
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
	})

	const submenuNavigations = [
		{
			header: { name: 'Project Information', route: '/docs/project-information' },
			navigations: [
				{ name: 'Introduction', route: '/docs/project-information/introduction' },
				{ name: 'First Ideas', route: '/docs/project-information/first-ideas' },
				{ name: 'Getting Things Ready', route: '/docs/project-information/getting-things-ready' },
			],
		},
	]

	return (
		<div className="grid grid-cols-3 gap-4">
			<Submenu submenuNavigations={submenuNavigations} />

			<div>{children}</div>

			<div>{/* content of current page */}</div>
		</div>
	)
}
