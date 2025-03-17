'use client'

import { useSession, signOut } from "next-auth/react";
import Link from 'next/link'
import { useState} from 'react'
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
        <nav className={`w-full z-40 flex flex-col items-center pb-8`}>
            <div className="justify-between px-4 mx-auto lg:max-w-full md:items-start md:flex md:pt-4 md:pb-8 md:w-4/5">
                
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <Image src="/Logo-white.png" alt="Logo" width={120} height={80} />
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-white z-50 relative"
                                onClick={() => setNavbar(!navbar)}>
                                {navbar ? (
                                    <svg
                                        className="w-6 h-6 "
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
                
            
                <div>
                    <div
                        className={`absolute top-0 left-0 w-full h-1/3  flex flex-col items-center justify-center transition-transform transform ${navbar ? 'translate-y-0' : '-translate-y-full'} 
						md:relative md:translate-y-0 md:flex md:flex-row md:h-auto md:items-center md:justify-center z-40`}>
						
					
                        <ul className="flex flex-col items-center justify-center md:flex-row gap-8">
                            {/* <li className="text-xl md:px-6">
                                <Link href="/search" className={`font-bold hover:underline  md:text-white ${pathname === '/search' ? 'underline' : ''} `} onClick={closeMenu}>
                                    Search
                                </Link>
                            </li> */}
                            <li className="text-lg">
                                <Link href="/favourites" className={`font-bold hover:underline  md:text-white ${pathname === '/favourites' ? 'underline' : ''}`} onClick={closeMenu}>
                                    <span className='flex items-center gap-1'><Image src="/heart-2.png" width={20} height={20} alt='heart' className='h-5 w-5'/><p>Favourites</p></span>
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link href="/docs" className={`font-bold hover:underline  md:text-white ${pathname === '/docs' ? 'underline' : ''}`} onClick={closeMenu}>
                                <span className='flex items-center gap-1'><Image src="/google-docs.png" width={20} height={20} alt='docs' className='h-5 w-5'/><p>Docs</p></span>
                                </Link>
                            </li>
                            {session?.user ? (
                                <>
                                    <li className="text-xl md:px-6">
                                        <button
                                            onClick={toggleDropdown}
                                            className="font-bold hover:underline  md:text-white "
                                        >
                                            Hello, {session?.user.name || session?.user.firstName}
                                        </button>
                                    </li>
                                    {dropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg w-auto">
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
                                <li className="text-lg md:px-6">
                                    <Link href="/signin" className={`font-bold hover:underline  md:text-white ${pathname === '/log-in' ? 'underline' : ''}`} onClick={closeMenu}>
                                    <span className='flex items-center gap-1'><Image src="/signin.png" width={20} height={20} alt='docs' className='h-5 w-5'/><p>LogIn</p></span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            {navbar && (
                <>
                    <div className="fixed inset-0 backdrop-blur-sm z-30" onClick={closeMenu}></div>
                </>
            )}
             {!(pathname.includes("favourites") || pathname.includes("docs") || pathname.includes("signin")) && <SearchUI />}
        </nav>
    )
}