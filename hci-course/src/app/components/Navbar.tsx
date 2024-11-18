'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false)

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

	return (
		<nav className="text-white p-4 sm:p-6 md:flex md:justify-between md:items-center bg-[#420081]">
			<div className="container mx-auto flex flex-1 justify-between items-center">
				<Link
					href="/"
					className="text-2xl font-bold">
					<span className="font-latoBlack drop-shadow-lg">
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
				<div className={`${getMenuClasses()} bg-[#420081]`}>
					<Link
						href="/search"
						className="mx-2 hover:font-bold">
						Search
					</Link>
					<Link
						href="/compare"
						className="mx-2 hover:font-bold">
						Compare
					</Link>
					<Link
						href="/about-us"
						className="mx-2 hover:font-bold">
						About Us
					</Link>
					<Link
						href="/log-in"
						className="mx-2 hover:font-bold">
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
