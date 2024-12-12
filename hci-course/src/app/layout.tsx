import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import Footer from './components/Footer'
import Navbar from './components/Navbar'


const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

const latoRegular = localFont({
	src: './fonts/Lato-Regular.ttf',
	variable: '--font-lato-regular',
})

const latoBlack = localFont({
	src: './fonts/Lato-Black.ttf',
	variable: '--font-lato-black',
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${latoRegular.variable} ${latoBlack.variable} antialiased flex flex-col min-h-screen overflow-x-hidden bg-[#420081]`}>
				<Navbar />
				<main className="flex-grow flex flex-col">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
