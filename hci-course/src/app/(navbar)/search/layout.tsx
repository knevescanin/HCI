import SearchMainDiv from "@/app/components/SearchMainDiv";




export default function SearchLayout({children} : {
    children: React.ReactNode
}) {
    return (
        <SearchMainDiv>
            {children}
        </SearchMainDiv>
    );
}