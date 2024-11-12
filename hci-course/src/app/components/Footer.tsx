import Link from "next/link";

import Image from "next/image";

import InstagramIcon from "../../../public/instagram-icon.png";
import FacebookIcon from "../../../public/facebook-icon.png";
import YouTubeIcon from "../../../public/youtube-icon.png";
import LinkedInIcon from "../../../public/linkedin-icon.png";

export default function Footer() {
    return (
			<footer className="w-screen bg-[#4E00AF] font-latoRegular flex flex-col items-center h-fit py-2 md:flex md:flex-row md:h-52 mt-auto md:pb-9 md:px-20 md:justify-between md:items-end">
                <div className="max-md:pb-2">
                    <Link href="/"><span className="font-latoBlack drop-shadow-lg"><span className="text-3xl drop text-[#100672]">pric</span><span className="text-2xl text-[#100672]">€</span><span className="text-3xl text-[#C799F6]">sage<span className="text-3xl text-[#100672]">.</span></span></span></Link>
                </div>

                <div className="flex justify-center py-4 md:py-0 md:justify-around md:items-start md:w-fit">
                    <div className="flex flex-col mx-10 text-[#C799F6]">
                        <Link className="hover:underline" href="/faqs">FAQS</Link>
                        <Link className="hover:underline" href="/ticket">SUBMIT A TICKET</Link>
                    </div>
                    <div className="flex flex-col mx-10 text-[#C799F6]">
                        <Link className="hover:underline" href="/about-us">ABOUT US</Link>
                        <Link className="hover:underline" href="/services">SERVICES</Link>
                    </div>
                    <div className="flex flex-col mx-10 text-[#C799F6]">
                        <Link className="hover:underline" href="/contact-us">CONTACT US</Link>
                        <Link className="hover:underline" href="/support">SUPPORT</Link>
                        <Link className="hover:underline" href="/resources">RESOURCES</Link>
                    </div>
                </div>
                
                <div className="flex flex-col justify-center items-center md:items-start">
                    <input type="email" placeholder="Get In Touch" className="text-[#C799F6] w-72 h-12 rounded-[20px] pl-3 bg-[#420081] mb-2 hover:scale-110 transition-all"/>
                    <div className="flex w-72 justify-between items-center">
                        <Link className="hover:scale-125 transition-all" href="https://www.linkedin.com"><Image src={LinkedInIcon} width={32} height={32} alt="LinkedIn"></Image></Link>
                        <Link className="hover:scale-125 transition-all" href="https://www.youtube.com"><Image src={YouTubeIcon} width={32} height={32} alt="YouTube"></Image></Link>
                        <Link className="hover:scale-125 transition-all" href="https://www.facebook.com"><Image src={FacebookIcon} width={28} height={28} alt="Facebook" className="rounded-md"></Image></Link>
                        <Link className="hover:scale-125 transition-all" href="https://www.instagram.com"><Image src={InstagramIcon} width={32} height={32} alt="Instagram"></Image></Link>
                    </div>
                </div>

			</footer>
		)
}