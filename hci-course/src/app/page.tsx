import Image from 'next/image'
import FirstSectionBG from '../../public/home-page-assets/First Section BG.png'
import SecondSectionBG from '../../public/home-page-assets/Second Section BG.png'
import ThirdSectionBG from '../../public/home-page-assets/Third Section BG.png'

export default function Home() {
	return (
		<>
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
				<div className='w-2/3'>
        <div>
          
        </div>
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
				<div className='w-2/3'>
        <div>
          
        </div>
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
				<div className='w-2/3'>
        <div>
          
        </div>
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
