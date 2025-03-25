'use client'

import { useSession, signOut } from "next-auth/react";
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import SearchUI from './UI/SearchUI'

export default function Navbar() {
    const [navbar, setNavbar] = useState(false)
    const pathname = usePathname()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { data: session } = useSession();
    const closeMenu = () => {
        setNavbar(false)
    }

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleSignOut = () => {
        signOut();
        setDropdownOpen(false);
    };
    return (
        <nav className={`w-full sticky z-40 h-fit flex flex-col items-center  pb-14 md:pb-8`}>
            <div className="flex lg:max-w-full md:flex md:justify-between md:items-center md:w-full md:my-3 md:px-10">

                <div className="">
                    <Link href="/">
                        <Image src="/Logo-white-no-text.png" alt="Logo" width={110} height={100} className="mx-auto pl-2 pt-2 absolute top-0 left-0 md:static w-16 md:w-5/6 h-fit md:pl-0 md:pt-2 md:mx-0 md:h-fit" />
                    </Link>
                    <div className="md:hidden">
                        <button
                            className="p-3 text-white z-50 top-0 right-0 absolute"
                            onClick={() => setNavbar(!navbar)}>
                            {navbar ? (
                                <svg
                                    className="w-7 h-7"
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
                                    className="w-7 h-7"
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


                <div>
                    <div
                        className={`absolute ${pathname === '/' ? 'top-0 left-0 right-0 h-full flex flex-col items-center justify-center transition-transform transform' : 'top-0 left-0 right-0 h-fit flex flex-col items-center justify-center transition-transform transform'}  
                        ${navbar ? 'translate-y-0 bg-[#1A20AB]' : '-translate-y-full bg-transparent'} 
						md:relative md:translate-y-0 md:flex md:flex-row md:h-auto md:items-center md:justify-center z-40`}>


                        <ul className="flex flex-col items-center justify-center md:flex-row md:gap-12">
                            {/* <li className="text-xl md:px-6">
                                <Link href="/search" className={`font-bold hover:underline  md:text-white ${pathname === '/search' ? 'underline' : ''} `} onClick={closeMenu}>
                                    Search
                                </Link>
                            </li> */}
                            <li className={`text-lg ${pathname ==='/' ? 'py-2' : 'pt-6 pb-2'} md:py-0`}>
                                <Link href="/favourites" className={`font-bold hover:underline  text-white ${pathname === '/favourites' ? 'underline' : ''}`} onClick={closeMenu}>
                                    <span className='flex items-center gap-1'><Image src="/heart-2.png" width={20} height={20} alt='heart' className='w-1/6 h-1/6 md:h-fit md:w-fit' /><p className="">Favourites</p></span>
                                </Link>
                            </li>
                            <li className={`text-lg ${pathname ==='/' ? 'pb-2' : 'pb-2'} md:pb-0`}>
                                <Link href="/docs" className={`font-bold hover:underline  text-white ${pathname === '/docs' ? 'underline' : ''}`} onClick={closeMenu}>
                                    <span className='flex items-center gap-1'><Image src="/google-docs.png" width={20} height={20} alt='docs' className='w-1/5 h-1/5 md:h-fit md:w-fit' /><p>Docs</p></span>
                                </Link>
                            </li>
                            {session?.user ? (
                                <>
                                    <li className="text-lg ${pathname ==='/' ? 'pb-2' : 'pb-6'} md:pb-0">
                                        <button
                                            onClick={toggleDropdown}
                                            className="font-bold hover:underline text-white "
                                        >
                                            Hello, {session?.user.name || session?.user.firstName}
                                        </button>
                                    </li>
                                    {dropdownOpen && (
                                        <div className={`absolute ${navbar ? 'top-full right-50' : 'top-full right-0'} bg-white rounded-md shadow-lg w-auto`}>
                                            <ul className="text-gray-0 flex flex-col items-center">
                                                <li className="px-4 py-2 font-bold text-lg">
                                                    <Link href="/profile-settings" className="hover:text-[#1A20AB]">Profile Settings</Link>
                                                </li>
                                                <li
                                                    className="px-4 py-2 font-bold text-lg text-red-600 hover:text-[#1A20AB] cursor-pointer"
                                                    onClick={handleSignOut}
                                                >
                                                    Sign Out
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <li className={`text-lg ${pathname ==='/' ? 'pb-2' : 'pb-6'} md:pb-0`}>
                                    <Link href="/signin" className={`font-bold hover:underline  text-white ${pathname === '/log-in' ? 'underline' : ''}`} onClick={closeMenu}>
                                        <span className='flex items-center gap-1'><Image src="/signin.png" width={20} height={20} alt='docs' className='w-1/5 h-1/5 md:h-fit md:w-fit' /><p>LogIn</p></span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            {navbar && (
                <>
                    <div className="fixed inset-0 backdrop-blur-sm z-30" onClick={() => { closeMenu(); toggleDropdown(); }}></div>
                </>
            )}
            {!(pathname.includes("favourites") || pathname.includes("docs") || pathname.includes("signin") || pathname.includes("signup")) && <SearchUI />}
        </nav>
    )
}