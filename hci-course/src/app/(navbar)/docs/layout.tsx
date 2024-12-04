import React, { useEffect } from 'react'

import * as contentful from 'contentful'

import Link from 'next/link'
import Submenu from '../../components/Submenu'




export default function DocsLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (
		<div className="grid grid-cols-3 gap-4">
			<Submenu />

			<div>{children}</div>

			<div>{/* content of current page */}</div>
		</div>
	)
}
