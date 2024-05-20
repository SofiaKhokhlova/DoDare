import "../css/inventory.css";

function InventoryComponent () {
    return(
        <>
            <div className="inventory-component">
                <p className="inventory-title">Your inventory</p>
                <div className="character-block"></div>
                <div className="items-container">
                    <p className="item-title">Hats</p>
                    <div className="item-content">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="item"></div>
                        ))}
                    </div>
                    <p className="item-title">Jackets</p>
                    <div className="item-content">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="item"></div>
                        ))}
                    </div>
                    <p className="item-title">Trousers</p>
                    <div className="item-content">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="item"></div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default InventoryComponent;