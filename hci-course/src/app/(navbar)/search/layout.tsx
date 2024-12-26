import SearchMainDiv from "@/app/components/SearchMainDiv";





export default async function SearchLayout({children} : {
    children: React.ReactNode
}) {

    

    return (
        
        <SearchMainDiv> 
            {children}
        </SearchMainDiv>
    );
}