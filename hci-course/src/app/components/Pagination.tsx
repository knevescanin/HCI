import ButtonUI from "./UI/ButtonUI";

export const paginate = (products: Record<string, any>[], pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return products.slice(startIndex, startIndex + pageSize);
   };

export default function Pagination() {

    

    return (
        <ButtonUI textSize="lg" className= "col-start-3 col-end-9 justify-self-center" >
          Load more products
        </ButtonUI>
    );
}
