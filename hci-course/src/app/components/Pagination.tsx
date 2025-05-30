import ButtonUI from "./UI/ButtonUI";

export default function Pagination({
    offset,
    productLimit,
    setOffset,
    loading
}: {
    offset: number;
    productLimit: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    loading?: boolean;
}) {


    if (loading) {
        return (
            <div className="flex justify-center items-center py-10 w-full">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-4 border-r-4"
                    style={{
                        borderTopColor: '#1A20AB',
                        borderRightColor: '#1A20AB',
                        borderBottomColor: 'transparent',
                        borderLeftColor: 'transparent',
                    }}
                ></div>
            </div>
        );
    }

    return (
        <ButtonUI onClick={() => setOffset(offset + productLimit)} textSize="lg" className="col-start-2 col-end-9 justify-self-center my-auto" >
            Load more products
        </ButtonUI>
    );
}
