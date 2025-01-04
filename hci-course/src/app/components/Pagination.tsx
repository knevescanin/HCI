import { useContext } from "react";
import ButtonUI from "./UI/ButtonUI";
import ProductContext from "../contexts/ProductContext";

export default function Pagination() {

    const {offset, setOffset, productLimit} = useContext(ProductContext);
    
    return (
        <ButtonUI onClick={() => setOffset(offset + productLimit)} textSize="lg" className= "col-start-2 col-end-9 justify-self-center" >
          Load more products
        </ButtonUI>
    );
}
