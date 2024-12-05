import * as contentful from 'contentful'

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
				{ name: 'Using the App', route: '/getting-started/using-the-app' },
			],
		},
		{
			header: { name: 'Project Information', route: '/project-information' },
			navigations: [
				{
					name: 'Project Overview',
					route: '/project-information/project-overview',
				},
				{
					name: 'Project Details',
					route: '/project-information/project-details',
				},
				{
					name: 'Project Timeline',
					route: '/project-information/project-timeline',
				},
			],
		},
		{
			header: { name: 'User Interface', route: '/user-interface' },
			navigations: [],
		},
		{
			header: { name: 'Rastav Čomskog', route: '/comski' },
			navigations: [
				{ name: 'Prvanka', route: '/project-information/project-overview' },
				{ name: 'Kraljica', route: '/project-information/project-details' },
			],
		},
	]
	//contentful client
	var client = contentful.createClient({
		space: 'ps2wg062y5uz',
		accessToken: 'bAAS0Ny2qlWqD9UQuOd_IwAyK5S1NFOqBS1qfWJ9MzQ',
	})

	// async function handleOnClick() {
	// 	client.getEntries().then(entries => {
	// 		entries.items.forEach(function (entry) {
	// 			if (entry.fields) {
	// 				console.log(entry.fields.content.content)
	// 			}
	// 		})
	// 	})
	// }

	async function handleOnClick(){client.getEntry('<entry_id>').then(function (entry) {
		// logs the entry metadata
		console.log(entry.sys);
	  
		// logs the field with ID title
		console.log(entry.fields.productName);
	  });
	}
	
	handleOnClick()

	return (
		<div className="grid grid-cols-3 gap-4">
			<Submenu submenuNavigations={submenuNavigations} />
			
			<div>{children}</div>

			<div>{/* content of current page */}</div>
		</div>
	)
}
