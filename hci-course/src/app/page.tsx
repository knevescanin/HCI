import Image from 'next/image'
import FirstSectionBG from '../../public/home-page-assets/First Section BG.png'
import SecondSectionBG from '../../public/home-page-assets/Second Section BG.png'
import ThirdSectionBG from '../../public/home-page-assets/Third Section BG.png'
import HeroIllustration from '../../public/home-page-assets/Hero Illustration.png'
import HeroImage from '../../public/home-page-assets/hero-image.jpg'
import ButtonUI from './components/UI/ButtonUI'
import Link from 'next/link'
import {client} from './utils/contentfulClient'
import HomeSection from './components/HomeSection'


export default async function Home() {

	const entries = await client.getEntries({
			content_type: 'homeSections',
			select: ['fields'],
			order: ['sys.createdAt']
		})

		
		
		const sections: Section[] = entries.items.map(entry => {
			
			const imageUrlPath = (entry.fields.sectionImage as any)?.fields.file.url as string
			return new Object({sectionText: entry.fields.sectionText, header: entry.fields.header, imageUrl: "https:" + imageUrlPath}) as Section
		})
		 
		
	return (
		<>
			<Image priority src={HeroImage} alt="Hero Image" className="absolute w-screen h-screen -z-10 inset-0" />
			<div style={{ height: "calc(100vh - 76.5px)" }} className="w-screen relative">
				{/* Treba bit Image jer bg-image stvara probleme zbog velicine??? */}
				{/* Jedna ideja je provjerit o kojem se pathu radi pa kondicionalno ispisati komponentu, ali problem je jer je ovo serverska strana pa neda hookove */}

				{/* Mozda dinamicka velicina citanjem visine navbara */}
				<div
					className="flex justify-start w-screen h-full relative">
					<h1 className="font-latoBlack text-9xl w-52 md:w-[948px] text-white ml-20">
						SPEND LESS, BUY MORE
					</h1>
					<Image
						src={HeroIllustration}
						alt="Hero Illustration"
						className="absolute w-auto right-0 bottom-0 h-3/5 mr-20"
					/>
				</div>
			</div>
			<div className=' bg-[#420081]' style={{zIndex: 10}}>
				<section
					className="w-screen md:h-screen flex md:justify-between relative"
					style={{
						backgroundImage: `url(${FirstSectionBG})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}>
					<Image
						priority
						quality={100}
						className="absolute w-screen h-4/5 -z-10"
						src={FirstSectionBG}
						alt="First Section Background"
					/>
					<HomeSection header={sections[0].header} sectionText={sections[0].sectionText} imageUrl={sections[0].imageUrl} rightAligned/>
				</section>
				<section className="w-screen md:h-screen flex md:justify-between relative">
					<Image
						priority
						quality={100}
						className="absolute h-auto w-auto right-0 -z-10"
						src={SecondSectionBG}
						alt="Second Section Background"
					/>
					<HomeSection header={sections[1].header} sectionText={sections[1].sectionText} imageUrl={sections[1].imageUrl}/>
				</section>
				<section className="w-screen md:h-screen flex md:justify-between relative">
					<Image
						priority
						quality={100}
						className="absolute w-1/2 h-5/6 left-0 -z-10"
						src={ThirdSectionBG}
						alt="Third Section Background"
					/>
					<HomeSection header={sections[2].header} sectionText={sections[2].sectionText} imageUrl={sections[2].imageUrl} rightAligned/>
				</section>
				<section className='w-screen h-screen'>
					<div className="mx-auto md:w-[968px] flex flex-col justify-center items-center gap-16">
						<span className="font-latoBlack text-9xl text-white text-center">
							Want to try our app?
						</span>
						<ButtonUI textSize='4xl'><Link href={"/search"}>START SEARCHING</Link></ButtonUI>
					</div>
				</section>
			</div>
		</>
	)
}