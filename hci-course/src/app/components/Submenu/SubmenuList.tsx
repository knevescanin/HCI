"use client" // Required for usePathname

import { usePathname } from 'next/navigation' // Keep this
import SubmenuListItems from './SubmenuListItems'
import { useState, useEffect } from 'react' // Keep useEffect
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

    // Initialize state - useEffect will set the correct initial state on load
    const [open, setOpen] = useState<boolean>(false);

    // Effect hook to synchronize the open state based *only* on route changes
    useEffect(() => {
        // Determine if the component should be open based on the current pathname
        const startsWithRoute = route !== '/' && pathname.startsWith(route);
        const isChildRouteActive = navigations.some((nav) => nav.route === pathname);
        const shouldBeOpen = startsWithRoute || isChildRouteActive;

        // Set the state based on the route calculation.
        // This will now correctly set the state on initial load and after navigation.
        setOpen(shouldBeOpen);

    // *** REMOVED 'open' FROM DEPENDENCY ARRAY ***
    // Only run when the path or route/nav data changes.
    }, [pathname, route, navigations]);

    // Manual toggle handler remains the same
    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setOpen(!open); // This now correctly toggles the state manually
    }

    return (
        <li>
            <details
                className="group"
                open={open} // Still controlled by React state
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