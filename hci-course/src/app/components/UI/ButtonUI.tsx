export default function ButtonUI({children, textSize}: {
    children: React.ReactNode,
    textSize: string
}) {
    return (
        <button className={`w-fit font-latoBlack text-white text-${textSize} bg-[#630BBD] px-3 py-2 rounded-xl drop-shadow-xl hover:scale-110 transition-all`}>
						{children}
		</button>
    );
}