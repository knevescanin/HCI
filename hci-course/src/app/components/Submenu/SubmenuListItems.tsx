import Link from 'next/link';

export default function SubmenuListItems({navigations}: {navigations: NavigationItem[]}) {
	

    return (
       <ul>
				{navigations.map((navigation, index) => (
					<li className="ml-4 p-2 hover:bg-[#f0f0f0] hover:rounded-lg" key={index}>
						<Link
							href={navigation.route}
							className={''}>
							{navigation.name}
						</Link>
					</li>
				))}
			</ul>
    );
}