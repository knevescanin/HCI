import Link from "next/link";


export default function SubmenuHeader({name, route}: Header) {
    return (
        <li><Link href={route} className={"w-full"}>{name}</Link></li>
    );
}