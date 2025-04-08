import ButtonUI from "./UI/ButtonUI";

export default function Pagination({
    offset,
    productLimit,
    setOffset
}: {
    offset: number;
    productLimit: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
}) {

    return (
        <ButtonUI onClick={() => setOffset(offset + productLimit)} textSize="lg" className="col-start-2 col-end-9 justify-self-center my-auto" >
            Load more products
        </ButtonUI>
    );
}
