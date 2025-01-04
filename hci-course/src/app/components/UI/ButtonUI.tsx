export default function ButtonUI({children, textSize, className, onClick}: {
    children: React.ReactNode,
    textSize: string,
    className?: string,
    onClick?: () => void
}) {
    return (
        <button onClick={onClick} className={`w-fit font-latoBlack text-white text-${textSize} bg-[#630BBD] px-3 py-2 rounded-xl drop-shadow-xl hover:scale-110 transition-all` + ` ${className}`}>
						{children}
		</button>
    );
}