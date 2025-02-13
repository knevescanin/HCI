"use client"
import Link from 'next/link'
import Image from 'next/image'

import InstagramIcon from '../../../public/instagram-icon.png'
import FacebookIcon from '../../../public/facebook-icon.png'
import YouTubeIcon from '../../../public/youtube-icon.png'
import LinkedInIcon from '../../../public/linkedin-icon.png'



export default function Footer() {
const linkClass = "hover:shadow-md hover:shadow-white transition-all"

	return (
        
		<footer className={`w-100 font-latoRegular flex flex-col relative items-center h-fit mt-auto md:flex md:flex-row md:h-52 md:px-20 md:justify-between md:items-center `} >
            
			<div className="max-md:pb-2">
				<Link href="/">
					<Image src="/Logo-white-no-text.png" alt="Logo" width={120} height={72} />
				</Link>
			</div>

			<div className="flex justify-center w-fit py-4 md:py-0 md:justify-around md:items-start md:w-fit">
				<div className="flex flex-col mx-3 md:mx-10 text-[#C799F6]">
					<p className='text-[background] font-normal text-lg pb-2'>Information</p>
					<Link
						className="hover:underline"
						href="/faqs">
						<p>FAQs</p>
					</Link>
					
					<Link
						className="hover:underline"
						href="/about-us">
						<p>About us</p>
					</Link>
					<Link
						className="hover:underline"
						href="/services">
						<p>Services</p>
					</Link>
				</div>
				
				<div className="flex flex-col mx-3 md:mx-10 text-[#C799F6]">
					<p className='text-[background] font-normal text-lg pb-2'>Support</p>
					<Link
						className="hover:underline"
						href="/contact-us">
						<p>Contact us</p>
					</Link>
					
					<Link
						className="hover:underline"
						href="/resources">
						<p>Resources</p>
					</Link>
					<Link
						className="hover:underline"
						href="/ticket">
						<p>Submit a ticket</p>
					</Link>
				</div>
			</div>

			<div className="flex flex-col justify-center items-center md:items-start">
				<input
					type="email"
					placeholder="Get In Touch"
					className="text-[#C799F6] w-72 h-12 rounded-[20px] pl-3 bg-[#420081] mb-2 hover:scale-110 transition-all"
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
						href="https://www.youtube.com">
						<Image
							src={YouTubeIcon}
							width={32}
							height={32}
							alt="YouTube"></Image>
					</Link>
					<Link
						className={linkClass}
						href="https://www.facebook.com">
						<Image
							src={FacebookIcon}
							width={28}
							height={28}
							alt="Facebook"
							className="rounded-md"></Image>
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
		</footer>
	)
}