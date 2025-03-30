import { useContext } from "react";
import ButtonUI from "./UI/ButtonUI";
import ProductContext from "../contexts/ProductContext";

export default function Pagination() {

    const context = useContext(ProductContext);

    if (!context) {
        throw new Error("ProductContext is not provided");
    }

    const { offset, setOffset, productLimit } = context;
    
    return (
        <ButtonUI onClick={() => setOffset(offset + productLimit)} textSize="lg" className= "col-start-2 col-end-9 justify-self-center" >
          Load more products
        </ButtonUI>
    );
}
