"use client"
import Link from 'next/link'
import Image from 'next/image'

import InstagramIcon from '../../../public/instagram-icon.png'
import FacebookIcon from '../../../public/facebook-icon.png'
import LinkedInIcon from '../../../public/linkedin-icon.png'
import { useState } from 'react'

export default function Footer() {
	const linkClass = "hover:scale-110 transition-all"
	const [infoDropdownOpen, setInfoDropdownOpen] = useState(false);
	const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);

	const toggleInfoDropdown = () => {
		setInfoDropdownOpen((prev) => !prev);
	};

	const toggleSupportDropdown = () => {
		setSupportDropdownOpen((prev) => !prev);
	};

	return (

		<footer className={`w-100 font-latoRegular flex flex-col relative items-center h-fit my-0 md:flex md:flex-row md:h-fit md:py-3 md:px-0 md:justify-evenly`} >

			<div className="mt-3 md:mt-0">
				<Link href="/">
					<Image src="/Logo-white-no-text.png" alt="Logo" width={110} height={100} className="mx-auto md:mx-0 w-2/6 md:w-5/6 h-fit" />
				</Link>
			</div>

			<div className="flex flex-col items-center w-fit py-4 md:py-0 md:flex md:flex-row md:items-start md:w-fit">
				<div className="flex flex-col md:mx-10 text-[#C799F6]">
					<div className='hidden md:block'>
						<p className='text-[background] font-normal text-lg pb-2'>Information</p>
						<Link
							className="hover:underline"
							href="/not-found">
							<p>FAQs</p>
						</Link>

						<Link
							className="hover:underline"
							href="/not-found">
							<p>About us</p>
						</Link>
						<Link
							className="hover:underline"
							href="/not-found">
							<p>Services</p>
						</Link>

					</div>

					<div className='md:hidden'>
						<button className='text-[background] font-normal text-xl pb-2 pointer-events-auto' onClick={toggleInfoDropdown}>Information</button>
						{infoDropdownOpen && (
							<div className='flex flex-col items-center'>
								<Link
									className="hover:underline"
									href="/not-found">
									<p>FAQs</p>
								</Link>

								<Link
									className="hover:underline"
									href="/not-found">
									<p>About us</p>
								</Link>
								<Link
									className="hover:underline"
									href="/not-found">
									<p className='pb-2'>Services</p>
								</Link>
							</div>
						)}
					</div>
				</div>

				<div className="flex flex-col mx-3 md:mx-10 text-[#C799F6]">
					<div className='hidden md:block'>
						<p className='text-[background] font-normal text-lg pb-2'>Support</p>
						<Link
							className="hover:underline"
							href="/not-found">
							<p>Contact us</p>
						</Link>

						<Link
							className="hover:underline"
							href="/not-found">
							<p>Resources</p>
						</Link>
						<Link
							className="hover:underline"
							href="/not-found">
							<p>Submit a ticket</p>
						</Link>
					</div>


					<div className='md:hidden flex flex-col items-center w-full'>
						<button className='text-[background] font-normal text-xl pb-2 pointer-events-auto' onClick={toggleSupportDropdown}>Support</button>
						{supportDropdownOpen && (
							<div className='flex flex-col items-center'>
								<Link
									className="hover:underline"
									href="/not-found">
									<p>Contact us</p>
								</Link>

								<Link
									className="hover:underline"
									href="/not-found">
									<p>Resources</p>
								</Link>
								<Link
									className="hover:underline"
									href="/not-found">
									<p className='mb-2'>Submit a ticket</p>
								</Link>
							</div>
						)}
					</div>
				</div>

				<div className="flex flex-col justify-center items-center md:items-start gap-4">
					<input
						type="email"
						placeholder="Get In Touch"
						className="w-72 h-12 rounded-md pl-3 bg-background mb-2 outline-none"
					/>
					<div className="flex w-72 justify-between items-center">
						<Link
							className={linkClass}
							href="https://www.linkedin.com">
							<Image
								src={LinkedInIcon}
								width={32}
								height={32}
								alt="LinkedIn"></Image>
						</Link>
						<Link
							className={linkClass}
							href="https://www.facebook.com">
							<Image
								src={FacebookIcon}
								width={32}
								height={32}
								alt="Facebook"
							></Image>
						</Link>
						<Link
							className={linkClass}
							href="https://www.instagram.com">
							<Image
								src={InstagramIcon}
								width={32}
								height={32}
								alt="Instagram"></Image>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}