import Link from "next/link";


export default function SubmenuHeader({name, route}: Header) {
    return (
        <li><Link href={route} className={""}>{name}</Link></li>
    );
}