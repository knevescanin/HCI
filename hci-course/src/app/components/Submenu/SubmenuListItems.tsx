import Link from 'next/link';

export default function SubmenuListItems({navigations}: {navigations: NavigationItem[]}) {
	

    return (
       <ul>
				{navigations.map((navigation, index) => (
					<li key={index}>
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