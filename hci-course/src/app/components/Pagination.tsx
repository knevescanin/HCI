const pageItem = "flex justify-center items-center w-8 h-8 border border-gray-300 rounded cursor-pointer"

const pageItemActive = "flex justify-center items-center w-8 h-8 border border-gray-300 rounded cursor-pointer bg-gray-200"

const pageLink = "no-underline text-gray-800 w-full h-full flex justify-center items-center"

const paginationContainer = "flex justify-between items-center list-none w-max mx-auto"

export const paginate = (products: Record<string, any>[], pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return products.slice(startIndex, startIndex + pageSize);
   };

export default function Pagination({numOfProducts, currentPage, pageSize, onPageChange} : {
    numOfProducts: number,
    currentPage: number,
    pageSize: number,
    onPageChange: (page: number) => void
}) {
    

    const pagesCount = Math.ceil(numOfProducts / pageSize)
    if (pagesCount === 1) return null;
    
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

    

    return (
        <div>
     <ul className={paginationContainer}>
       {pages.map((page) => (
         <li
           key={page}
           className={
             page === currentPage ? pageItemActive : pageItem
           }
         >
           <a className={pageLink} onClick={() => onPageChange(page)}>
             {page}
           </a>
         </li>
       ))}
     </ul>
   </div>
    );
}
