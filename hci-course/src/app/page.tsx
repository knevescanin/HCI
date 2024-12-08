import Image from 'next/image'
import FirstSectionBG from '../../public/home-page-assets/First Section BG.png'
import SecondSectionBG from '../../public/home-page-assets/Second Section BG.png'
import ThirdSectionBG from '../../public/home-page-assets/Third Section BG.png'
import HeroIllustration from '../../public/home-page-assets/Hero Illustration.png'
import HeroImage from '../../public/home-page-assets/hero-image.jpg'

export default function Home() {
	return (
		<>
			<div className="h-screen w-screen relative">
        {/* Treba bit Image jer bg-image stvara probleme zbog velicine??? */}
        {/* Jedna ideja je provjerit o kojem se pathu radi pa kondicionalno ispisati komponentu, ali problem je jer je ovo serverska strana pa neda hookove */}
        <Image src={HeroImage} alt="Hero Image" className="absolute w-screen h-screen -z-10 inset-0" />
				{/* Mozda dinamicka velicina citanjem visine navbara */}
				<div
					className="flex justify-start w-screen relative"
					style={{ height: 'calc(100% - 76.5px)' }}>
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
					height={815}
					className="absolute w-screen -z-10"
					src={FirstSectionBG}
					alt="First Section Background"
				/>
				<div className="w-2/3">
					<div></div>
				</div>
			</section>

			<section className="w-screen md:h-screen relative">
				<Image
					width={1196}
					height={704}
					className="absolute right-0 -z-10"
					src={SecondSectionBG}
					alt="Second Section Background"
				/>
				<div className="w-2/3">
					<div></div>
				</div>
			</section>

			<section className="w-screen md:h-screen relative">
				<Image
					width={964}
					height={568}
					className="absolute left-0 -z-10"
					src={ThirdSectionBG}
					alt="Third Section Background"
				/>
				<div className="w-2/3">
					<div></div>
				</div>
			</section>

			<section className="mx-auto md:w-[968px] flex flex-col justify-center items-center gap-16">
				<span className="font-latoBlack text-9xl text-white text-center">
					Want to try our app?
				</span>
				<button className="w-[376px] font-latoBlack text-white text-4xl bg-[#630BBD] px-3 py-2 rounded-xl drop-shadow-xl hover:scale-110 transition-all">
					START SEARCHING
				</button>
			</section>
		</>
	)
}
