import Link from 'next/link';

export default function SubmenuListItems({navigations}: {navigations: NavigationItem[]}) {
	

    return (
       <ul>
				{navigations.map((navigation, index) => (
					<li className="ml-10 hover:bg-[#f0f0f0] hover:rounded-lg" key={index}>
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