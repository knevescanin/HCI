"use client"

import Sidebar from '@/app/components/SearchSidebar/Sidebar'
import SortTopbar from './SortTopbar';

export default function SearchMainDiv({children} : {children: React.ReactNode}) {
    return (
        <div className="grid grid-cols-8 grid-rows-1 w-full h-max text-white relative bg-white">
            <Sidebar />
            <SortTopbar />
            {children}
        </div>
    );
}