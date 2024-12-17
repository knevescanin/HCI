export function getSubmenuNavigations(submenuNavigations: SubmenuNavigation[]): SubmenuNavigation[] {
    const navigations = submenuNavigations.flatMap(nav => nav.navigations)
    const newNavigations: SubmenuNavigation[] = navigations.map(nav => {
        
        const props = {
            header: {
                name: nav.name,
                route: nav.route
            },
            navigations: []
        }
        
            return props
        
    })

    if (newNavigations.length > 0) {
        return newNavigations
    } else {
        return []
    }
    
}
        