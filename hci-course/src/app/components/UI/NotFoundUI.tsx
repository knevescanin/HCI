import Link from "next/link";
import ButtonUI from "./ButtonUI";

export default function NotFoundUI() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center min-h-[80vh] bg-white text-[#1A20AB] px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 text-center">
                Looks like this page doesn&apos;t exist anymore!
            </h2>
            <p className="mb-4 sm:mb-4 text-base sm:text-xl text-center">
                Or maybe it never did. 🤷‍♂️
            </p>

            <div className="flex flex-col items-center sm:flex-row gap-3">
                <ButtonUI textSize="xl"><Link href="/">Take me home</Link></ButtonUI>
            </div>
        </div >
    );
}