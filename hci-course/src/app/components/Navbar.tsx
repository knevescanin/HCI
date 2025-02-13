'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navbar() {
    const [navbar, setNavbar] = useState(false)
    // const [navbarColor, setNavbarColor] = useState('bg-transparent')
    const pathname = usePathname()

    // useEffect(() => {
    //     if (pathname !== '/') {
    //         setNavbarColor('bg-[#420081]')
    //     } else {
    //         setNavbarColor('bg-transparent')
    //     }
    // }, [pathname])

    const closeMenu = () => {
        setNavbar(false)
    }

    return (
        <nav className={`w-full z-40`}>
            <div className="justify-between px-4 mx-auto lg:max-w-full md:items-center md:flex md:px-20">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link href="/">
                            <Image src="/Logo-white.png" alt="Logo" width={230} height={163} />
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
                </div>
                <div>
                    <div
                        className={`absolute top-0 left-0 w-full h-1/3  flex flex-col items-center justify-center transition-transform transform ${navbar ? 'translate-y-0' : '-translate-y-full'} 
						md:relative md:translate-y-0 md:flex md:flex-row md:h-auto md:items-center md:justify-center bg-[#420081] ${pathname === '/' ? 'md:bg-transparent' : 'md:bg-[#420081]'} z-40`}>
						
					
                        <ul className="flex flex-col items-center justify-center md:flex-row">
                            <li className="text-xl md:px-6">
                                <Link href="/search" className={`font-bold hover:underline  md:text-white ${pathname === '/search' ? 'underline' : ''} `} onClick={closeMenu}>
									Search
                                </Link>
                            </li>
                            <li className="text-xl md:px-6">
                                <Link href="/compare" className={`font-bold hover:underline  md:text-white ${pathname === '/compare' ? 'underline' : ''}`} onClick={closeMenu}>
                                    Compare
                                </Link>
                            </li>
                            <li className="text-xl md:px-6">
                                <Link href="/docs" className={`font-bold hover:underline  md:text-white ${pathname === '/docs' ? 'underline' : ''}`} onClick={closeMenu}>
                                    Docs
                                </Link>
                            </li>
                            <li className="text-xl md:px-6">
                                <Link href="/log-in" className={`font-bold hover:underline  md:text-white ${pathname === '/log-in' ? 'underline' : ''}`} onClick={closeMenu}>
                                    Log In
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {navbar && (
                <>
                    <div className="fixed inset-0 backdrop-blur-sm z-30" onClick={closeMenu}></div>
                </>
            )}
        </nav>
    )
}