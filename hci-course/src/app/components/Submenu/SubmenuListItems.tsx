import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SubmenuListItems({navigations}: {navigations: NavigationItem[]}) {
	
const pathname = usePathname()

    return (
       <ul className="ml-10 relative before:content-[''] before:w-[1px] before:bg-[#e0e0e0] before:h-full before:absolute before:left-0 before:top-0 before:z-[-1] before:rounded-lg">
				{navigations.map((navigation, index) => (
					<li className={"hover:bg-[#f0f0f0] hover:rounded-lg ml-1 transition-all ease-in-out " + `${pathname === navigation.route ? 'bg-[#333333] rounded-lg text-[#f0f0f0] hover:bg-[#333333]' : ''}`} key={index}>
						<Link
							href={navigation.route}
							className="block w-full h-full p-2">
							{navigation.name}
						</Link>
					</li>
				))}
			</ul>
    );
}