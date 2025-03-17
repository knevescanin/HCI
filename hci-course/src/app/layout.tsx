import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Suspense } from 'react'
import LoadingUI from './components/UI/LoadingUI'

// Import the new ClientSessionProvider component
import ClientSessionProvider from './components/ClientSessionProvider';

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
  title: 'Pricehare',
  description: 'Andy and Karlo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {


	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${latoRegular.variable} ${latoBlack.variable} antialiased bg-themePrimary flex flex-col min-h-screen overflow-x-hidden`}>
        <ClientSessionProvider>
				<Navbar />
				<main className="flex-grow flex flex-col bg-background">{children}</main>
				<Footer />
      </ClientSessionProvider>
			</body>
		</html>
	)
}
