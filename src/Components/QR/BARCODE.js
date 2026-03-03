import Barcode from "react-barcode";

function BARCODE({ value }) {
    return (
        <>
            <div className="mx-3">
                <Barcode
                    value={value}
                    width={1}
                    height={20}
                    displayValue={true}
                    margin={3}
                    renderer="canvas"
                />
            </div>
        </>
    )
}

export default BARCODE