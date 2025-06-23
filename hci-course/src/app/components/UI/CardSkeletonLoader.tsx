import { useGridContext } from "@/app/contexts/GridContext";

export default function CardSkeletonLoader() {
	const { gridColumns } = useGridContext();
	return (

		<div className={`${gridColumns === 1 ? 'mb-6 shadow-md' : 'shadow-md mb-6'}
		group bg-[#FFFFFF] rounded-xl border shadow-lg mx-auto flex flex-col items-stretch relative w-11/12 h-[250px] md:h-[360px] lg:h-[360px] xl:h-[390px] 
		md:mb-6 lg:my-3 transition duration-300 ease-in-out lg:hover:shadow-lg lg:hover:border-[#1A20AB] lg:hover:scale-105 active:scale-95`}>
			<svg
				className="w-full aspect-[4/3] sm:aspect-[3/3] my-5 relative overflow-hidden rounded-md bg-white text-gray-200 dark:text-gray-600"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 16 20"
			>
				<path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
				<path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
			</svg>
			<div className="flex flex-col justify-evenly items-center w-full px-3 py-3 transition-all duration-200 lg:group-hover:bg-[#e6eaff] lg:group-hover:text-[#1A20AB] group-hover:rounded-b-xl flex-grow">
				<div className="h-2 md:h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4 px-14"></div>
				<div className="h-1.5 md:h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 mx-auto w-1/3"></div>
				<div className="h-1.5 md:h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 mx-auto w-3/6"></div>
			</div>
		</div>
	)
}
