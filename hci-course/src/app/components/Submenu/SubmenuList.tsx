"use client" // Required for usePathname

import { usePathname } from 'next/navigation' // Keep this
import SubmenuListItems from './SubmenuListItems'
import { useState, useEffect } from 'react' // <-- Import useEffect
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

// Assuming NavigationItem is defined elsewhere, e.g.:
// interface NavigationItem { name: string; route: string; }

export default function SubmenuList({
    navigations,
    name,
    route, // Keep the route prop
    iconName,
    iconColor,
}: {
    navigations: NavigationItem[]
    name: string
    route: string
    iconName: string
    iconColor: string
}) {
    const pathname = usePathname(); // Get the current path

    // Initialize state - can default to false, useEffect will correct it
    const [open, setOpen] = useState<boolean>(false);

    // Effect hook to synchronize the open state with the current route
    useEffect(() => {
        // Determine if the component should be open based on the *current* pathname
        const startsWithRoute = route !== '/' && pathname.startsWith(route);
        const isChildRouteActive = navigations.some((nav) => nav.route === pathname);
        const shouldBeOpen = startsWithRoute || isChildRouteActive;

        // Update the state if the calculated state is different from the current state
        // This check is important to prevent potential infinite loops if 'open' is included
        // in dependency array without careful consideration, though here it helps react
        // if the state was somehow changed externally or needs reset based on route.
        if (shouldBeOpen !== open) {
           setOpen(shouldBeOpen);
        }
        // Dependencies: This effect should re-run if the pathname, base route, or navigations change.
    }, [pathname, route, navigations, open]); // Adding `open` here ensures consistency if state is changed elsewhere and route dictates otherwise

    // Manual toggle handler remains the same
    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setOpen(!open);
    }

    return (
        <li>
            <details
                className="group"
                open={open} // Still controlled by React state
                // No need for onToggle if we manage via state and onClick
            >
                <summary
                    onClick={handleToggle}
                    className="grid list-none grid-cols-[1fr,3fr,auto] hover:bg-[#f0f0f0] hover:rounded-lg py-2 px-4 cursor-pointer"
                >
                    {/* Icon */}
                    <FontAwesomeIcon
                        className="col-start-1 col-end-2 self-center justify-self-start pr-3"
                        icon={Icons[iconName as keyof typeof Icons] as Icons.IconDefinition}
                        color={iconColor}
                        size="lg"
                    />
                    {/* Name */}
                    <p className="col-start-2 col-end-3 self-center">{name}</p>
                    {/* Chevron */}
                    <FontAwesomeIcon
                        className={
                            'col-start-3 col-end-4 self-center justify-self-end transition-transform duration-200 ease-in-out ' +
                            (open ? `rotate-180` : `rotate-0`)
                        }
                        icon={Icons.faChevronDown}
                        color="#333333"
                    />
                </summary>

                {/* Conditionally render children based on state */}
                {open && <SubmenuListItems navigations={navigations} />}

            </details>
        </li>
    );
}