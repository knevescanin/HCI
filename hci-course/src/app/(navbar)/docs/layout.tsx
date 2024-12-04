import React, { useEffect } from 'react'

import * as contentful from 'contentful'

import Link from 'next/link'
import Submenu from '../../components/Submenu'




export default function DocsLayout({
	children,
}: {
	children: React.ReactNode
}) {

	// test navigations
	const submenuNavigations = [
		{
			header: { name: 'Getting Started', route: '/getting-started' },
			navigations: [
				{ name: 'Introduction', route: '/getting-started/introduction' },
				{ name: 'Registration', route: '/getting-started/registration' },
				{ name: 'Using the App', route: '/getting-started/using-the-app' }
			],
		},
		{
			header: { name: 'Project Information', route: '/project-information' },
			navigations: [
				{ name: 'Project Overview', route: '/project-information/project-overview' },
				{ name: 'Project Details', route: '/project-information/project-details' },
				{ name: 'Project Timeline', route: '/project-information/project-timeline' }
			],
		},
		{
			header: { name: 'User Interface', route: '/user-interface' },
			navigations: []
		}
	]

	return (
		<div className="grid grid-cols-3 gap-4">
			<Submenu submenuNavigations={submenuNavigations} />

			<div>{children}</div>

			<div>{/* content of current page */}</div>
		</div>
	)
}
