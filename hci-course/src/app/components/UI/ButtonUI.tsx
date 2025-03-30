export default function ButtonUI({children, textSize, className, onClick}: {
    children: React.ReactNode,
    textSize: string,
    className?: string,
    onClick?: () => void
}) {
    return (
        <button onClick={onClick} className={`w-fit font-latoBlack text-white text-${textSize} bg-[#1A20AB] px-3 py-2 mb-1 rounded-xl drop-shadow-xl hover:scale-110 transition-all` + ` ${className}`}>
						{children}
		</button>
    );
}