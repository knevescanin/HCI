import Image from 'next/image'
import FirstSectionBG from '../../public/home-page-assets/First Section BG.png'
import SecondSectionBG from '../../public/home-page-assets/Second Section BG.png'
import ThirdSectionBG from '../../public/home-page-assets/Third Section BG.png'
import HeroIllustration from '../../public/home-page-assets/Hero Illustration.png'
import HeroImage from '../../public/home-page-assets/hero-image.jpg'

export default function Home() {
	return (
		<>
		<Image  priority src={HeroImage} alt="Hero Image" className="absolute w-screen h-screen -z-10 inset-0" />
			<div style={{height: "calc(100vh - 76.5px)"}} className="w-screen relative">
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
			<section
				className="w-screen md:h-screen relative"
				style={{
					backgroundImage: `url(${FirstSectionBG})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}>
				<Image
					quality={100}
					className="absolute w-screen h-4/5 -z-10"
					src={FirstSectionBG}
					alt="First Section Background"
				/>
				<div className="w-2/3">
					<div></div>
				</div>
			</section>

			<section className="w-screen md:h-screen relative">
				<Image
					quality={100}
					className="absolute w-3/5 h-4/5 right-0 -z-10"
					src={SecondSectionBG}
					alt="Second Section Background"
				/>
				<div className="w-2/3">
					<div></div>
				</div>
			</section>

			<section className="w-screen md:h-screen relative">
				<Image
					quality={100}
					className="absolute w-1/2 h-4/5 left-0 -z-10"
					src={ThirdSectionBG}
					alt="Third Section Background"
				/>
				<div className="w-2/3">
					<div></div>
				</div>
			</section>

			<section className='w-screen h-screen'>
				<div className="mx-auto md:w-[968px] flex flex-col justify-center items-center gap-16">
					<span className="font-latoBlack text-9xl text-white text-center">
						Want to try our app?
					</span>
					<button className="w-[376px] font-latoBlack text-white text-4xl bg-[#630BBD] px-3 py-2 rounded-xl drop-shadow-xl hover:scale-110 transition-all">
						START SEARCHING
					</button>
				</div>
			</section>
		</>
	)
}
