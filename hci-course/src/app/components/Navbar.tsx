'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navbar() {
    const [navbar, setNavbar] = useState(false)
    // const [navbarColor, setNavbarColor] = useState('bg-transparent')
    const pathname = usePathname()

    const [searchString, setSearchString] = useState('')

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
        <nav className={`w-full z-40 flex flex-col items-center pb-8`}>
            <div className="justify-between px-4 mx-auto lg:max-w-full md:items-start md:flex md:pt-4 md:pb-8 md:w-4/5">
                
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <Image src="/Logo-white.png" alt="Logo" width={113} height={80} />
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
                                <Link href="/favourites" className={`font-bold hover:underline  md:text-white ${pathname === '/compare' ? 'underline' : ''}`} onClick={closeMenu}>
                                    <span className='flex items-center gap-1'><Image src="/heart-2.png" width={20} height={20} alt='heart' className='h-5 w-5'/><p>Favourites</p></span>
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link href="/docs" className={`font-bold hover:underline  md:text-white ${pathname === '/docs' ? 'underline' : ''}`} onClick={closeMenu}>
                                <span className='flex items-center gap-1'><Image src="/google-docs.png" width={20} height={20} alt='docs' className='h-5 w-5'/><p>Docs</p></span>
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link href="/log-in" className={`font-bold hover:underline  md:text-white ${pathname === '/log-in' ? 'underline' : ''}`} onClick={closeMenu}>
                                <span className='flex items-center gap-1'><Image src="/user-2.png" width={20} height={20} alt='login' className='h-5 w-5'/><p>Log In</p></span>
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
             <form onSubmit={e => e.preventDefault()} action="/search" method='get' className='pr-2 py-2 mt-10 bg-background rounded-md w-3/5 relative'>
                        <input onChange={e => setSearchString(e.target.value)} type='text' placeholder='Search for product and rabbit will try to fetch it...' className='w-full h-12 pl-16 pt-1 pr-3 bg-background outline-none font-bold' name='search-string' value={searchString}/>
                        <Image src="/search.png" alt="Search" width={16} height={16} className="absolute left-7 top-1/2 transform -translate-y-1/2"/>
            </form>
        </nav>
    )
}