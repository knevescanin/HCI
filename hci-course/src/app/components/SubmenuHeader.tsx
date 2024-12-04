import Link from "next/link";


export default function SubmenuHeader({name, route}: {name: string, route: string}) {
    return (
        <li><Link href={route} className={"font-bold"}>{name}</Link></li>
    );
}