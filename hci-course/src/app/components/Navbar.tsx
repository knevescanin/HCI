'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const [navbarColor, setNavbarColor] = useState('bg-transparent')
	const pathname = usePathname()

	function getMenuClasses() {
		let menuClasses = []

		if (isOpen) {
			menuClasses = [
				'flex',
				'absolute',
				'top-[60px]',
				'w-full',
				'p-7',
				'left-0',
				'gap-10',
				'flex-col',
			]
		} else {
			menuClasses = ['hidden', 'md:flex']
		}
		return menuClasses.join(' ')
	}

	useEffect(() => {
		if (pathname !== '/') {
			setNavbarColor('bg-[#420081]')
		}
		else {
			setNavbarColor('bg-transparent')
		}
	}, [pathname])


	return (
		<nav className={"text-white font-latoRegular p-4 sm:pt-6 w-screen " + navbarColor}>
			<div className="flex flex-1 justify-between items-center w-full md:px-20">
				<Link
					href="/"
					className="text-2xl font-bold">
					<span className="ffont-latoBlack drop-shadow-lg">
						<span className="text-3xl drop text-[#FE7163]">pric</span>
						<span className="text-2xl text-[#FE7163]">€</span>
						<span className="text-3xl text-[#FFFFFF]">
							sage
							<span className="text-3xl text-[#FE7163] mv faqs ticket about-us services contact-us support resources footer/]">
								.
							</span>
						</span>
					</span>
				</Link>
				<div className={`${getMenuClasses()} gap-[60px]`}>
				<Link href="/" className={`font-bold hover:underline ${pathname === '/' ? 'underline' : ''}`}>
            Home
          </Link>
          <Link href="/search" className={`font-bold hover:underline ${pathname === '/search' ? 'underline' : ''}`}>
            Search
          </Link>
          <Link href="/compare" className={`font-bold hover:underline ${pathname === '/compare' ? 'underline' : ''}`}>
            Compare
          </Link>
          <Link href="/docs" className={`font-bold hover:underline ${pathname === '/docs' ? 'underline' : ''}`}>
            Docs
          </Link>
          <Link href="/log-in" className={`font-bold hover:underline ${pathname === '/log-in' ? 'underline' : ''}`}>
            Log In
          </Link>
				</div>

				<div className="md:hidden flex items-center">
					<button
						onClick={() => {
							setIsOpen(!isOpen)
						}}>
						{isOpen ? (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						)}
					</button>
				</div>
			</div>
		</nav>
	)
}
