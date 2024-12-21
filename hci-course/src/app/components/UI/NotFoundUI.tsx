import Link from "next/link";
import ButtonUI from "./ButtonUI";

export default function NotFoundUI() {
    return (
        <div className="text-white flex flex-col w-full min-h-full items-center justify-center">
            Woops... Page not found, sorry!
            <ButtonUI textSize="xl"><Link href="/">Take me home</Link></ButtonUI>
        </div>
    );
}